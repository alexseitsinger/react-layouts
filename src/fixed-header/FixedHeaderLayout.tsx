import React, { Component, ReactElement, ReactNode } from "react"
import { CSSObject } from "@emotion/core"
import { debounce, isEqual } from "underscore"

import { isBrowser } from "../utils"

import { Context } from "./context"
import { FixedHeader } from "./FixedHeader"

interface Props {
  children: ReactNode | ReactNode[];
  renderHeader: () => React.ReactElement;
  headerStyle?: CSSObject;
  initialViewportHeight: string;
  initialHeaderHeight: string;
}

interface State {
  viewportHeight: string;
  headerHeight: string;
  mainHeight: string;
}

export class FixedHeaderLayout extends Component<Props, State> {
  state: State = {
    viewportHeight: "0px",
    mainHeight: "0px",
    headerHeight: "0px",
  }

  handleResize = debounce((): void => {
    this.updateHeights()
  }, 600)

  isMountedNow = false

  constructor(props: Props) {
    super(props)

    /**
     * To prevent memory leaks from our debounced update method
     */
    const realSetState = this.setState.bind(this)
    this.setState = (...args): void => {
      if (!this.isMountedNow) {
        return
      }
      realSetState(...args)
    }
  }

  componentDidMount(): void {
    this.isMountedNow = true

    if (isBrowser) {
      window.addEventListener("resize", this.handleResize)
    }

    this.updateHeights()
  }

  componentDidUpdate(): void {
    this.updateHeights()
  }

  componentWillUnmount(): void {
    this.isMountedNow = false

    if (isBrowser) {
      window.addEventListener("resize", this.handleResize)
    }
  }

  updateHeights = (nextHeaderHeight?: string): void => {
    const heights = this.createHeights(nextHeaderHeight)
    if (isEqual(this.state, heights)) {
      return
    }
    this.setState(heights)
  }

  getMainHeight = (
    viewportHeight: string,
    newHeaderHeight?: string
  ): string => {
    const viewportSize = parseInt(viewportHeight)
    const headerHeight = this.getHeaderHeight(newHeaderHeight)
    const headerSize = parseInt(headerHeight)
    const size = Math.max(0, viewportSize - headerSize)
    return `${size}px`
  }

  getHeaderHeight = (newSize?: string): string => {
    const { initialHeaderHeight } = this.props
    let size = parseInt(initialHeaderHeight)
    if (newSize !== undefined) {
      size = parseInt(newSize)
    }
    size = Math.max(0, size)
    return `${size}px`
  }

  getViewportHeight = (): string => {
    const { initialViewportHeight } = this.props
    if (isBrowser) {
      const size = document.documentElement.clientHeight
      return `${size}px`
    }
    return initialViewportHeight
  }

  createHeights = (nextHeaderHeight?: string): State => {
    const viewportHeight = this.getViewportHeight()
    const headerHeight = this.getHeaderHeight(nextHeaderHeight)
    const mainHeight = this.getMainHeight(viewportHeight, headerHeight)
    return {
      viewportHeight,
      headerHeight,
      mainHeight,
    }
  }

  render(): ReactElement {
    const {
      headerStyle,
      initialHeaderHeight,
      renderHeader,
      children,
    } = this.props

    const { headerHeight } = this.state

    return (
      <>
        <FixedHeader
          initialHeight={initialHeaderHeight}
          fixedHeight={headerHeight}
          onUpdateHeight={this.handleResize}
          styles={headerStyle}>
          {renderHeader()}
        </FixedHeader>
        <Context.Provider value={this.state}>{children}</Context.Provider>
      </>
    )
  }
}

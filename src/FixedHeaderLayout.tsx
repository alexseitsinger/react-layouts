import React, { Component, ReactElement } from "react"
import { CSSObject } from "@emotion/core"
import { debounce, isEqual } from "underscore"

import { Context } from "./context"
import { FixedHeader } from "./FixedHeader"
import { isBrowser } from "./utils"

interface Props {
  renderBody: () => React.ReactElement;
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
  }, 1000)

  componentDidMount(): void {
    if (isBrowser) {
      window.addEventListener("resize", this.handleResize)
    }
    this.updateHeights()
  }

  componentWillUnmount(): void {
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

  getMainHeight = (headerHeight?: string): string => {
    const { initialHeaderHeight } = this.props
    const viewportHeight = this.getViewportHeight()
    const viewportSize = parseInt(viewportHeight)
    let size: number
    if (headerHeight !== undefined) {
      const headerSize = parseInt(headerHeight)
      size = Math.max(0, viewportSize - headerSize)
    } else {
      const initialSize = parseInt(initialHeaderHeight)
      size = Math.max(0, viewportSize - initialSize)
    }
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
    if (isBrowser) {
      const el = document.documentElement
      const size = el.clientHeight
      return `${size}px`
    }
    const { initialViewportHeight } = this.props
    return initialViewportHeight
  }

  createHeights = (nextHeaderHeight?: string): State => {
    const viewportHeight = this.getViewportHeight()
    const headerHeight = this.getHeaderHeight(nextHeaderHeight)
    const mainHeight = this.getMainHeight(headerHeight)
    return {
      viewportHeight,
      headerHeight,
      mainHeight,
    }
  }

  stateHasHeights = (): boolean => {
    const { viewportHeight, mainHeight } = this.state
    const viewportValue = parseInt(viewportHeight)
    const mainValue = parseInt(mainHeight)
    if (viewportValue === 0 || mainValue === 0) {
      return false
    }
    return true
  }

  getContextValue = (): State => {
    if (this.stateHasHeights()) {
      const { viewportHeight } = this.state
      const { initialViewportHeight } = this.props
      if (!isBrowser || viewportHeight !== initialViewportHeight) {
        return this.state
      }
    }
    return this.createHeights()
  }

  render(): ReactElement {
    const {
      headerStyle,
      initialHeaderHeight,
      renderHeader,
      renderBody,
    } = this.props
    const value = this.getContextValue()
    return (
      <>
        <FixedHeader
          initialHeight={initialHeaderHeight}
          fixedHeight={value.headerHeight}
          onUpdateHeight={this.handleResize}
          styles={headerStyle}>
          {renderHeader()}
        </FixedHeader>
        <Context.Provider value={value}>{renderBody()}</Context.Provider>
      </>
    )
  }
}

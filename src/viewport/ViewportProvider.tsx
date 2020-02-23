import React, { PureComponent, ReactNode } from "react"
import { debounce, isEqual } from "underscore"

import { isBrowser } from "../utils"

import { ViewportContext } from "./ViewportContext"

interface State {
  viewportWidth: string;
  viewportHeight: string;
}

interface Props {
  initialHeight: string;
  initialWidth?: string;
  children: ReactNode | ReactNode[];
}

export class ViewportProvider extends PureComponent<Props, State> {
  state: State = {
    viewportHeight: "0px",
    viewportWidth: "0px",
  }

  isMountedNow = false

  handleResize = debounce(() => {
    this.updateSizes()
  }, 700)

  constructor(props: Props) {
    super(props)

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

    this.updateSizes()
  }

  componentDidUpdate(): void {
    this.updateSizes()
  }

  componentWillUnmount(): void {
    this.isMountedNow = false

    if (isBrowser) {
      window.removeEventListener("resize", this.handleResize)
    }
  }

  updateSizes = (): void => {
    const sizes = this.createSizes()
    if (isEqual(this.state, sizes)) {
      return
    }
    this.setState(sizes)
  }

  getWidth = (): string => {
    const { initialWidth } = this.props
    if (isBrowser) {
      const el = document.documentElement
      const size = el.clientWidth
      return `${size}px`
    }
    if (initialWidth !== undefined) {
      return initialWidth
    }
    return "0px"
  }

  getHeight = (): string => {
    const { initialHeight } = this.props
    if (isBrowser) {
      const el = document.documentElement
      const size = el.clientHeight
      return `${size}px`
    }
    return initialHeight
  }

  createSizes = (): State => {
    const viewportWidth = this.getWidth()
    const viewportHeight = this.getHeight()
    return {
      viewportWidth,
      viewportHeight,
    }
  }

  render(): ReactNode {
    const { children } = this.props
    return (
      <ViewportContext.Provider value={this.state}>
        {children}
      </ViewportContext.Provider>
    )
  }
}

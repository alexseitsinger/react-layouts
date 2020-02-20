import React, { ReactElement, ReactNode } from "react"
import { isEqual } from "underscore"

import { isBrowser } from "../utils"

import { Context } from "./context"

interface State {
  viewportWidth: string;
  viewportHeight: string;
}

interface Props {
  initialHeight: string;
  initialWidth?: string;
  children: ReactNode | ReactNode[];
}

export class ViewportProvider extends React.Component<Props, State> {
  state: State = {
    viewportHeight: "0px",
    viewportWidth: "0px",
  }

  componentDidMount(): void {
    this.updateSizes()
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

  getContextValue = (): State => {
    if (this.state.viewportHeight === "0px") {
      return this.createSizes()
    }
    return this.state
  }

  render(): ReactElement {
    const { children } = this.props
    const value = this.getContextValue()
    return <Context.Provider value={value}>{children}</Context.Provider>
  }
}

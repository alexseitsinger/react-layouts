import React, { ReactElement } from "react"
import { withViewport } from "@alexseitsinger/react-viewport-container"
import { CSSObject } from "@emotion/core"
import { debounce, isEqual } from "underscore"

import { Context } from "./context"
import { FixedHeader } from "./FixedHeader"

interface Props {
  renderBody: () => React.ReactElement;
  renderHeader: () => React.ReactElement;
  headerStyle: CSSObject;
  initialHeight: string;
  viewportHeight: string;
  viewportWidth: string;
}

interface State {
  fullHeight: string;
  mainHeight: string;
  headerHeight: string;
}

class FixedHeaderLayoutProvider extends React.Component<Props, State> {
  state: State = {
    fullHeight: "0px",
    mainHeight: "0px",
    headerHeight: "0px",
  }

  handleResize = debounce((nextHeight?: string) => {
    this.updateHeights(nextHeight)
  }, 500)

  componentDidMount(): void {
    this.updateHeights()
  }

  componentDidUpdate(): void {
    this.updateHeights()
  }

  updateHeights = (headerHeight?: string): void => {
    const heights = this.getHeights(headerHeight)
    if (isEqual(this.state, heights)) {
      return
    }
    this.setState(heights)
  }

  getMainHeight = (headerHeight?: string): string => {
    const { viewportHeight, initialHeight } = this.props
    const viewportSize = parseInt(viewportHeight)
    let size: number
    if (headerHeight !== undefined) {
      const headerSize = parseInt(headerHeight)
      size = Math.max(0, viewportSize - headerSize)
    } else {
      const initialSize = parseInt(initialHeight)
      size = Math.max(0, viewportSize - initialSize)
    }
    return `${size}px`
  }

  getHeaderHeight = (newSize?: string): string => {
    const { initialHeight } = this.props
    let size = parseInt(initialHeight)
    if (newSize !== undefined) {
      size = parseInt(newSize)
    }
    size = Math.max(0, size)
    return `${size}px`
  }

  getHeights = (nextHeaderHeight?: string): State => {
    if (this.stateHasHeights()) {
      return this.state
    }
    const { viewportHeight } = this.props
    const headerHeight = this.getHeaderHeight(nextHeaderHeight)
    const mainHeight = this.getMainHeight(headerHeight)
    return {
      fullHeight: viewportHeight,
      headerHeight: headerHeight,
      mainHeight,
    }
  }

  stateHasHeights = (): boolean => {
    const { fullHeight, mainHeight } = this.state
    const fullHeightZero = fullHeight === "0px"
    const mainHeightZero = mainHeight === "0px"
    return !(fullHeightZero && mainHeightZero)
  }

  render(): ReactElement {
    const { headerStyle, initialHeight, renderHeader, renderBody } = this.props
    const currentHeights = this.getHeights()

    return (
      <>
        <FixedHeader
          initialHeight={initialHeight}
          fixedHeight={currentHeights.headerHeight}
          onUpdateHeight={this.handleResize}
          styles={headerStyle}>
          {renderHeader()}
        </FixedHeader>
        <Context.Provider value={currentHeights}>
          {renderBody()}
        </Context.Provider>
      </>
    )
  }
}

export const FixedHeaderLayout = withViewport(FixedHeaderLayoutProvider)

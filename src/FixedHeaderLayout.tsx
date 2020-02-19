import React, { ReactElement } from "react"
import { withViewport } from "@alexseitsinger/react-viewport-container"
import { CSSObject } from "@emotion/core"
import { isEqual } from "underscore"

import { Context } from "./context"
import { FixedHeader } from "./FixedHeader"

interface Props {
  renderBody: () => React.ReactElement;
  renderHeader: () => React.ReactElement;
  headerStyle: CSSObject;
  initialHeight: string;
  viewportHeight: string;
}

interface State {
  fullHeight: string;
  mainHeight: string;
  headerHeight: string;
}

class FixedHeaderLayoutProvider extends React.Component<Props, State> {
  state: State = {
    fullHeight: "",
    mainHeight: "",
    headerHeight: "",
  }

  componentDidMount(): void {
    this.handleResize()
  }

  handleResize = (headerHeight?: string): void => {
    const heights = this.getHeights(headerHeight)
    if (isEqual(this.state, heights)) {
      return
    }
    this.setState(heights)
  }

  getMainHeight = (headerHeight?: string): string => {
    const { viewportHeight, initialHeight } = this.props
    const viewportSize = parseInt(viewportHeight)
    if (headerHeight !== undefined) {
      return `${viewportSize - parseInt(headerHeight)}px`
    }
    return `${viewportSize - parseInt(initialHeight)}px`
  }

  getHeights = (nextHeaderHeight?: string): State => {
    const { initialHeight, viewportHeight } = this.props
    let headerHeight = initialHeight
    if (nextHeaderHeight !== undefined) {
      headerHeight = nextHeaderHeight
    }
    const mainHeight = this.getMainHeight(headerHeight)
    return {
      fullHeight: viewportHeight,
      headerHeight: headerHeight,
      mainHeight,
    }
  }

  render(): ReactElement {
    const { headerStyle, initialHeight, renderHeader, renderBody } = this.props
    const { headerHeight } = this.state

    return (
      <Context.Provider value={this.state}>
        <FixedHeader
          initialHeight={initialHeight}
          fixedHeight={headerHeight}
          onUpdateHeight={this.handleResize}
          styles={headerStyle}>
          {renderHeader()}
        </FixedHeader>
        {renderBody()}
      </Context.Provider>
    )
  }
}

export const FixedHeaderLayout = withViewport(FixedHeaderLayoutProvider)

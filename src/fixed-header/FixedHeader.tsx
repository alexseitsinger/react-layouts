import React, { ReactElement } from "react"
import { CSSObject } from "@emotion/core"

import { isBrowser, isDefined } from "../utils"

import { HeaderContainer, HeaderInner, HeaderOuter } from "./elements"

interface Props {
  children: React.ReactNode | React.ReactNode[];
  styles?: CSSObject;
  initialHeight: string;
  fixedHeight: string;
  onUpdateHeight: (h: string) => void;
}

export class FixedHeader extends React.Component<Props> {
  innerRef = React.createRef<HTMLDivElement>()

  componentDidMount(): void {
    this.updateHeight()
  }

  componentDidUpdate(): void {
    this.updateHeight()
  }

  updateHeight = (): void => {
    const { fixedHeight, onUpdateHeight } = this.props
    const nextHeight = this.getHeight()
    if (fixedHeight !== nextHeight) {
      onUpdateHeight(nextHeight)
    }
  }

  getHeight = (): string => {
    const { current } = this.innerRef
    const { initialHeight, fixedHeight } = this.props
    if (isBrowser && isDefined(current)) {
      const { height } = getComputedStyle((current as Element))
      return height
    }
    if (isDefined(fixedHeight) && fixedHeight !== initialHeight) {
      return fixedHeight
    }
    return initialHeight
  }

  render(): ReactElement {
    const { children, styles, fixedHeight, initialHeight } = this.props

    return (
      <HeaderContainer>
        <HeaderOuter fixedHeight={fixedHeight} initialHeight={initialHeight}>
          <HeaderInner
            fixedHeight={fixedHeight}
            initialHeight={initialHeight}
            css={styles}
            ref={this.innerRef}>
            {children}
          </HeaderInner>
        </HeaderOuter>
      </HeaderContainer>
    )
  }
}

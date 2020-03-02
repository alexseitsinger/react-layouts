import React, { ReactNode, ReactElement, useCallback } from "react"

import { FooterElement } from "./elements"
import { withFixedHeaderLayout } from "../hoc"
import { MainElement } from "../main/elements"
import { FixedHeaderLayoutContextProps as ContextProps } from "../context"
import { CSSObject } from "@emotion/core"

const defaultProps = {
  isFooterStatic: false,
  isMainStatic: false,
}

type DefaultProps = Readonly<typeof defaultProps>

type Props = {
  children: ReactNode | ReactNode[],
  initialFooterHeight: string,
  onRenderFooter: () => ReactElement,
  footerStyle?: CSSObject,
} & ContextProps &
  Partial<DefaultProps>

export const FooterLayout = withFixedHeaderLayout(
  ({
    children,
    initialFooterHeight,
    onRenderFooter,
    isMainStatic,
    isFooterStatic,
    footerStyle,
    mainHeight,
  }: Props): ReactElement => {
    const getMainHeight = useCallback((): string => {
      const mainSize = parseInt(mainHeight)
      const footerHeight = initialFooterHeight
      const footerSize = parseInt(footerHeight)
      const size = mainSize - footerSize
      return `${size}px`
    }, [mainHeight, initialFooterHeight])

    const adjustedMainHeight = getMainHeight()

    return (
      <>
        <MainElement mainHeight={adjustedMainHeight} isStatic={isMainStatic}>
          {children}
        </MainElement>
        <FooterElement
          isStatic={isFooterStatic}
          initialHeight={initialFooterHeight}
          css={footerStyle}>
          {onRenderFooter()}
        </FooterElement>
      </>
    )
  }
)

FooterLayout.defaultProps = defaultProps

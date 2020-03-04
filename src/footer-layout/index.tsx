import React, { ReactNode, ReactElement, useCallback, useRef, useEffect } from "react"
import { debounce, throttle } from "underscore"

import { FooterElement } from "./elements"
import { withLayout } from "../hoc"
import { MainElement } from "../main/elements"
import { LayoutContextProps as ContextProps } from "../context"
import { isDefined, isBrowser } from "src/utils"
import { CSSObject } from "@emotion/core"

const defaultProps = {
  isFooterStatic: false,
  isMainStatic: false,
}

export type FooterLayoutProps = {
  onRenderFooter: () => ReactNode,
  initialFooterHeight: string,
  footerStyle?: CSSObject,
}

type Props = ContextProps & FooterLayoutProps & {
  children: ReactNode | ReactNode[],
} & Partial<Readonly<typeof defaultProps>>

export const FooterLayout = withLayout(
  function FooterLayout({
    children,
    initialFooterHeight,
    footerHeight,
    onRenderFooter,
    isMainStatic,
    isFooterStatic,
    footerStyle,
    mainHeight,
    onResize,
    headerHeight,
  }: Props): ReactElement {
    const footerRef = useRef<HTMLDivElement>(null)

    const getHeight = useCallback((): string => {
      const { current } = footerRef
      if (isBrowser && isDefined(current)) {
        const { height } = getComputedStyle((current as HTMLDivElement))
        return height
      }
      if (isDefined(footerHeight) && footerHeight !== "0px" && footerHeight !== initialFooterHeight) {
        return footerHeight
      }
      return initialFooterHeight
    }, [initialFooterHeight, footerHeight, footerRef])

    const shouldUpdate = useCallback((): boolean => {
      const hasHeaderHeight = (headerHeight !== "0px")
      const hasSameHeight = (getHeight() === footerHeight)
      if (hasSameHeight) {
        if (hasHeaderHeight) {
          return true
        }
        return false
      }
      return true
    }, [getHeight, footerHeight, headerHeight])

    const updateHeight = useCallback((): void => {
      if (shouldUpdate()) {
        console.log("updating height (footer)")
        onResize({
          nextFooterHeight: getHeight()
        })
      }
    }, [onResize, getHeight, shouldUpdate])

    useEffect(() => {
      if (shouldUpdate()) {
        updateHeight()
      }
    }, [])

    updateHeight()

    return (
      <>
        <MainElement mainHeight={mainHeight} isStatic={isMainStatic}>
          {children}
        </MainElement>
        <FooterElement
          isStatic={isFooterStatic}
          initialHeight={initialFooterHeight}
          finalHeight={footerHeight}
          css={footerStyle}
          ref={footerRef}>
          {onRenderFooter()}
        </FooterElement>
      </>
    )
  }
)

FooterLayout.defaultProps = defaultProps

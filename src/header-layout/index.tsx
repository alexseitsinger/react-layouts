import React, { ReactElement, ReactNode, useCallback, forwardRef, useRef, useEffect } from "react"
import { CSSObject } from "@emotion/core"

import { withLayout } from "src/hoc"

import { LayoutContextProps as ContextProps } from "../context"
import { isBrowser, isDefined } from "../utils"

import { HeaderElement, HeaderInner, HeaderOuter } from "./elements"

jest.setTimeout(10000)

export interface HeaderLayoutProps {
  onRenderHeader: () => ReactNode;
  initialHeaderHeight: string;
  headerStyle?: CSSObject;
}

type BaseProps = ContextProps & HeaderLayoutProps
type Props = BaseProps & {
  children: ReactNode | ReactNode[],
}

export const HeaderLayout = withLayout(
  function HeaderLayout({
    children,
    footerHeight,
    headerHeight,
    initialHeaderHeight,
    headerStyle,
    onRenderHeader,
    onResize,
  }: Props): ReactElement {
    const headerRef = useRef<HTMLDivElement>(null)

    console.log("headerHeight: ", headerHeight)
    console.log("initialHeaderHeight: ", initialHeaderHeight)

    const getHeight = useCallback((): string => {
      const { current } = headerRef
      if (isBrowser && isDefined(current)) {
        const { height } = getComputedStyle(current as HTMLDivElement)
        return height
      }
      if (isDefined(headerHeight) && headerHeight !== "0px" && headerHeight !== initialHeaderHeight) {
        return headerHeight
      }
      return initialHeaderHeight
    }, [initialHeaderHeight, headerHeight, headerRef])

    const shouldUpdate = useCallback((): boolean => {
      const hasFooterHeight = (footerHeight !== "0px")
      const hasSameHeight = (getHeight() === headerHeight)
      if (hasSameHeight) {
        if (hasFooterHeight) {
          return true
        }
        return false
      }
      return true
    }, [getHeight, headerHeight, footerHeight])

    const updateHeight = useCallback((): void => {
      if (shouldUpdate()) {
        console.log("shouldUpdate: true (header via updateHeight)")
        onResize({
          nextHeaderHeight: getHeight()
        })
      }
    }, [onResize, getHeight, shouldUpdate])

    useEffect(() => {
      if (shouldUpdate()) {
        console.log("shouldUpdate: true (header via useEffect)")
        updateHeight()
      }
    }, [])

    updateHeight()

    return (
      <>
        <HeaderElement>
          <HeaderOuter
            finalHeight={headerHeight}
            initialHeight={initialHeaderHeight}>
            <HeaderInner
              finalHeight={headerHeight}
              initialHeight={initialHeaderHeight}
              css={headerStyle}
              ref={headerRef}>
              {onRenderHeader()}
            </HeaderInner>
          </HeaderOuter>
        </HeaderElement>
        {children}
      </>
    )
  }
)

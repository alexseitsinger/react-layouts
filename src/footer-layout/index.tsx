import React, {
  ReactNode,
  ReactElement,
  useCallback,
  useRef,
  useEffect,
} from "react"
import { getStyle } from "@pacote/get-style"

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
  onRenderFooter: () => ReactNode
  initialFooterHeight: string
  footerStyle?: CSSObject
}

type Props = ContextProps &
  FooterLayoutProps & {
    children: ReactNode | ReactNode[]
  } & Partial<Readonly<typeof defaultProps>>

export const FooterLayout = withLayout(function FooterLayout({
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
  const { current } = footerRef
  const zeroHeight = "0px"
  const currentHeight = footerHeight
  const siblingHeight = headerHeight

  const hasHeight = useCallback((): boolean => {
    return isDefined(currentHeight) && currentHeight !== zeroHeight
  }, [currentHeight, zeroHeight])

  const isNewHeight = useCallback(
    (nextHeight: string): boolean => {
      return nextHeight !== headerHeight && nextHeight !== zeroHeight
    },
    [headerHeight, zeroHeight]
  )

  const getHeight = useCallback((): string => {
    if (isBrowser && current !== null) {
      return getStyle(current, "height")
    }
    if (hasHeight()) {
      return currentHeight
    }
    return initialFooterHeight
  }, [initialFooterHeight, currentHeight, current, hasHeight])

  const requiresResize = useCallback(
    (nextHeight?: string): boolean => {
      const height = nextHeight !== undefined ? nextHeight : zeroHeight
      const nextSize = parseInt(height)
      const currentSize = parseInt(currentHeight)
      return nextSize > currentSize
    },
    [getHeight, currentHeight]
  )

  const shouldUpdate = useCallback(
    (newHeight?: string): boolean => {
      let nextHeight = newHeight !== undefined ? newHeight : getHeight()
      if (hasHeight()) {
        if (requiresResize(nextHeight)) {
          //console.log("should update (footer via requiresResize)")
          return true
        }
        //console.log("should NOT update (footer via hasHeight)")
        return false
      }
      if (isNewHeight(nextHeight)) {
        //console.log("should update (footer via isNewHeight)")
        return true
      }
      //console.log("should NOT update (footer via shouldUpdate)")
      return false
    },
    [getHeight, isNewHeight, hasHeight, siblingHeight, requiresResize]
  )

  const updateHeight = useCallback((): void => {
    const newHeight = getHeight()
    if (shouldUpdate(newHeight)) {
      //console.log("onResize (footer via updateHeight)")
      onResize({
        nextFooterHeight: newHeight,
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
})

FooterLayout.defaultProps = defaultProps

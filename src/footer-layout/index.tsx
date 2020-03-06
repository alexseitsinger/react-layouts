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
import { debugMessage } from "src/debug"

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
  const zeroPx = "0px"
  const currentHeight = footerHeight
  const siblingHeight = headerHeight
  const initialHeight = initialFooterHeight

  const hasRealHeight = useCallback((): boolean => {
    return (
      isDefined(currentHeight) &&
      currentHeight !== initialHeight &&
      currentHeight !== zeroPx
    )
  }, [currentHeight, zeroPx])

  const getHeight = useCallback((): string => {
    if (isBrowser && current !== null) {
      return getStyle(current, "height")
    }
    if (hasRealHeight()) {
      return currentHeight
    }
    return initialHeight
  }, [initialHeight, currentHeight, current, hasRealHeight, zeroPx])

  const requiresResize = useCallback(
    (nextHeight?: string): boolean => {
      const height = nextHeight !== undefined ? nextHeight : getHeight()
      switch (height) {
        default: {
          return true
        }
        case currentHeight:
        case initialHeight: {
          return false
        }
      }
    },
    [getHeight, currentHeight, initialHeight]
  )

  const shouldUpdate = useCallback(
    (newHeight?: string): boolean => {
      let nextHeight = newHeight !== undefined ? newHeight : getHeight()
      debugMessage(`nextHeight (footer): ${nextHeight}`)
      if (hasRealHeight()) {
        if (requiresResize(nextHeight)) {
          debugMessage("should update footer (requiresResize)")
          return true
        }
        debugMessage("should NOT update footer (hasRealHeight)")
        return false
      }
      if (currentHeight === initialHeight) {
        debugMessage("current === initial (footer)")
        if (nextHeight !== initialHeight) {
          debugMessage("should update footer (next !== initial)")
          return true
        }
        debugMessage("should NOT update footer (current === initial")
        return false
      }
      debugMessage("should update footer (shouldUpdate)")
      return true
    },
    [getHeight, initialHeight, hasRealHeight, siblingHeight, requiresResize]
  )

  const updateHeight = useCallback((): void => {
    const newHeight = getHeight()
    if (shouldUpdate(newHeight)) {
      debugMessage("onResize (footer via updateHeight)")
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

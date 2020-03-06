import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useRef,
  useEffect,
} from "react"
import { CSSObject } from "@emotion/core"
import { getStyle } from "@pacote/get-style"

import { withLayout } from "src/hoc"

import { LayoutContextProps as ContextProps } from "../context"
import { isBrowser, isDefined } from "../utils"

import { HeaderElement, HeaderInner, HeaderOuter } from "./elements"
import { debugMessage } from "src/debug"

export interface HeaderLayoutProps {
  onRenderHeader: () => ReactNode
  initialHeaderHeight: string
  headerStyle?: CSSObject
}

type BaseProps = ContextProps & HeaderLayoutProps
type Props = BaseProps & {
  children: ReactNode | ReactNode[]
}

export const HeaderLayout = withLayout(function HeaderLayout({
  children,
  headerHeight,
  initialHeaderHeight,
  headerStyle,
  onRenderHeader,
  onResize,
  footerHeight,
}: Props): ReactElement {
  const headerRef = useRef<HTMLDivElement>(null)
  const { current } = headerRef
  const zeroPx = "0px"
  const currentHeight = headerHeight
  const siblingHeight = footerHeight
  const initialHeight = initialHeaderHeight

  const hasRealHeight = useCallback((): boolean => {
    return (
      isDefined(currentHeight) &&
      currentHeight !== initialHeight &&
      currentHeight !== zeroPx
    )
  }, [currentHeight, zeroPx])

  const getHeight = useCallback((): string => {
    if (hasRealHeight()) {
      return currentHeight
    }
    if (isBrowser && current !== null) {
      return getStyle(current, "height")
    }
    return initialHeight
  }, [initialHeight, currentHeight, current, hasRealHeight])

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
      debugMessage(`nextHeight (header): ${nextHeight}`)
      if (hasRealHeight()) {
        if (requiresResize(nextHeight)) {
          debugMessage("should update header (requiresResize)")
          return true
        }
        debugMessage("should NOT update header (hasRealHeight)")
        return false
      }
      if (currentHeight === initialHeight) {
        debugMessage("current === initial (header)")
        if (nextHeight !== initialHeight) {
          debugMessage("should update header (next !== initial)")
          return true
        }
        debugMessage("should NOT update header (current === initial")
        return false
      }
      debugMessage("should update header (shouldUpdate)")
      return true
    },
    [getHeight, initialHeight, hasRealHeight, siblingHeight, requiresResize]
  )

  const updateHeight = useCallback((): void => {
    const newHeight = getHeight()
    if (shouldUpdate(newHeight)) {
      debugMessage("onResize (header via updateHeight)")
      onResize({
        nextHeaderHeight: newHeight,
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
})

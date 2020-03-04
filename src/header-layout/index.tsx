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
  const zeroHeight = "0px"
  const currentHeight = headerHeight
  const siblingHeight = footerHeight

  const hasHeight = useCallback((): boolean => {
    return isDefined(currentHeight) && currentHeight !== zeroHeight
  }, [currentHeight, zeroHeight])

  const isNewHeight = useCallback(
    (nextHeight: string): boolean => {
      return nextHeight !== currentHeight && nextHeight !== zeroHeight
    },
    [currentHeight, zeroHeight]
  )

  const getHeight = useCallback((): string => {
    if (isBrowser && current !== null) {
      return getStyle(current, "height")
    }
    if (hasHeight()) {
      return currentHeight
    }
    return initialHeaderHeight
  }, [initialHeaderHeight, currentHeight, current, hasHeight])

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
          //console.log("should update (header via requiredResize)")
          return true
        }
        //console.log("should NOT update (header via hasHeight)")
        return false
      }
      if (isNewHeight(nextHeight)) {
        //console.log("should update (header via isNewHeight)")
        return true
      }
      //console.log("should NOT update (header via shouldUpdate)")
      return false
    },
    [getHeight, isNewHeight, hasHeight, siblingHeight, requiresResize]
  )

  const updateHeight = useCallback((): void => {
    const newHeight = getHeight()
    if (shouldUpdate(newHeight)) {
      //console.log("onResize (header via updateHeight)")
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

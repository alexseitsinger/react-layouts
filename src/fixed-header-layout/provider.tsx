import React, {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  ReactElement,
} from "react"
import { CSSObject } from "@emotion/core"
import { debounce, isEqual } from "underscore"

import { isBrowser } from "../utils"
import { Header } from "./header"
import {
  FixedHeaderLayoutContext as Context,
  FixedHeaderLayoutContextProps as ContextProps,
  defaultContext,
} from "./context"

interface Props {
  children: ReactNode | ReactNode[];
  onRenderHeader: () => ReactNode;
  headerStyle?: CSSObject;
  initialViewportHeight: string;
  initialHeaderHeight: string;
}

export function FixedHeaderLayout({
  initialHeaderHeight,
  initialViewportHeight,
  onRenderHeader,
  children,
  headerStyle,
}: Props): ReactElement {
  const [state, setState] = useState(defaultContext)
  const initialHeaderSize = parseInt(initialHeaderHeight)
  const initialViewportSize = parseInt(initialViewportHeight)

  const getViewportHeight = useCallback((): string => {
    let size = initialViewportSize
    if (isBrowser) {
      size = document.documentElement.clientHeight
    }
    return `${size}px`
  }, [initialViewportSize])

  const getHeaderHeight = useCallback(
    (newSize?: string): string => {
      let size = initialHeaderSize
      if (newSize !== undefined) {
        size = parseInt(newSize)
      }
      size = Math.max(0, size)
      return `${size}px`
    },
    [initialHeaderSize]
  )

  const getMainHeight = useCallback(
    (nextHeaderHeight?: string): string => {
      const viewportSize = parseInt(getViewportHeight())
      const headerSize = parseInt(getHeaderHeight(nextHeaderHeight))
      const size = Math.max(0, viewportSize - headerSize)
      return `${size}px`
    },
    [getHeaderHeight]
  )

  const getHeights = useCallback(
    (nextHeaderHeight?: string): ContextProps => {
      const newHeaderHeight = getHeaderHeight(nextHeaderHeight)
      return {
        viewportHeight: getViewportHeight(),
        headerHeight: newHeaderHeight,
        mainHeight: getMainHeight(newHeaderHeight),
      }
    },
    [getViewportHeight, getHeaderHeight, getMainHeight]
  )

  const updateHeights = useCallback(
    (nextHeaderHeight?: string): void => {
      const heights = getHeights(nextHeaderHeight)
      if (isEqual(state, heights)) {
        return
      }
      console.log("heights: ", heights)
      setState(heights)
    },
    [state, getHeights]
  )

  const handleResize = useCallback(
    debounce(() => {
      updateHeights()
    }, 600),
    [updateHeights]
  )

  useEffect(() => {
    if (isBrowser) {
      window.addEventListener("resize", handleResize)
    }
    updateHeights()
    return () => {
      if (isBrowser) {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  updateHeights()

  return (
    <>
      <Header
        initialHeight={initialHeaderHeight}
        finalHeight={state.headerHeight}
        onResize={handleResize}
        styles={headerStyle}>
        {onRenderHeader()}
      </Header>
      <Context.Provider value={state}>{children}</Context.Provider>
    </>
  )
}

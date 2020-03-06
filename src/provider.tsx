import React, {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  ReactElement,
  useRef,
} from "react"
import { debounce } from "underscore"

import { isBrowser, getSize } from "./utils"
import {
  LayoutContext as Context,
  LayoutContextProps as ContextProps,
} from "./context"
import { SidebarLayoutProps } from "src/sidebar-layout"
import { HeaderLayoutProps } from "src/header-layout"
import { FooterLayoutProps } from "src/footer-layout"
import { debugMessage } from "src/debug"

const zeroPx = "0px"

export const defaultProps = {
  initialViewportHeight: zeroPx,
  initialHeaderHeight: zeroPx,
  initialFooterHeight: zeroPx,
  sidebarWidth: zeroPx,
}

type Props = {
  children: ReactNode | ReactNode[]
} & Partial<SidebarLayoutProps> &
  Partial<FooterLayoutProps> &
  Partial<HeaderLayoutProps> &
  Readonly<typeof defaultProps>

export const initialState = {
  viewportHeight: zeroPx,
  headerHeight: zeroPx,
  mainHeight: zeroPx,
  footerHeight: zeroPx,
}

type State = typeof initialState

export interface HeightProps {
  nextHeaderHeight?: string
  nextFooterHeight?: string
}

export function LayoutProvider({
  children,
  initialHeaderHeight,
  initialViewportHeight,
  initialFooterHeight,
  headerStyle,
  footerStyle,
  onRenderHeader,
  onRenderFooter,
  onRenderSidebar,
  sidebarWidth,
  sidebarVoidStyle,
  sidebarBodyStyle,
  sidebarContainerStyle,
}: Props): ReactElement {
  const [state, setState] = useState(initialState)
  const initialHeaderSize = getSize(initialHeaderHeight)
  const initialViewportSize = getSize(initialViewportHeight)
  const initialFooterSize = getSize(initialFooterHeight)

  const getViewportHeight = useCallback((): string => {
    let size = initialViewportSize
    if (isBrowser) {
      size = document.documentElement.clientHeight
    }
    return `${size}px`
  }, [initialViewportSize])

  const getHeaderHeight = useCallback(
    (newSize?: string): string => {
      let size: string | number = initialHeaderSize
      if (newSize !== undefined) {
        size = newSize
      }
      size = getSize(size)
      return `${size}px`
    },
    [initialHeaderSize]
  )

  const getFooterHeight = useCallback(
    (newSize?: string): string => {
      let size: string | number = initialFooterSize
      if (newSize !== undefined) {
        size = newSize
      }
      size = getSize(size)
      return `${size}px`
    },
    [initialFooterSize]
  )

  const getMainHeight = useCallback(
    ({ nextHeaderHeight, nextFooterHeight }: HeightProps): string => {
      const viewportSize = getSize(getViewportHeight())
      const headerSize = getSize(getHeaderHeight(nextHeaderHeight))
      const footerSize = getSize(getFooterHeight(nextFooterHeight))
      const offset = headerSize + footerSize
      const size = getSize(viewportSize - offset)
      return `${size}px`
    },
    [getHeaderHeight, getFooterHeight]
  )

  const getHeights = useCallback(
    ({ nextHeaderHeight, nextFooterHeight }: HeightProps): State => {
      const newHeaderHeight = getHeaderHeight(nextHeaderHeight)
      const newFooterHeight = getFooterHeight(nextFooterHeight)
      return {
        viewportHeight: getViewportHeight(),
        headerHeight: newHeaderHeight,
        footerHeight: newFooterHeight,
        mainHeight: getMainHeight({
          nextHeaderHeight: newHeaderHeight,
          nextFooterHeight: newFooterHeight,
        }),
      }
    },
    [getViewportHeight, getHeaderHeight, getMainHeight, getFooterHeight]
  )

  const isFooterChange = useCallback((props: HeightProps) => {
    const keys = Object.keys(props)
    const key = "nextFooterHeight"
    const isChange = keys.includes(key)
    return isChange && props[key] !== zeroPx
  }, [])

  const isHeaderChange = useCallback((props: HeightProps) => {
    const keys = Object.keys(props)
    const key = "nextHeaderHeight"
    const isChange = keys.includes(key)
    return isChange && props[key] !== zeroPx
  }, [])

  const updates = useRef({
    headerHeight: zeroPx,
    footerHeight: zeroPx,
  })

  const applyUpdates = useCallback(
    debounce(() => {
      const {
        headerHeight: updatedHeaderHeight,
        footerHeight: updatedFooterHeight,
      } = updates.current

      const newHeights = getHeights({
        nextHeaderHeight: updatedHeaderHeight,
        nextFooterHeight: updatedFooterHeight,
      })

      debugMessage(`newHeights: ${newHeights}`)

      setState(newHeights)

      updates.current.headerHeight = zeroPx
      updates.current.footerHeight = zeroPx
    }, 10),
    [setState, getHeights, updates]
  )

  const updateHeights = useCallback(
    ({ nextHeaderHeight, nextFooterHeight }: HeightProps): void => {
      setTimeout(() => {
        debugMessage("updateHeights()")

        if (nextHeaderHeight !== undefined) {
          if (nextHeaderHeight === state.headerHeight) {
            return
          }
          updates.current.headerHeight = nextHeaderHeight
          if (state.footerHeight !== zeroPx) {
            updates.current.footerHeight = state.footerHeight
          }
        }

        if (nextFooterHeight !== undefined) {
          if (nextFooterHeight === state.footerHeight) {
            return
          }

          updates.current.footerHeight = nextFooterHeight
          if (state.headerHeight !== zeroPx) {
            updates.current.headerHeight = state.headerHeight
          }
        }
      }, 1)

      applyUpdates()
    },
    [getHeights, setState, isHeaderChange, isFooterChange, applyUpdates]
  )

  const handleResize = useCallback(
    debounce(() => updateHeights({}), 600),
    [updateHeights]
  )

  useEffect(() => {
    if (isBrowser) {
      window.addEventListener("resize", handleResize)
    }
    return () => {
      if (isBrowser) {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  //updateHeights({})

  const contextValue: ContextProps = {
    ...state,
    onRenderHeader,
    onRenderFooter,
    onRenderSidebar,
    initialViewportHeight,
    initialHeaderHeight,
    initialFooterHeight,
    sidebarWidth,
    sidebarVoidStyle,
    sidebarBodyStyle,
    sidebarContainerStyle,
    headerStyle,
    footerStyle,
    onResize: updateHeights,
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

LayoutProvider.defaultProps = defaultProps

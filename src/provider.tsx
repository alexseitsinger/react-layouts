import React, {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  ReactElement,
  createRef,
  useRef,
} from "react"
import { debounce, throttle, isEqual } from "underscore"

import { isBrowser } from "./utils"
import {
  LayoutContext as Context,
  LayoutContextProps as ContextProps,
} from "./context"
import { SidebarLayoutProps } from "src/sidebar-layout"
import { HeaderLayoutProps } from "src/header-layout"
import { FooterLayoutProps } from "src/footer-layout"

export const defaultProps = {
  initialHeaderHeight: "0px",
  initialFooterHeight: "0px",
  sidebarWidth: "0px",
}

type Props = {
  children: ReactNode | ReactNode[],
  initialViewportHeight: string,
} & Partial<SidebarLayoutProps> &
  Partial<FooterLayoutProps> &
  Partial<HeaderLayoutProps> &
  Readonly<typeof defaultProps>

export const initialState = {
  viewportHeight: "0px",
  headerHeight: "0px",
  mainHeight: "0px",
  footerHeight: "0px",
}

type State = typeof initialState

export interface HeightProps {
  nextHeaderHeight?: string;
  nextFooterHeight?: string;
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
  const initialHeaderSize = parseInt(initialHeaderHeight)
  const initialViewportSize = parseInt(initialViewportHeight)
  const initialFooterSize = parseInt(initialFooterHeight)

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

  const getFooterHeight = useCallback(
    (newSize?: string): string => {
      let size = initialFooterSize
      if (newSize !== undefined) {
        size = parseInt(newSize)
      }
      size = Math.max(0, size)
      return `${size}px`
    },
    [initialFooterSize]
  )

  const getMainHeight = useCallback(
    ({ nextHeaderHeight, nextFooterHeight }: HeightProps): string => {
      const viewportSize = parseInt(getViewportHeight())
      const headerSize = parseInt(getHeaderHeight(nextHeaderHeight))
      const footerSize = parseInt(getFooterHeight(nextFooterHeight))
      const offset = headerSize + footerSize
      const size = Math.max(0, viewportSize - offset)
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
    return isChange && props[key] !== "0px"
  }, [])

  const isHeaderChange = useCallback((props: HeightProps) => {
    const keys = Object.keys(props)
    const key = "nextHeaderHeight"
    const isChange = keys.includes(key)
    return isChange && props[key] !== "0px"
  }, [])

  const updates = useRef({
    headerHeight: "0px",
    footerHeight: "0px",
  })

  const saveUpdates = useCallback(
    debounce(() => {
      console.log("saving updates...")
      const heights = getHeights({
        nextHeaderHeight: updates.current.headerHeight,
        nextFooterHeight: updates.current.footerHeight,
      })
      console.log("heights: ", heights)
      setState(heights)
      updates.current.headerHeight = "0px"
      updates.current.footerHeight = "0px"
    }, 2000),
    [setState, getHeights, updates]
  )

  const updateHeights = useCallback(
    (props: HeightProps): void => {
      setTimeout(() => {
        console.log("props: ", props)
        const nextHeights = getHeights(props)
        if (isHeaderChange(props)) {
          console.log("isHeaderChange")
          if (nextHeights.headerHeight === state.headerHeight) {
            console.log("header is the same, so skipping")
            return
          }
          if (updates.current.headerHeight === "0px") {
            console.log("Setting header height for an update")
            updates.current.headerHeight = nextHeights.headerHeight
          }
        }
        if (isFooterChange(props)) {
          console.log("isFooterChange")
          if (nextHeights.footerHeight === state.footerHeight) {
            console.log("footer is the same, so skipping")
            return
          }
          if (updates.current.footerHeight === "0px") {
            console.log("Setting footer height for an update")
            updates.current.footerHeight = nextHeights.footerHeight
          }
        }
        saveUpdates()
      }, 100)
    },
    [getHeights, setState, isHeaderChange, isFooterChange, saveUpdates]
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

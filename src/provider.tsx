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

const zeroHeight = "0px"

export const defaultProps = {
  initialHeaderHeight: zeroHeight,
  initialFooterHeight: zeroHeight,
  sidebarWidth: zeroHeight,
}

type Props = {
  children: ReactNode | ReactNode[]
  initialViewportHeight: string
} & Partial<SidebarLayoutProps> &
  Partial<FooterLayoutProps> &
  Partial<HeaderLayoutProps> &
  Readonly<typeof defaultProps>

export const initialState = {
  viewportHeight: zeroHeight,
  headerHeight: zeroHeight,
  mainHeight: zeroHeight,
  footerHeight: zeroHeight,
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
    return isChange && props[key] !== zeroHeight
  }, [])

  const isHeaderChange = useCallback((props: HeightProps) => {
    const keys = Object.keys(props)
    const key = "nextHeaderHeight"
    const isChange = keys.includes(key)
    return isChange && props[key] !== zeroHeight
  }, [])

  const updates = useRef({
    headerHeight: zeroHeight,
    footerHeight: zeroHeight,
  })

  const saveUpdates = useCallback(
    debounce(() => {
      const { headerHeight, footerHeight } = updates.current
      const heights = getHeights({
        nextHeaderHeight: headerHeight,
        nextFooterHeight: footerHeight,
      })
      setState(heights)
      updates.current.headerHeight = zeroHeight
      updates.current.footerHeight = zeroHeight
    }, 2000),
    [setState, getHeights, updates]
  )

  const updateHeights = useCallback(
    (props: HeightProps): void => {
      setTimeout(() => {
        const {
          headerHeight: nextHeaderHeight,
          footerHeight: nextFooterHeight,
        } = getHeights(props)
        const {
          headerHeight: updatedHeaderHeight,
          footerHeight: updatedFooterHeight,
        } = updates.current
        const {
          headerHeight: currentHeaderHeight,
          footerHeight: currentFooterHeight,
        } = state
        if (isHeaderChange(props)) {
          if (nextHeaderHeight === currentHeaderHeight) {
            return
          }
          if (updatedHeaderHeight === zeroHeight) {
            updates.current.headerHeight = nextHeaderHeight
          }
        }
        if (isFooterChange(props)) {
          if (nextFooterHeight === currentFooterHeight) {
            return
          }
          if (updatedFooterHeight === zeroHeight) {
            updates.current.footerHeight = nextFooterHeight
          }
        }
        saveUpdates()
      }, 1)
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

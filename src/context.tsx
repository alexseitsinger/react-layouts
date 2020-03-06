import React, { ReactNode } from "react"
import { CSSObject } from "@emotion/core"
import { HeightProps, initialState, defaultProps } from "./provider"
import { createPureContext } from "react-shallow-context"

export const defaultContext = {}

export type LayoutContextProps = {
  onRenderHeader?: () => ReactNode
  onRenderFooter?: () => ReactNode
  onRenderSidebar?: () => ReactNode
  sidebarVoidStyle?: CSSObject
  sidebarBodyStyle?: CSSObject
  sidebarContainerStyle?: CSSObject
  headerStyle?: CSSObject
  footerStyle?: CSSObject
  onResize: (p: HeightProps) => void
  initialFooterHeight: string
  initialHeaderHeight: string
  initialViewportHeight: string
} & typeof initialState &
  typeof defaultProps

export const LayoutContext = createPureContext(defaultContext)

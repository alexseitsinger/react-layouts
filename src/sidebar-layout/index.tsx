import React, { ReactElement, ReactNode } from "react"

import {
  SidebarLayoutMain,
  SidebarBody,
  SidebarContainer,
  SidebarVoid,
} from "./elements"
import { LayoutContextProps as ContextProps } from "../context"
import { withLayout } from "../hoc"
import { CSSObject } from "@emotion/core"

export type SidebarLayoutProps = {
  onRenderSidebar: () => ReactNode
  sidebarWidth: string
  sidebarContainerStyle?: CSSObject
  sidebarVoidStyle?: CSSObject
  sidebarBodyStyle?: CSSObject
}

type Props = ContextProps &
  SidebarLayoutProps & {
    children: ReactNode | ReactNode[]
  }

export const SidebarLayout = withLayout(
  ({
    children,
    onRenderSidebar,
    sidebarWidth,
    sidebarContainerStyle,
    sidebarVoidStyle,
    sidebarBodyStyle,
    headerHeight,
    mainHeight,
    footerHeight,
  }: Props): ReactElement => (
    <>
      <SidebarLayoutMain sidebarWidth={sidebarWidth} mainHeight={mainHeight}>
        {children}
      </SidebarLayoutMain>
      <SidebarContainer sidebarWidth={sidebarWidth} css={sidebarContainerStyle}>
        <SidebarVoid headerHeight={headerHeight} css={sidebarVoidStyle} />
        <SidebarBody
          mainHeight={mainHeight}
          footerHeight={footerHeight}
          css={sidebarBodyStyle}>
          {onRenderSidebar()}
        </SidebarBody>
      </SidebarContainer>
    </>
  )
)

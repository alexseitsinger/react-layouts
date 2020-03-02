import React, { ReactElement, ReactNode } from "react"
import { CSSObject } from "@emotion/core"

import {
  SidebarBody,
  SidebarContainer,
  SidebarLayoutContainer,
  SidebarVoid,
} from "./elements"
import { FixedHeaderLayoutContextProps as ContextProps } from "../context"
import { withFixedHeaderLayout } from "../hoc"

type Props = {
  children: ReactNode | ReactNode[],
  onRenderSidebar: () => ReactElement,
  sidebarWidth: string,
  containerStyle?: CSSObject,
  voidStyle?: CSSObject,
  bodyStyle?: CSSObject,
} & ContextProps

const Component = ({
  children,
  onRenderSidebar,
  sidebarWidth,
  containerStyle,
  voidStyle,
  bodyStyle,
  headerHeight,
  mainHeight,
}: Props): ReactElement => (
  <SidebarLayoutContainer sidebarWidth={sidebarWidth}>
    {children}
    <SidebarContainer sidebarWidth={sidebarWidth} css={containerStyle}>
      <SidebarVoid headerHeight={headerHeight} css={voidStyle} />
      <SidebarBody mainHeight={mainHeight} css={bodyStyle}>
        {onRenderSidebar()}
      </SidebarBody>
    </SidebarContainer>
  </SidebarLayoutContainer>
)

export const SidebarLayout = withFixedHeaderLayout(Component)

import React, { ReactNode } from "react"

import {
  SidebarBody,
  SidebarContainer,
  SidebarFixed,
  SidebarVoid,
} from "./elements"
import { PageContainer } from "./PageContainer"
import { withFixedHeaderLayout } from "./withFixedHeaderLayout"

interface Props {
  renderSidebar: () => React.ReactElement;
  mainHeight: string;
  headerHeight: string;
  viewportHeight: string;
  sidebarWidth: string;
  children: ReactNode | ReactNode[];
}

export const SidebarLayout = withFixedHeaderLayout(
  ({
    children,
    renderSidebar,
    headerHeight,
    mainHeight,
    sidebarWidth,
  }: Props): React.ReactElement => (
    <SidebarContainer sidebarWidth={sidebarWidth}>
      <PageContainer>{children}</PageContainer>
      <SidebarFixed sidebarWidth={sidebarWidth}>
        <SidebarVoid headerHeight={headerHeight} />
        <SidebarBody mainHeight={mainHeight}>{renderSidebar()}</SidebarBody>
      </SidebarFixed>
    </SidebarContainer>
  )
)

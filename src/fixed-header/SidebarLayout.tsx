import React, { ReactNode } from "react"
import { CSSObject } from "@emotion/core"

import {
  SidebarBody,
  SidebarContainer,
  SidebarLayoutContainer,
  SidebarVoid,
} from "./elements"
import { PageContainer } from "./PageContainer"
import { withFixedHeaderLayout } from "./withFixedHeaderLayout"

interface Props {
  children: ReactNode | ReactNode[];
  renderSidebar: () => React.ReactElement;
  mainHeight: string;
  headerHeight: string;
  viewportHeight: string;
  sidebarWidth: string;
  containerStyle: CSSObject;
  voidStyle: CSSObject;
  bodyStyle: CSSObject;
}

export const SidebarLayout = withFixedHeaderLayout(
  ({
    children,
    renderSidebar,
    headerHeight,
    mainHeight,
    sidebarWidth,
    containerStyle,
    voidStyle,
    bodyStyle,
  }: Props): React.ReactElement => (
    <SidebarLayoutContainer sidebarWidth={sidebarWidth}>
      <PageContainer>{children}</PageContainer>
      <SidebarContainer sidebarWidth={sidebarWidth} css={containerStyle}>
        <SidebarVoid headerHeight={headerHeight} css={voidStyle} />
        <SidebarBody mainHeight={mainHeight} css={bodyStyle}>
          {renderSidebar()}
        </SidebarBody>
      </SidebarContainer>
    </SidebarLayoutContainer>
  )
)

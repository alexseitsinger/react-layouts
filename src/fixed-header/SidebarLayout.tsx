import React, { ReactNode } from "react"
import { CSSObject } from "@emotion/core"

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
  containerStyle: CSSObject;
  voidStyle: CSSObject;
  bodyStyle: CSSObject;
  fixedStyle: CSSObject;
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
    fixedStyle,
  }: Props): React.ReactElement => (
    <SidebarContainer sidebarWidth={sidebarWidth} css={containerStyle}>
      <PageContainer>{children}</PageContainer>
      <SidebarFixed sidebarWidth={sidebarWidth} css={fixedStyle}>
        <SidebarVoid headerHeight={headerHeight} css={voidStyle} />
        <SidebarBody mainHeight={mainHeight} css={bodyStyle}>
          {renderSidebar()}
        </SidebarBody>
      </SidebarFixed>
    </SidebarContainer>
  )
)

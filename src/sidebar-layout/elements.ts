import { css, SerializedStyles } from "@emotion/core"
import styled from "@emotion/styled"

import { headerLayer } from "../header-layout/elements"

interface SidebarLayoutMainProps {
  sidebarWidth: string;
  mainHeight: string;
}

export const SidebarLayoutMain = styled.div`
  ${({
    mainHeight,
    sidebarWidth,
  }: SidebarLayoutMainProps): SerializedStyles => css`
    margin-right: ${sidebarWidth};
    min-height: ${mainHeight};
  `}
`

interface SidebarLayoutContainerProps {
  sidebarWidth: string;
}

export const SidebarLayoutContainer = styled.div`
  ${({ sidebarWidth }: SidebarLayoutContainerProps): SerializedStyles => css`
    margin-right: ${sidebarWidth};
  `}
`

interface SidebarContainerProps {
  sidebarWidth: string;
}

/**
 * Use z-index of fixed header + 1 (81)
 */
export const SidebarContainer = styled.aside`
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${headerLayer + 1};
  ${({ sidebarWidth }: SidebarContainerProps): SerializedStyles => css`
    width: ${sidebarWidth};
  `}
`

interface SidebarVoidProps {
  headerHeight: string;
}

export const SidebarVoid = styled.div`
  ${({ headerHeight }: SidebarVoidProps): SerializedStyles => css`
    height: ${headerHeight};
  `}
`

interface SidebarBodyProps {
  mainHeight: string;
  footerHeight: string;
}

export const SidebarBody = styled.div`
  ${({ footerHeight, mainHeight }: SidebarBodyProps): SerializedStyles => {
    const fullSize = parseInt(mainHeight) + parseInt(footerHeight)
    const fullHeight = `${fullSize}px`
    return css`
      height: ${fullHeight};
    `
  }}
`

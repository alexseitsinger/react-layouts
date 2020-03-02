import styled from "@emotion/styled"
import { css, SerializedStyles } from "@emotion/core"

import { headerLayer } from "../header/elements"

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
  top: 0;
  right: 0;
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
}

export const SidebarBody = styled.div`
  ${({ mainHeight }: SidebarBodyProps): SerializedStyles => css`
    height: ${mainHeight};
  `}
`

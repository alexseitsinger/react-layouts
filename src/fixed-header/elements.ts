import { css, SerializedStyles } from "@emotion/core"
import styled from "@emotion/styled"

import { FixedHeaderLayoutContextProps } from "./FixedHeaderLayoutContext"

/**
 * Our header is layered here, and then the fixed container in the sidebar is
 * above the header so styles for the void are visible.
 */
const headerLayer = 80

type MainElementProps = Partial<FixedHeaderLayoutContextProps> & {
  isStatic?: boolean,
}

export const MainElement = styled.main`
  ${({ mainHeight, isStatic }: MainElementProps): SerializedStyles => {
    if (isStatic !== undefined && isStatic) {
      return css`
        height: ${mainHeight};
      `
    }
    return css`
      min-height: ${mainHeight};
    `
  }}
`

/**
 * NOTE: SimpleModal uses 100/101 as the zIndex, so make sure this zIndex is
 * always less than that. and above any other zIndex.
 */

export const HeaderContainer = styled.header`
  position: relative;
  z-index: ${headerLayer};
`

export interface HeaderOuterProps {
  fixedHeight: string;
  initialHeight: string;
}

export const HeaderOuter = styled.div`
  ${({ fixedHeight, initialHeight }: HeaderOuterProps): SerializedStyles => {
    if (fixedHeight !== undefined) {
      return css`
        height: ${fixedHeight};
      `
    }
    if (initialHeight !== undefined) {
      return css`
        min-height: ${initialHeight};
      `
    }
    return css``
  }}
`

export interface HeaderInnerProps {
  fixedHeight: string;
  initialHeight: string;
}

export const HeaderInner = styled.div`
  width: 100%;
  ${({ fixedHeight, initialHeight }: HeaderInnerProps): SerializedStyles => {
    if (fixedHeight !== undefined) {
      return css`
        height: ${fixedHeight};
        position: fixed;
        top: 0;
      `
    }
    if (initialHeight !== undefined) {
      return css`
        min-height: ${initialHeight};
      `
    }
    return css``
  }}
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

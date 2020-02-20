import { css } from "@emotion/core"
import styled from "@emotion/styled"

export const Container = styled.div`
  position: relative;
  display: flex;
`

/**
 * NOTE: SimpleModal uses 100/101 as the zIndex, so make sure this zIndex is
 * always less than that. and above any other zIndex.
 */

export const HeaderContainer = styled.div`
  position: relative;
  z-index: 80;
`

export interface HeaderOuterProps {
  fixedHeight: string;
  initialHeight: string;
}

export const HeaderOuter = styled.div`
  ${({ fixedHeight, initialHeight }: HeaderOuterProps): any => {
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
  }}
`

export interface HeaderInnerProps {
  fixedHeight: string;
  initialHeight: string;
}

export const HeaderInner = styled.div`
  width: 100%;
  ${({ fixedHeight, initialHeight }: HeaderInnerProps): any => {
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
  }}
`

interface SidebarContainerProps {
  sidebarWidth: string;
}

export const SidebarContainer = styled.div`
  display: flex;
  ${({ sidebarWidth }: SidebarContainerProps): any => {
    return css`
      width: ${sidebarWidth};
    `
  }}
`

interface SidebarFixedProps {
  sidebarWidth: string;
}

export const SidebarFixed = styled.div`
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  ${({ sidebarWidth }: SidebarFixedProps): any => {
    return css`
      width: ${sidebarWidth};
    `
  }}
`

interface SidebarVoidProps {
  headerHeight: string;
}

export const SidebarVoid = styled.div`
  ${({ headerHeight }: SidebarVoidProps): any => {
    return css`
      height: ${headerHeight};
    `
  }}
`

interface SidebarBodyProps {
  mainHeight: string;
}

export const SidebarBody = styled.div`
  ${({ mainHeight }: SidebarBodyProps): any => {
    return css`
      height: ${mainHeight};
    `
  }}
`

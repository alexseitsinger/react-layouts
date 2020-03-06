import { css, SerializedStyles } from "@emotion/core"
import styled from "@emotion/styled"

export const headerLayer = 80

/**
 * Our header is layered here, and then the fixed container in the sidebar is
 * above the header so styles for the void are visible.
 */

/**
 * NOTE: SimpleModal uses 100/101 as the zIndex, so make sure this zIndex is
 * always less than that. and above any other zIndex.
 */

export const HeaderElement = styled.header`
  position: relative;
  z-index: ${headerLayer};
`

export interface HeaderOuterProps {
  finalHeight: string
  initialHeight: string
}

export const HeaderOuter = styled.div`
  ${({ finalHeight, initialHeight }: HeaderOuterProps): SerializedStyles => {
    if (finalHeight !== "0px") {
      if (finalHeight !== initialHeight) {
        return css`
          height: ${finalHeight};
        `
      }
    }
    // If we don't use a min-height here, the elements get stuck at the initial height.
    return css`
      min-height: ${initialHeight};
    `
  }}
`

export interface HeaderInnerProps {
  finalHeight: string
  initialHeight: string
}

export const HeaderInner = styled.div`
  width: 100%;
  ${({ finalHeight, initialHeight }: HeaderInnerProps): SerializedStyles => {
    if (finalHeight !== "0px") {
      if (finalHeight !== initialHeight) {
        return css`
          height: ${finalHeight};
          position: fixed;
          top: 0;
        `
      }
    }
    return css`
      min-height: ${initialHeight};
    `
  }}
`

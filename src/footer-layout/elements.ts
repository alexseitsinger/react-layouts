import { css, SerializedStyles } from "@emotion/core"
import styled from "@emotion/styled"

interface FooterElementProps {
  initialHeight: string;
  finalHeight: string;
  isStatic?: boolean;
}

export const FooterElement = styled.footer`
  ${({
    finalHeight,
    initialHeight,
    isStatic,
  }: FooterElementProps): SerializedStyles => {
    const height = finalHeight !== "0px" ? finalHeight : initialHeight
    if (isStatic !== undefined && isStatic) {
      return css`
        height: ${height};
      `
    }
    return css`
      min-height: ${height};
    `
  }}
`

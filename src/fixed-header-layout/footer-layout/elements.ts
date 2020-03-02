import styled from "@emotion/styled"
import { css, SerializedStyles } from "@emotion/core"

type FooterElementProps = {
  initialHeight: string,
  isStatic?: boolean,
}

export const FooterElement = styled.footer`
  ${({ initialHeight, isStatic }: FooterElementProps): SerializedStyles => {
    if (isStatic !== undefined && isStatic) {
      return css`
        height: ${initialHeight};
      `
    }
    return css`
      min-height: ${initialHeight};
    `
  }}
`

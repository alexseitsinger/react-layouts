import { css, SerializedStyles } from "@emotion/core"
import styled from "@emotion/styled"

interface FooterElementProps {
  initialHeight: string
  finalHeight: string
  isStatic?: boolean
}

export const FooterElement = styled.footer`
  ${({
    finalHeight,
    initialHeight,
    isStatic,
  }: FooterElementProps): SerializedStyles => {
    if (finalHeight !== "0px") {
      if (finalHeight !== initialHeight) {
        return css`
          height: ${finalHeight};
        `
      }
    }
    return css`
      min-height: ${initialHeight};
    `
  }}
`

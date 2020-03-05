import { css, SerializedStyles } from "@emotion/core"
import styled from "@emotion/styled"

interface ViewportElementProps {
  finalHeight: string
  initialHeight: string
  isStatic?: boolean
}

export const ViewportElement = styled.div`
  ${({
    finalHeight,
    initialHeight,
    isStatic,
  }: ViewportElementProps): SerializedStyles => {
    let currentHeight = initialHeight
    if (finalHeight !== "0px") {
      currentHeight = finalHeight
    }
    if (isStatic !== undefined && isStatic) {
      return css`
        height: ${currentHeight};
      `
    }
    return css`
      min-height: ${currentHeight};
    `
  }}
`

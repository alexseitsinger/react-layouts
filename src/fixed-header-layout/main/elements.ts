import styled from "@emotion/styled"
import { SerializedStyles, css } from "@emotion/core"

import { FixedHeaderLayoutContextProps as ContextProps } from "../context"

type MainElementProps = Partial<ContextProps> & {
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

import { css, SerializedStyles } from "@emotion/core"
import styled from "@emotion/styled"

import { LayoutContextProps as ContextProps } from "../context"

type MainElementProps = Partial<ContextProps> & {
  isStatic?: boolean,
}

export const MainElement = styled.main`
  ${({ isStatic, mainHeight }: MainElementProps): SerializedStyles => {
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

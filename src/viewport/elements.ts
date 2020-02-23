import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { ViewportContextProps as ContextProps } from "./ViewportContext"

export const ViewportElement = styled.div`
  ${({ viewportHeight }: ContextProps): any => {
    return css`
      min-height: ${viewportHeight};
    `
  }}
`

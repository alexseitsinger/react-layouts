import { css, SerializedStyles } from "@emotion/core"
import styled from "@emotion/styled"

import { ViewportContextProps as ContextProps } from "./context"

export const ViewportElement = styled.div`
  ${({ viewportHeight }: ContextProps): SerializedStyles => css`
    min-height: ${viewportHeight};
  `}
`

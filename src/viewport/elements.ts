import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { ViewportContextProps as ContextProps } from "./ViewportContext"
import { withViewport } from "./withViewport"

export const ViewportContainer = withViewport(styled.div`
  ${({ viewportHeight }: ContextProps): any => {
    return css`
      min-height: ${viewportHeight};
    `
  }}
`)

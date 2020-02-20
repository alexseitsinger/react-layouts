/** @jsx jsx */
import React, { ReactElement, ReactNode } from "react"
import { jsx } from "@emotion/core"

import { Container } from "./elements"
import { withViewport } from "./withViewport"

interface Props {
  children: ReactNode | ReactNode[];
  viewportHeight: string;
}

export const ViewportContainer = withViewport(
  ({ children, viewportHeight }: Props): ReactElement => {
    const styles = {
      minHeight: viewportHeight,
    }
    return (
      <Container className={"ViewportContainer"} css={styles}>
        {children}
      </Container>
    )
  }
)

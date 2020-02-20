/** @jsx jsx */
import React, { ReactElement, ReactNode } from "react"
import { jsx } from "@emotion/core"

import { Container } from "./elements"
import { withFixedHeaderLayout } from "./withFixedHeaderLayout"

interface Props {
  mainHeight: string;
  children: ReactNode | ReactNode[];
}

export const PageContainer = withFixedHeaderLayout(
  ({ mainHeight, children }: Props): ReactElement => (
    <Container css={{ minHeight: mainHeight }}>{children}</Container>
  )
)

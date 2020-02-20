/** @jsx jsx */
import React, { ReactElement, ReactNode } from "react"
import { CSSObject, jsx } from "@emotion/core"

import { Container } from "./elements"
import { withFixedHeaderLayout } from "./withFixedHeaderLayout"

interface Props {
  isStatic: boolean;
  mainHeight: string;
  children: ReactNode | ReactNode[];
}

export const PageContainer = withFixedHeaderLayout(
  ({ mainHeight, isStatic, children }: Props): ReactElement => {
    let style: CSSObject = { minHeight: mainHeight }
    if (isStatic) {
      style = { height: mainHeight }
    }
    return <Container css={style}>{children}</Container>
  }
)

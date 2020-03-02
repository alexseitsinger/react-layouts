import React, { ReactElement, ReactNode } from "react"

import { MainElement } from "./elements"
import { FixedHeaderLayoutContextProps as ContextProps } from "../context"
import { withFixedHeaderLayout } from "../hoc"

type Props = {
  isStatic?: boolean,
  children: ReactNode | ReactNode[],
} & ContextProps

export const Main = withFixedHeaderLayout(
  ({ isStatic, mainHeight, children }: Props): ReactElement => (
    <MainElement mainHeight={mainHeight} isStatic={isStatic}>
      {children}
    </MainElement>
  )
)

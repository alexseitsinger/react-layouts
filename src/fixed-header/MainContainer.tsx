import React, { ReactElement, ReactNode } from "react"

import { MainElement } from "./elements"
import { FixedHeaderLayoutContextProps } from "./FixedHeaderLayoutContext"
import { withFixedHeaderLayout } from "./withFixedHeaderLayout"

type Props = FixedHeaderLayoutContextProps & {
  isStatic?: boolean,
  children: ReactNode | ReactNode[],
}

export const MainContainer = withFixedHeaderLayout(
  ({ isStatic, mainHeight, children }: Props): ReactElement => (
    <MainElement mainHeight={mainHeight} isStatic={isStatic}>
      {children}
    </MainElement>
  )
)

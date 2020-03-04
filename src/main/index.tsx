import React, { ReactElement, ReactNode } from "react"

import { MainElement } from "./elements"
import { LayoutContextProps as ContextProps } from "../context"
import { withLayout } from "../hoc"

const defaultProps = {
  isStatic: false,
}

type Props = ContextProps & {
  children: ReactNode | ReactNode[],
} & Partial<Readonly<typeof defaultProps>>

export const Main = withLayout(
  ({ isStatic, mainHeight, children }: Props): ReactElement => (
    <MainElement mainHeight={mainHeight} isStatic={isStatic}>
      {children}
    </MainElement>
  )
)

Main.defaultProps = defaultProps

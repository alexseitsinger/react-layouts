import React, { ReactElement, ReactNode } from "react"

import { ViewportElement } from "./elements"
import { ViewportContextProps as ContextProps } from "./context"
import { withViewport } from "./hoc"

type Props = {
  children: ReactNode | ReactNode[],
} & ContextProps

export const ViewportContainer = withViewport(
  ({ viewportHeight, children }: Props): ReactElement => (
    <ViewportElement viewportHeight={viewportHeight}>
      {children}
    </ViewportElement>
  )
)

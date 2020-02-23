import React, { ReactElement, ReactNode } from "react"

import { ViewportElement } from "./elements"
import { ViewportContextProps as ContextProps } from "./ViewportContext"
import { withViewport } from "./withViewport"

type Props = ContextProps & {
  children: ReactNode | ReactNode[],
}

export const ViewportContainer = withViewport(
  ({ viewportHeight, children }: Props): ReactElement => (
    <ViewportElement viewportHeight={viewportHeight}>
      {children}
    </ViewportElement>
  )
)

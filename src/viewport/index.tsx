import React, { ReactElement, ReactNode } from "react"
import { LayoutContextProps as ContextProps } from "../context"

import { withLayout } from "../hoc"
import { ViewportElement } from "./elements"

const defaultProps = {
  isStatic: false,
}

type Props = ContextProps & {
  children: ReactNode | ReactNode[]
} & Partial<Readonly<typeof defaultProps>>

export const Viewport = withLayout(
  ({
    isStatic,
    initialViewportHeight,
    viewportHeight,
    children,
  }: Props): ReactElement => (
    <ViewportElement
      initialHeight={initialViewportHeight}
      finalHeight={viewportHeight}
      isStatic={isStatic}>
      {children}
    </ViewportElement>
  )
)

Viewport.defaultProps = defaultProps

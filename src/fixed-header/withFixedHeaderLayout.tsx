import React, { ComponentType, FC, ReactElement } from "react"

import { Context, ContextProps } from "./context"

export function withFixedHeaderLayout<P>(
  Component: ComponentType<P>
): FC<Partial<P>> {
  return (props: P): ReactElement => (
    <Context.Consumer>
      {({
        viewportHeight,
        mainHeight,
        headerHeight,
      }: ContextProps): ReactElement => (
        <Component
          {...props}
          viewportHeight={viewportHeight}
          mainHeight={mainHeight}
          headerHeight={headerHeight}
        />
      )}
    </Context.Consumer>
  )
}

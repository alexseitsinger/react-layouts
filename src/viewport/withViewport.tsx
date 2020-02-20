import React, { ComponentType, FC, ReactElement } from "react"

import { Context, ContextProps } from "./context"

export function withViewport<P>(Component: ComponentType<P>): FC<Partial<P>> {
  return (props: P): ReactElement => (
    <Context.Consumer>
      {({ viewportHeight, viewportWidth }: ContextProps): ReactElement => (
        <Component
          {...props}
          viewportHeight={viewportHeight}
          viewportWidth={viewportWidth}
        />
      )}
    </Context.Consumer>
  )
}

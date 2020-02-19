import React, { ComponentType, FC, ReactElement } from "react"

import { Context, ContextProps } from "./context"

export function withFixedHeaderLayout<P>(
  Component: ComponentType<P>
): FC<Partial<P>> {
  return (props: P): ReactElement => (
    <Context.Consumer>
      {(contextProps: ContextProps): ReactElement => (
        <Component {...props} {...contextProps} />
      )}
    </Context.Consumer>
  )
}

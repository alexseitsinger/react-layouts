import React, {
  ComponentType,
  ReactElement,
} from "react"

import { Partialize } from "../types"

import {
  ViewportContext as Context,
  ViewportContextProps as ContextProps
} from "./context"

type Optional<T extends ContextProps> = Partialize<T, keyof ContextProps>

export function withViewport<T extends ContextProps>(
  Component: ComponentType<T>
): ComponentType<Optional<T>> {
  return (props: T): ReactElement => (
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

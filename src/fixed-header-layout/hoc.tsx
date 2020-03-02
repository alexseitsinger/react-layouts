import React, {
  ComponentType,
  ReactElement,
} from "react"

import {
  FixedHeaderLayoutContext as Context,
  FixedHeaderLayoutContextProps as ContextProps,
} from "./context"

import { Partialize } from "../types"

type Optional<T extends ContextProps> = Partialize<T, keyof ContextProps>

export function withFixedHeaderLayout<T extends ContextProps>(
  Component: ComponentType<T>
): ComponentType<Optional<T>> {
  return (props: T): ReactElement => (
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

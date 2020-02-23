import React, {
  ComponentType,
  ReactElement,
} from "react"

import { Partialize } from "../types"

import {
  FixedHeaderLayoutContext as Context,
  FixedHeaderLayoutContextProps as ContextProps,
} from "./FixedHeaderLayoutContext"

type Optional<T extends ContextProps> = Partialize<T, keyof ContextProps>


export function withFixedHeaderLayout<P extends ContextProps>(
  Component: ComponentType<P>
): ComponentType<Optional<P>> {
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

import React, {
  ComponentType,
  ReactElement,
} from "react"

import { Partialize } from "../types"

import { ViewportContext as Context, ViewportContextProps as ContextProps } from "./ViewportContext"

type Optional<T extends ContextProps> = Partialize<T, keyof ContextProps>
type WithoutContextProps<P extends ContextProps> = Optional<P>

export function withViewport<P extends ContextProps>(
  Component: ComponentType<WithoutContextProps<P>>
): ComponentType<WithoutContextProps<P>> {
  return (props: WithoutContextProps<P>): ReactElement => (
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

import React, {
  ComponentType,
  ReactElement,
} from "react"

import { Partialize } from "../types"

import { ViewportContext as Context, ViewportContextProps as ContextProps } from "./ViewportContext"

type OptionalProps<T extends ContextProps> = Partialize<T, keyof ContextProps>
type Props<P extends ContextProps> = OptionalProps<P>

export function withViewport<P extends ContextProps>(
  Component: ComponentType<Props<P>>
): ComponentType<Props<P>> {

  const ComponentWithContext = (props: P): ReactElement => (
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

  return ComponentWithContext
}

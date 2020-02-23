import React, {
  ComponentType,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from "react"

import { Partialize } from "../types"

import { ViewportContext as Context, ViewportContextProps as ContextProps } from "./ViewportContext"

type Props<T extends ContextProps> = Partialize<T, keyof ContextProps>

export function withViewport<P extends ContextProps>(
  Component: ComponentType<P>
): FunctionComponent<Props<P>> {
  return (props: P): ReactElement => (
    <Context.Consumer>
      {({ viewportHeight, viewportWidth }: ContextProps): ReactNode => (
        <Component
          {...props}
          viewportHeight={viewportHeight}
          viewportWidth={viewportWidth}
        />
      )}
    </Context.Consumer>
  )
}

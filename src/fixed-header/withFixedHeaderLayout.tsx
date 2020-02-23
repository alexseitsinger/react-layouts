import React, {
  ComponentType,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from "react"

import { Partialize } from "../types"

import {
  FixedHeaderLayoutContext,
  FixedHeaderLayoutContextProps as ContextProps,
} from "./FixedHeaderLayoutContext"

type Optional<T extends ContextProps> = Partialize<T, keyof ContextProps>


export function withFixedHeaderLayout<P extends ContextProps>(
  Component: ComponentType<P>
): FunctionComponent<Optional<P>> {
  return (props: P): ReactElement => (
    <FixedHeaderLayoutContext.Consumer>
      {({
        viewportHeight,
        mainHeight,
        headerHeight,
      }: ContextProps): ReactNode => (
        <Component
          {...props}
          viewportHeight={viewportHeight}
          mainHeight={mainHeight}
          headerHeight={headerHeight}
        />
      )}
    </FixedHeaderLayoutContext.Consumer>
  )
}

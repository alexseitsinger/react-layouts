import React, {ComponentType,ReactElement,} from "react"

import {
  LayoutContext as Context,
  LayoutContextProps as ContextProps,
} from "./context"
import { Partialize } from "./types"

type Optional<T extends ContextProps> = Partialize<T, keyof ContextProps>

export function withLayout<T extends ContextProps>(
  Component: ComponentType<T>
): ComponentType<Optional<T>> {
  return function ComponentWithLayout(props: T): ReactElement {
    return (
      <Context.Consumer>
        {({
            footerStyle,
            headerStyle,
            onRenderFooter,
            onRenderHeader,
            onRenderSidebar,
            sidebarBodyStyle,
            sidebarContainerStyle,
            sidebarVoidStyle,
            sidebarWidth,
            initialFooterHeight,
            initialHeaderHeight,
            footerHeight,
            headerHeight,
            viewportHeight,
            mainHeight,
            onResize,
        }: ContextProps): ReactElement => (
          <Component
            initialHeaderHeight={initialHeaderHeight}
            initialFooterHeight={initialFooterHeight}
            onRenderHeader={onRenderHeader}
            onRenderSidebar={onRenderSidebar}
            onRenderFooter={onRenderFooter}
            sidebarWidth={sidebarWidth}
            sidebarContainerStyle={sidebarContainerStyle}
            sidebarVoidStyle={sidebarVoidStyle}
            sidebarBodyStyle={sidebarBodyStyle}
            footerStyle={footerStyle}
            headerStyle={headerStyle}
            {...props}
            onResize={onResize}
            footerHeight={footerHeight}
            viewportHeight={viewportHeight}
            headerHeight={headerHeight}
            mainHeight={mainHeight}
          />
        )}
      </Context.Consumer>
    )
  }
}

/** @jsx jsx */
import React, { ReactElement, ReactNode } from "react"
import { jsx } from "@emotion/core"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

expect.extend(matchers)

import { HeaderInner } from "src/fixed-header-layout/header/elements"
import { Header } from "src/fixed-header-layout/header"
import { FixedHeaderLayout } from "src/fixed-header-layout"
import { withFixedHeaderLayout } from "src/fixed-header-layout/hoc"
import { FixedHeaderLayoutContextProps as ContextProps } from "src/fixed-header-layout/context"

const Component = ({
  mainHeight,
  viewportHeight,
}: ContextProps): ReactElement => (
  <div id={"body"} css={{ height: mainHeight, maxHeight: viewportHeight }}>
    Body
  </div>
)

const ComponentWithContext = withFixedHeaderLayout(Component)

describe("withFixedHeaderLayout", () => {
  it("should pass height props to component wrapped", () => {
    const App = (): ReactElement => (
      <FixedHeaderLayout
        initialViewportHeight={"600px"}
        initialHeaderHeight={"40px"}
        onRenderHeader={(): ReactElement => <div id={"header"}>Header</div>}>
        <ComponentWithContext />
      </FixedHeaderLayout>
    )

    const wrapper = mount(<App />)

    expect(wrapper.find(Header)).toHaveLength(1)
    expect(wrapper.find(HeaderInner)).toHaveStyleRule("height", "40px")
    expect(wrapper.find("div#body")).toHaveLength(1)
    expect(wrapper.find("div#body")).toHaveStyleRule("height", "560px")
    expect(wrapper.find("div#body")).toHaveStyleRule("max-height", "600px")
  })
})

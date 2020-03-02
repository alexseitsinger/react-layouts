/** @jsx jsx */
import React, { ReactElement } from "react"
import { jsx, css } from "@emotion/core"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

expect.extend(matchers)

import { HeaderInner } from "src/fixed-header-layout/header/elements"
import { FixedHeaderLayout } from "src/fixed-header-layout"

describe("FixedHeaderLayout", () => {
  it("should render a fixed header about the main content", () => {
    const App = (): ReactElement => (
      <FixedHeaderLayout
        initialViewportHeight={"600px"}
        initialHeaderHeight={"40px"}
        onRenderHeader={(): ReactElement => <div id={"header"}>Header</div>}>
        <div id={"body"}>Body</div>
      </FixedHeaderLayout>
    )

    const wrapper = mount(<App />)

    expect(wrapper.find("div#header")).toHaveLength(1)
    expect(wrapper.find(HeaderInner)).toHaveStyleRule("height", "40px")
    expect(wrapper.find("div#body")).toHaveLength(1)
  })
})

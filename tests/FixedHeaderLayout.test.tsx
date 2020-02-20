/** @jsx jsx */
import React, { ReactElement } from "react"
import { jsx } from "@emotion/core"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

expect.extend(matchers)

import { HeaderInner } from "src/fixed-header/elements"
import { FixedHeaderLayout } from "src/fixed-header/FixedHeaderLayout"

describe("FixedHeaderLayout", () => {
  it("should render a fixed header about the main content", () => {
    const App = (): ReactElement => (
      <FixedHeaderLayout
        initialViewportHeight={"600px"}
        initialHeaderHeight={"40px"}
        renderHeader={(): ReactElement => <div id={"header"}>Header</div>}>
        <div id={"body"}>Body</div>
      </FixedHeaderLayout>
    )

    const wrapper = mount(<App />)

    expect(wrapper.find("div#header")).toHaveLength(1)
    expect(wrapper.find(HeaderInner)).toHaveStyleRule("height", "40px")
    expect(wrapper.find("div#body")).toHaveLength(1)
  })
})

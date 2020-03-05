/** @jsx jsx */
import React from "react"
import { jsx } from "@emotion/core"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

import { Viewport, LayoutProvider } from "src"
import { ViewportElement } from "src/viewport/elements"

expect.extend(matchers)

describe("Viewport", () => {
  it("should render correctly with initialHeight on LayoutProvider", () => {
    const wrapper = mount(
      <LayoutProvider initialViewportHeight={"600px"}>
        <Viewport>
          <div id={"main"}>Main</div>
        </Viewport>
      </LayoutProvider>
    )

    expect(wrapper.find("div#main")).toHaveLength(1)
    expect(wrapper.find(Viewport)).toHaveLength(1)
    expect(wrapper.find(ViewportElement)).toHaveStyleRule("min-height", "600px")
  })
  it("should render correctly with initialHeight pass to Viewport", () => {
    const wrapper = mount(
      <LayoutProvider>
        <Viewport initialViewportHeight={"600px"}>
          <div id={"main"}>Main</div>
        </Viewport>
      </LayoutProvider>
    )

    expect(wrapper.find("div#main")).toHaveLength(1)
    expect(wrapper.find(Viewport)).toHaveLength(1)
    expect(wrapper.find(ViewportElement)).toHaveStyleRule("min-height", "600px")
  })
  it("should render correctly when overwriting initialHeight from LayoutProvider", () => {
    const wrapper = mount(
      <LayoutProvider initialViewportHeight={"400px"}>
        <Viewport initialViewportHeight={"600px"}>
          <div id={"main"}>Main</div>
        </Viewport>
      </LayoutProvider>
    )

    expect(wrapper.find("div#main")).toHaveLength(1)
    expect(wrapper.find(Viewport)).toHaveLength(1)
    expect(wrapper.find(ViewportElement)).toHaveStyleRule("min-height", "600px")
  })
})

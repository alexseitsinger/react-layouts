/** @jsx jsx */
import React from "react"
import { jsx } from "@emotion/core"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

import { ViewportProvider } from "src/viewport/provider"
import { ViewportContainer } from "src/viewport/container"
//import { Container } from "src/viewport/elements"

expect.extend(matchers)

describe("ViewportContainer", () => {
  it("should render with the initialHeight in node.", () => {
    const wrapper = mount(
      <ViewportProvider initialHeight={"600px"} initialWidth={"600px"}>
        <ViewportContainer>
          <div id={"body"}>Body</div>
        </ViewportContainer>
      </ViewportProvider>
    )

    expect(wrapper.find("div#body")).toHaveLength(1)
    expect(wrapper.find(ViewportContainer)).toHaveLength(1)
    expect(wrapper.find(ViewportContainer)).toHaveStyleRule(
      "min-height",
      "600px"
    )
  })
})

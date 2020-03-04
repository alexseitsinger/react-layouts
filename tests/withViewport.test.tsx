/** @jsx jsx */
import React, { ReactElement } from "react"
import { jsx } from "@emotion/core"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

import { ViewportProvider } from "src/viewport/provider"
import { withViewport } from "src/viewport/hoc"

expect.extend(matchers)

interface Props {
  viewportHeight: string;
  viewportWidth: string;
}

describe("withViewport", () => {
  it("should pass viewport dimension props to wrapped component", () => {
    const ComponentWithViewport = withViewport(
      ({ viewportHeight, viewportWidth }: Props): ReactElement => (
        <div id={"body"} css={{ height: viewportHeight, width: viewportWidth }}>
          Content
        </div>
      )
    )

    const wrapper = mount(
      <ViewportProvider initialHeight={"600px"} initialWidth={"600px"}>
        <ComponentWithViewport />
      </ViewportProvider>
    )

    expect(wrapper.find("div#body")).toHaveLength(1)
    expect(wrapper.find("div#body")).toHaveStyleRule("height", "600px")
    expect(wrapper.find("div#body")).toHaveStyleRule("width", "600px")
  })
})

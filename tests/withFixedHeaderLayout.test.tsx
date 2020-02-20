/** @jsx jsx */
import React, { ReactElement } from "react"
import { jsx } from "@emotion/core"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

expect.extend(matchers)

import { HeaderInner } from "src/fixed-header/elements"
import { FixedHeader } from "src/fixed-header/FixedHeader"
import { FixedHeaderLayout } from "src/fixed-header/FixedHeaderLayout"
import { withFixedHeaderLayout } from "src/fixed-header/withFixedHeaderLayout"

interface PageBodyProps {
  mainHeight: string;
  viewportHeight: string;
}

describe("withFixedHeaderLayout", () => {
  it("should pass height props to component wrapped", () => {
    const ComponentWithFixedHeaderLayout = withFixedHeaderLayout(
      ({ mainHeight, viewportHeight }: PageBodyProps): ReactElement => {
        return (
          <div
            id={"body"}
            css={{ height: mainHeight, maxHeight: viewportHeight }}>
            Body
          </div>
        )
      }
    )

    const App = (): ReactElement => (
      <FixedHeaderLayout
        initialViewportHeight={"600px"}
        initialHeaderHeight={"40px"}
        renderHeader={(): ReactElement => <div id={"header"}>Header</div>}>
        <ComponentWithFixedHeaderLayout />
      </FixedHeaderLayout>
    )

    const wrapper = mount(<App />)

    expect(wrapper.find(FixedHeader)).toHaveLength(1)
    expect(wrapper.find(HeaderInner)).toHaveStyleRule("height", "40px")
    expect(wrapper.find("div#body")).toHaveLength(1)
    expect(wrapper.find("div#body")).toHaveStyleRule("height", "560px")
    expect(wrapper.find("div#body")).toHaveStyleRule("max-height", "600px")
  })
})

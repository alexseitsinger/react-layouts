import React, { ReactElement } from "react"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

expect.extend(matchers)

import {
  SidebarContainer,
  SidebarFixed,
  SidebarVoid,
} from "src/fixed-header/elements"
import { FixedHeaderLayout } from "src/fixed-header/FixedHeaderLayout"
import { SidebarLayout } from "src/fixed-header/SidebarLayout"

describe("SidebarLayout", () => {
  it("should render a sidebar to the right of the page", () => {
    const App = (): ReactElement => (
      <FixedHeaderLayout
        initialHeaderHeight={"40px"}
        initialViewportHeight={"600px"}
        renderHeader={(): ReactElement => <div id={"header"}>Header</div>}>
        <SidebarLayout
          sidebarWidth={"300px"}
          renderSidebar={(): ReactElement => <div id={"sidebar"}>Sidebar</div>}>
          <div id={"body"}>Body</div>
        </SidebarLayout>
      </FixedHeaderLayout>
    )

    const wrapper = mount(<App />)

    expect(wrapper.find("#header")).toHaveLength(1)
    expect(wrapper.find(SidebarLayout)).toHaveLength(1)
    expect(wrapper.find("#sidebar")).toHaveLength(1)
    expect(wrapper.find(SidebarContainer)).toHaveStyleRule("width", "300px")
    expect(wrapper.find(SidebarVoid)).toHaveStyleRule("height", "40px")
    expect(wrapper.find(SidebarFixed)).toHaveStyleRule("width", "300px")
    expect(wrapper.find("#body")).toHaveLength(1)
  })
})

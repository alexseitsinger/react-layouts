import React, { ReactElement } from "react"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

expect.extend(matchers)

import {
  SidebarContainer,
  SidebarLayoutMain,
} from "src/sidebar-layout/elements"
import { SidebarLayout } from "src/sidebar-layout"
import { LayoutProvider } from "src"

describe("SidebarLayout", () => {
  it("should render when props provided to SidebarLayout", () => {
    const wrapper = mount(
      <LayoutProvider initialViewportHeight={"600px"}>
        <SidebarLayout
          sidebarWidth={"300px"}
          onRenderSidebar={(): ReactElement => (
            <div id={"sidebar"}>Sidebar</div>
          )}>
          <div id={"main"}>Body</div>
        </SidebarLayout>
      </LayoutProvider>
    )

    expect(wrapper.find("#sidebar")).toHaveLength(1)
    expect(wrapper.find(SidebarLayoutMain)).toHaveStyleRule(
      "margin-right",
      "300px"
    )
    expect(wrapper.find(SidebarContainer)).toHaveStyleRule("width", "300px")
    expect(wrapper.find("#main")).toHaveLength(1)
  })
  it("should render using props are provided via LayoutProvider", () => {
    const wrapper = mount(
      <LayoutProvider
        initialViewportHeight={"600px"}
        sidebarWidth={"300px"}
        onRenderSidebar={(): ReactElement => <div id={"sidebar"}>Sidebar</div>}>
        <SidebarLayout>
          <div id={"main"}>Main</div>
        </SidebarLayout>
      </LayoutProvider>
    )

    expect(wrapper.find("#sidebar")).toHaveLength(1)
    expect(wrapper.find(SidebarLayoutMain)).toHaveStyleRule(
      "margin-right",
      "300px"
    )
    expect(wrapper.find(SidebarContainer)).toHaveStyleRule("width", "300px")
    expect(wrapper.find("#main")).toHaveLength(1)
  })
})

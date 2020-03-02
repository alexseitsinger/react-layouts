/** @jsx jsx */
import React, { ReactElement } from "react"
import { FixedHeaderLayout, FooterLayout, SidebarLayout } from "src"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"
import { jsx } from "@emotion/core"
import { HeaderInner } from "src/fixed-header-layout/header/elements"
import { MainElement } from "src/fixed-header-layout/main/elements"
import { FooterElement } from "src/fixed-header-layout/footer-layout/elements"
import waitForExpect from "wait-for-expect"
import { SidebarContainer } from "src/fixed-header-layout/sidebar-layout/elements"

expect.extend(matchers)

describe("FooterLayout", () => {
  it("should render below the main element with the right height", () => {
    const wrapper = mount(
      <FixedHeaderLayout
        initialHeaderHeight={"40px"}
        initialViewportHeight={"600px"}
        onRenderHeader={(): ReactElement => <div id={"header"}>Header</div>}>
        <FooterLayout
          initialFooterHeight={"40px"}
          isFooterStatic={true}
          isMainStatic={true}
          onRenderFooter={(): ReactElement => <div id="footer">Footer</div>}>
          <div id="content">Content</div>
        </FooterLayout>
      </FixedHeaderLayout>
    )

    expect(wrapper.find(HeaderInner)).toHaveStyleRule("height", "40px")
    expect(wrapper.find(MainElement)).toHaveStyleRule("height", "520px")
    expect(wrapper.find(FooterElement)).toHaveStyleRule("height", "40px")
  })
  it("should render correctly when used within sidebar layout", async () => {
    const wrapper = mount(
      <FixedHeaderLayout
        initialHeaderHeight={"40px"}
        initialViewportHeight={"600px"}
        onRenderHeader={(): ReactElement => <div id={"header"}>Header</div>}>
        <SidebarLayout
          sidebarWidth={"300px"}
          onRenderSidebar={(): ReactElement => (
            <div id={"sidebar"}>Sidebar</div>
          )}>
          <FooterLayout
            initialFooterHeight={"40px"}
            onRenderFooter={(): ReactElement => <div id="footer">Footer</div>}>
            <div id="content">Content</div>
          </FooterLayout>
        </SidebarLayout>
      </FixedHeaderLayout>
    )

    expect(wrapper.find(HeaderInner)).toHaveStyleRule("height", "40px")
    expect(wrapper.find(SidebarContainer)).toHaveStyleRule("width", "300px")
    expect(wrapper.find(MainElement)).toHaveStyleRule("min-height", "520px")
    expect(wrapper.find(FooterElement)).toHaveStyleRule("min-height", "40px")
  })
})

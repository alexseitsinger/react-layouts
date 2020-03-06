/** @jsx jsx */
import React, { ReactElement } from "react"
import { jsx } from "@emotion/core"
import { act } from "react-dom/test-utils"
import { SidebarLayout, HeaderLayout, LayoutProvider, FooterLayout } from "src"
import { mount } from "enzyme"
import { HeaderInner } from "src/header-layout/elements"
import { MainElement } from "src/main/elements"
import { FooterElement } from "src/footer-layout/elements"
import {
  SidebarContainer,
  SidebarLayoutMain,
} from "src/sidebar-layout/elements"
import waitForExpect from "wait-for-expect"
import { matchers } from "jest-emotion"

expect.extend(matchers)

jest.setTimeout(10000)

describe("FullLayout", () => {
  it("should render HeaderLayout with SidebarLayout with props passed to each component", async () => {
    await act(async () => {
      const wrapper = mount(
        <LayoutProvider initialViewportHeight={"600px"}>
          <HeaderLayout
            initialHeaderHeight={"40px"}
            onRenderHeader={(): ReactElement => (
              <div id={"header"}>Header</div>
            )}>
            <SidebarLayout
              sidebarWidth={"300px"}
              onRenderSidebar={(): ReactElement => (
                <div id={"sidebar"}>Sidebar</div>
              )}>
              <FooterLayout
                initialFooterHeight={"40px"}
                onRenderFooter={(): ReactElement => (
                  <div id={"footer"}>Footer</div>
                )}>
                <div id={"main"}>Main</div>
              </FooterLayout>
            </SidebarLayout>
          </HeaderLayout>
        </LayoutProvider>
      )

      await waitForExpect(() => {
        wrapper.update()

        expect(wrapper.find("div#header")).toHaveLength(1)
        expect(wrapper.find("div#main")).toHaveLength(1)
        expect(wrapper.find("div#sidebar")).toHaveLength(1)
        expect(wrapper.find("div#footer")).toHaveLength(1)
        expect(wrapper.find(HeaderInner)).toHaveStyleRule("min-height", "40px")
        expect(wrapper.find(SidebarLayoutMain)).toHaveStyleRule(
          "margin-right",
          "300px"
        )
        expect(wrapper.find(SidebarContainer)).toHaveStyleRule("width", "300px")
        expect(wrapper.find(MainElement)).toHaveStyleRule("min-height", "520px")
        expect(wrapper.find(FooterElement)).toHaveStyleRule(
          "min-height",
          "40px"
        )
      })
    })
  })
})

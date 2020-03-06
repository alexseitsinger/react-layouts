/** @jsx jsx */
import React, { ReactElement, ReactNode } from "react"
import { jsx } from "@emotion/core"
import { mount, ReactWrapper } from "enzyme"
import { matchers } from "jest-emotion"
import { act } from "react-dom/test-utils"
import waitForExpect from "wait-for-expect"

import { HeaderInner } from "src/header-layout/elements"
import { HeaderLayout } from "src/header-layout"
import { LayoutProvider } from "src/provider"
import { MainElement } from "src/main/elements"

expect.extend(matchers)

describe("HeaderLayout", () => {
  it("should render with props from LayoutProvider", async () => {
    await act(async () => {
      const wrapper = mount(
        <LayoutProvider
          initialViewportHeight={"600px"}
          initialHeaderHeight={"40px"}
          onRenderHeader={(): ReactElement => <div id={"header"}>Header</div>}>
          <HeaderLayout>
            <div id={"body"}>Body</div>
          </HeaderLayout>
        </LayoutProvider>
      )

      await waitForExpect(() => {
        wrapper.update()
        expect(wrapper.find("div#header")).toHaveLength(1)
        expect(wrapper.find(HeaderInner)).toHaveStyleRule("min-height", "40px")
      })
    })
  })
  it("should render with props to HeaderLayout", async () => {
    await act(async () => {
      const wrapper = mount(
        <LayoutProvider initialViewportHeight={"600px"}>
          <HeaderLayout
            initialHeaderHeight={"40px"}
            onRenderHeader={(): ReactElement => (
              <div id={"header"}>Header</div>
            )}>
            <div id={"body"}>Body</div>
          </HeaderLayout>
        </LayoutProvider>
      )

      await waitForExpect(() => {
        wrapper.update()
        expect(wrapper.find("div#header")).toHaveLength(1)
        expect(wrapper.find(HeaderInner)).toHaveStyleRule("min-height", "40px")
      })
    })
  })
  it("should render with height from HeaderLayout instead of LayoutProvider", async () => {
    await act(async () => {
      const wrapper = mount(
        <LayoutProvider
          initialViewportHeight={"600px"}
          initialHeaderHeight={"40px"}
          onRenderHeader={(): ReactElement => (
            <div id={"header-1"}>Header #1</div>
          )}>
          <HeaderLayout
            initialHeaderHeight={"20px"}
            onRenderHeader={(): ReactElement => (
              <div id={"header-2"}>Header</div>
            )}>
            <div id={"body"}>Body</div>
          </HeaderLayout>
        </LayoutProvider>
      )

      await waitForExpect(() => {
        wrapper.update()
        expect(wrapper.find("div#header-1")).toHaveLength(0)
        expect(wrapper.find("div#header-2")).toHaveLength(1)
        expect(wrapper.find(HeaderInner)).toHaveStyleRule("min-height", "20px")
      })
    })
  })
})

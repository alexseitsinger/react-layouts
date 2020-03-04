/** @jsx jsx */
import React, { ReactElement } from "react"
import { FooterLayout } from "src"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"
import { jsx } from "@emotion/core"
import { MainElement } from "src/main/elements"
import { FooterElement } from "src/footer-layout/elements"
import waitForExpect from "wait-for-expect"
import { act } from "react-dom/test-utils"
import { LayoutProvider } from "src/provider"

expect.extend(matchers)

jest.setTimeout(10000)

describe("FooterLayout", () => {
  it.only("should render with props provided directly", async () => {
    await act(async () => {
      const wrapper = mount(
        <LayoutProvider initialViewportHeight={"600px"}>
          <FooterLayout
            initialFooterHeight={"40px"}
            onRenderFooter={(): ReactElement => <div id="footer">Footer</div>}>
            <div id="content">Content</div>
          </FooterLayout>
        </LayoutProvider>
      )

      await waitForExpect(() => {
        wrapper.update()

        expect(wrapper.find(MainElement)).toHaveStyleRule("min-height", "560px")
        expect(wrapper.find(FooterElement)).toHaveStyleRule(
          "min-height",
          "40px"
        )
      })
    })
  })
  it("should render with initialHeight from LayoutProvider", async () => {
    await act(async () => {
      const wrapper = mount(
        <LayoutProvider
          initialViewportHeight={"600px"}
          initialFooterHeight={"40px"}
          onRenderFooter={(): ReactElement => <div id={"footer"}>Footer</div>}>
          <FooterLayout isMainStatic={true}>
            <div id="content">Content</div>
          </FooterLayout>
        </LayoutProvider>
      )

      await waitForExpect(() => {
        wrapper.update()

        expect(wrapper.find(MainElement)).toHaveStyleRule("min-height", "560px")
        expect(wrapper.find(FooterElement)).toHaveStyleRule(
          "min-height",
          "40px"
        )
      })
    })
  })
  it("should render with onRenderFooter from LayoutProvider", async () => {
    await act(async () => {
      const wrapper = mount(
        <LayoutProvider
          initialViewportHeight={"600px"}
          onRenderFooter={(): ReactElement => <div id={"footer"}>Footer</div>}>
          <FooterLayout initialFooterHeight={"40px"}>
            <div id="main">Content</div>
          </FooterLayout>
        </LayoutProvider>
      )
      await waitForExpect(() => {
        wrapper.update()

        expect(wrapper.find("div#footer")).toHaveLength(1)
        expect(wrapper.find(MainElement)).toHaveStyleRule("min-height", "560px")
        expect(wrapper.find(FooterElement)).toHaveStyleRule(
          "min-height",
          "40px"
        )
      })
    })
  })
  it("should render with onRenderFooter specified locally instead of LayoutProvider", async () => {
    await act(async () => {
      const wrapper = mount(
        <LayoutProvider
          initialViewportHeight={"600px"}
          onRenderFooter={(): ReactElement => (
            <div id={"footer-1"}>Footer</div>
          )}>
          <FooterLayout
            initialFooterHeight={"40px"}
            onRenderFooter={(): ReactElement => (
              <div id={"footer-2"}>Footer 2</div>
            )}>
            <div id="main">Content</div>
          </FooterLayout>
        </LayoutProvider>
      )
      await waitForExpect(() => {
        wrapper.update()

        expect(wrapper.find("div#footer-1")).toHaveLength(0)
        expect(wrapper.find("div#footer-2")).toHaveLength(1)
        expect(wrapper.find(MainElement)).toHaveStyleRule("min-height", "560px")
        expect(wrapper.find(FooterElement)).toHaveStyleRule(
          "min-height",
          "40px"
        )
      })
    })
  })
})

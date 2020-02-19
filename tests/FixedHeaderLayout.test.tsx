/** @jsx jsx */
import React, { ReactElement } from "react"
import { ViewportProvider } from "@alexseitsinger/react-viewport-container"
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

expect.extend(matchers)

import {
  FixedHeader,
  FixedHeaderLayout,
  PageContainer,
  withFixedHeaderLayout,
} from "src"
import { Container, HeaderInner } from "src/elements"

function HeaderBody(): ReactElement {
  return <div>Header</div>
}

describe("FixedHeaderLayout", () => {
  it("should pass height props to component wrapped with withFixedHeaderLayout()", () => {
    const Body = styled.div``

    interface PageBodyProps {
      mainHeight: string;
      fullHeight: string;
    }

    const PageBody = withFixedHeaderLayout(
      ({ mainHeight, fullHeight }: PageBodyProps): ReactElement => {
        return (
          <Body css={{ height: mainHeight, maxHeight: fullHeight }}>Body</Body>
        )
      }
    )

    const App = (): ReactElement => (
      <ViewportProvider initialHeight={"600px"} initialWidth={"600px"}>
        <FixedHeaderLayout
          initialHeight={"40px"}
          renderHeader={(): ReactElement => <HeaderBody />}
          renderBody={(): ReactElement => <PageBody />}
        />
      </ViewportProvider>
    )

    const wrapper = mount(<App />)

    expect(wrapper.find(FixedHeader)).toHaveLength(1)
    expect(wrapper.find(HeaderInner)).toHaveStyleRule("height", "40px")
    expect(wrapper.find(PageBody)).toHaveLength(1)
    expect(wrapper.find(Body)).toHaveStyleRule("height", "560px")
    expect(wrapper.find(Body)).toHaveStyleRule("max-height", "600px")
  })

  it("should render page container with the remaining viewport height", () => {
    const App = (): ReactElement => (
      <ViewportProvider initialHeight={"600px"} initialWidth={"600px"}>
        <FixedHeaderLayout
          initialHeight={"40px"}
          renderHeader={(): ReactElement => <HeaderBody />}
          renderBody={(): ReactElement => (
            <PageContainer>Content</PageContainer>
          )}
        />
      </ViewportProvider>
    )

    const wrapper = mount(<App />)

    expect(wrapper.find(Container)).toHaveStyleRule("height", "560px")
  })
})

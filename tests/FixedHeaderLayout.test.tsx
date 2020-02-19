/** @jsx jsx */
import React, { ReactElement } from "react"
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

expect.extend(matchers)

import { Container, HeaderInner } from "src/elements"
import { FixedHeader } from "src/FixedHeader"
import { FixedHeaderLayout } from "src/FixedHeaderLayout"
import { PageContainer } from "src/PageContainer"
import { withFixedHeaderLayout } from "src/withFixedHeaderLayout"

function HeaderBody(): ReactElement {
  return <div>Header</div>
}

describe("FixedHeaderLayout", () => {
  it("should pass height props to component wrapped with withFixedHeaderLayout()", () => {
    const Body = styled.div``

    interface PageBodyProps {
      mainHeight: string;
      viewportHeight: string;
    }

    const PageBody = withFixedHeaderLayout(
      ({ mainHeight, viewportHeight }: PageBodyProps): ReactElement => {
        return (
          <Body css={{ height: mainHeight, maxHeight: viewportHeight }}>
            Body
          </Body>
        )
      }
    )

    const App = (): ReactElement => (
      <FixedHeaderLayout
        initialViewportHeight={"600px"}
        initialHeaderHeight={"40px"}
        renderHeader={(): ReactElement => <HeaderBody />}
        renderBody={(): ReactElement => <PageBody />}
      />
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
      <FixedHeaderLayout
        initialViewportHeight={"600px"}
        initialHeaderHeight={"40px"}
        renderHeader={(): ReactElement => <HeaderBody />}
        renderBody={(): ReactElement => <PageContainer>Content</PageContainer>}
      />
    )

    const wrapper = mount(<App />)

    expect(wrapper.find(Container)).toHaveStyleRule("min-height", "560px")
  })
})

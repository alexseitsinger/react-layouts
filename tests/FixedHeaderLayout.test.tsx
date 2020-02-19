import React, { ReactElement } from "react"
import { ViewportProvider } from "@alexseitsinger/react-viewport-container"
import { CSSObject } from "@emotion/core"
import styled from "@emotion/styled"
import { mount } from "enzyme"
import { matchers } from "jest-emotion"

expect.extend(matchers)

import { FixedHeader, FixedHeaderLayout, withFixedHeaderLayout } from "src"
import { HeaderInner } from "src/elements"

interface AppProps {
  initialHeight: string;
  headerStyle: CSSObject;
}

function HeaderBody(): ReactElement {
  return <div>Header</div>
}

interface PageBodyProps {
  mainHeight: string;
  fullHeight: string;
}

const Body = styled.div``

const PageBody = withFixedHeaderLayout(
  ({ mainHeight, fullHeight }: PageBodyProps): ReactElement => (
    <Body style={{ height: mainHeight, maxHeight: fullHeight }}>Body</Body>
  )
)

const App = ({ headerStyle, initialHeight }: AppProps): ReactElement => (
  <ViewportProvider initialHeight={"600px"} initialWidth={"600px"}>
    <FixedHeaderLayout
      renderHeader={(): ReactElement => <HeaderBody />}
      renderBody={(): ReactElement => <PageBody />}
      headerStyle={headerStyle}
      initialHeight={initialHeight}
    />
  </ViewportProvider>
)

describe("FixedHeaderLayout", () => {
  it("should render correctly", () => {
    const wrapper = mount(<App headerStyle={{}} initialHeight={"40px"} />)

    expect(wrapper.find(FixedHeader)).toHaveLength(1)
    expect(wrapper.find(HeaderInner)).toHaveStyleRule("height", "40px")
    expect(wrapper.find(PageBody)).toHaveLength(1)

    const style = wrapper.find(Body).prop("style")

    expect(style).toHaveProperty("height", "560px")
    expect(style).toHaveProperty("maxHeight", "600px")
  })
})

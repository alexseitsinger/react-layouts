# Fixed Header Layout

Renders a fixed header at the top of the page.

The header is initially rendered with a `min-height` matching the value of `initialHeaderHeight`. Then, once mounted, the
header's actual height in the DOM is retrieved and set as `height`, then `position: fixed` gets set.

There is also a `<PageContainer />` component whose `min-height` is always equal to the difference between either
`initialViewportHeight` or the `document.documentElement` `height` and the header's current `height`.

In the browser, all sizes are updated following each window resize.

## Installation

```bash
yarn add @alexseitsinger/react-fixed-header-layout
```

## Exports

#### FixedHeaderLayout

Container component to manage and render a fixed header above a body.

###### Props

Name                  | Description                                           | Default   | Required?
---                   | ---                                                   | ---       | ---
initialHeaderHeight   | The height to use before retrieving it from the DOM.  | undefined | yes
initialViewportHeight | Thie height to use before retrieving it from the DOM. | undefined | yes
renderHeader          | Invoked to render the inner body of the header.       | undefined | yes
renderBody            | Invoked to render the body of the page.               | undefined | yes
headerStyle           | Additional css to apply to the rendered header body.  | undefined | no

###### Example

```javascript
import { FixedHeaderLayout } from "@alexseitsinger/react-fixed-header-layout"

const App = (props) => (
  <FixedHeaderLayout
    initialViewportHeight={"600px"}
    initialHeaderHeight={"40px"}
    headerStyle={{
      //...extra styles to apply to header.
    }}
    renderHeader={() => <MyCustomHeaderBody />}
    renderBody={() => <MyPageBody />}
  />
)
```

#### withFixedHeaderLayout

HOC to serve the dimensions of the layout to other components as props.

###### Example

```javascript
import { withFixedHeaderLayout } from "@alexseitsinger/react-fixed-header-layout"

const HomePage = withFixedHeaderLayout(({ viewportHeight, headerHeight, mainHeight }) => (
  <div style={{ height: mainHeight }}>Content</div>
))
```

#### PageContainer

Container component whose `height` is always the difference between either `document.documentElement` or
`initialViewportHeight` and the header's current `height`.

###### Example

```javascript
import { PageContainer } from "@alexseitsinger/react-fixed-header-layout"

const HomePage = props => (
  <PageContainer>
    <div>Content</div>
  </PageContainer>
)
```

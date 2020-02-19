# Fixed Header Layout

DOM container that renders a fixed header alongside a body container. Dimensions are shared as props (through private
context) for easy access by other components elsewhere. Layout will re-render using new dimensions upon each resize.
Requires the use of [React Viewport Container](https://github.com/alexseitsinger/react-viewport-container) in order to
find the dimensions for the layout.

## Installation

```bash
yarn add @alexseitsinger/react-fixed-header-layout
```

## Exports

#### FixedHeaderLayout

Container component to manage and render a fixed header above a body.

###### Props

Name          | Description                                              | Default   | Required?
---           | ---                                                      | ---       | ---
initialHeight | The height to use before measure the header dynamically. | undefined | yes
headerStyle   | Additional css to apply to the rendered header body.     | undefined | no
renderHeader  | Invoked to render the inner body of the header.          | undefined | yes
renderBody    | Invoked to render the body of the page.                  | undefined | yes

###### Example

```javascript
import { ViewportProvider } from "@alexseitsinger/react-viewport-container"
import { FixedHeaderLayout } from "@alexseitsinger/react-fixed-header-layout"

function App(props) {
  return (
    <ViewportProvider initialHeight={"600px"} initialWidth={"600px"}>
      <FixedHeaderLayout
        initialHeight={"40px"}
        headerStyle={{
          //...extra styles to apply to header.
        }}
        renderHeader={() => <MyCustomHeaderBody />}
        renderBody={() => <MyPageBody />}
      />
    </ViewportProvider>
  )
}
```

#### withFixedHeaderLayout

HOC to serve the dimensions of the layout to other components as props.

###### Example

```javascript
import { withFixedHeaderLayout } from "@alexseitsinger/react-fixed-header-layout"

const HomePage = withFixedHeaderLayout(({
  mainHeight,
  headerHeight,
  fullHeight,
}) => (
  <div style={{ height: mainHeight }}>Content</div>
))
```

#### FixedHeaderLayoutContext

The context used to manage the dimensions of the fixed header layout. This
already used internally, but exposed in case its needed somewhere else.

###### Example

```javascript
import { FixedHeaderLayoutContext } from "@alexseitsinger/react-fixed-header-layout"

const Component = (props) => (
  <FixedHeaderContext.Consumer>
    {({ mainHeight, headerHeight, fullHeight }) => (
      <div>Do something with the heights in here...</div>
    )}
  </FixedHeaderContext.Consumer>
)
```


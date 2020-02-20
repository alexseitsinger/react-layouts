# Layouts

Collection of components to make DOM layouts easier to make.

## Installation

```bash
yarn add @alexseitsinger/react-layouts
```

## Exports

#### FixedHeaderLayout

Renders a fixed header at the top of the page.

The header is initially rendered with a `min-height` matching the value of `initialHeaderHeight`. Then, once mounted, the
header's actual height in the DOM is retrieved and set as `height`, then `position: fixed` gets set.

There is also a `<PageContainer />` component whose `min-height` is always equal to the difference between either
`initialViewportHeight` or the `document.documentElement` `height` and the header's current `height`.

In the browser, all sizes are updated following each window resize.

###### Props

Name                  | Description                                           | Default   | Required?
---                   | ---                                                   | ---       | ---
initialHeaderHeight   | The height to use before retrieving it from the DOM.  | undefined | yes
initialViewportHeight | Thie height to use before retrieving it from the DOM. | undefined | yes
renderHeader          | Invoked to render the inner body of the header.       | undefined | yes
children              | The main page content to render below the header.     | undefined | yes
headerStyle           | Additional css to apply to the rendered header body.  | undefined | no

###### Example

```javascript
import { FixedHeaderLayout } from "@alexseitsinger/react-layouts"

const App = () => (
  <FixedHeaderLayout
    initialViewportHeight={"600px"}
    initialHeaderHeight={"40px"}
    headerStyle={{
      //...extra styles to apply to header.
    }}
    renderHeader={() => <MyCustomHeaderBody />}>
    <div>Body</div>
  </FixedHeaderLayout>
)
```

#### withFixedHeaderLayout

HOC to serve the dimensions of the layout to other components as props.

###### Example

```javascript
import { withFixedHeaderLayout } from "@alexseitsinger/react-layouts"

const HomePage = withFixedHeaderLayout(({ viewportHeight, headerHeight, mainHeight }) => (
  <div style={{ height: mainHeight }}>Content</div>
))
```

#### PageContainer

Container component whose `height` is always the difference between either `document.documentElement` or
`initialViewportHeight` and the header's current `height`.

###### Example

```javascript
// In app root...
import { FixedHeaderLayout } from "@alexseitsinger/react-layouts"

const App = () => (
  <FixedHeaderLayout
    initialHeaderHeight={"40px"}
    initialViewportHeight={"600px"}
    renderHeader={() => <div>Header</div>}>
    <div>Body</div>
  </FixedHeaderLayout>
)
```

```javascript
// In page component...
import { PageContainer } from "@alexseitsinger/react-layouts"

const HomePage = props => (
  <PageContainer>
    <div>Content</div>
  </PageContainer>
)
```

#### SidebarLayout

Container with space reserved for a fixed sidebar (on the right). Expects the use of `<FixedHeaderLayout />` somewhere
above in the component tree.

###### Props

Name                  | Description                                                              | Default   | Required?
---                   | ---                                                                      | ---       | ---
initialHeaderHeight   | The size (px) to use for the header height before measure it in the DOM. | undefined | yes
initialViewportHeight | The size (px) to use for the viewport height before measuring the DOM.   | undefined | yes
renderHeader          | Invoked to render the body of the sidebar.                               | undefined | yes
children              | The content to render (to the left) of the sidebar.                      | undefined | yes

###### Example

```javascript
import { FixedHeaderLayout, SidebarLayout } from "@alexseitsinger/react-layouts"

const App = () => (
  <FixedHeaderLayout
    initialHeaderHeight={"40px"}
    initialViewportHeight={"600px"}
    renderHeader={() => <div>Header</div>}>
    <SidebarLayout
      sidebarWidth={"300px"}
      renderSidebar={() => <div>Sidebar</div>}>
      <div>Main page content</div>
    </SidebarLayout>
  </FixedHeaderLayout>
)
```

#### ViewportProvider

Provides a context with values for `viewportHeight` and `viewportWidth` to the connected components.

###### Example

```javascript
const App = () => (
  <ViewportProvider initialHeight={"600px"} initialWidth={"600px"}>
    <div>Some DOM stuff</div>
  </ViewportProvider>
)
```

#### ViewportContainer

A component whose `min-height` is automatically set to match the current value of either `initialHeight` or
`document.documentElement` `clientHeight`. Expects the use of `ViewportProvider` somewhere above this in the component
tree.

###### Example

```javascript
const App () => (
  <ViewportProvider initialHeight={"600px"} initialWidth={"600px"}>
    <div id="body">
      <ViewportContainer>
        <div>Some other content</div>
      </ViewportContainer>
    </div>
  </ViewportProvider>
)
```

#### withViewport

HOC component to add the `viewportHeight` and `viewportWidth` props to the wrapped component. Expects the use of
`ViewportProvider` somewhere above in the component tree.

###### Example

```javascript
const HomePage = withViewport(
  ({ viewportHeight, viewportWidth }) => (
    <div style={{ height: viewportHeight, viewportWidth }}>
      Some page content...
    </div>
  )
)
```

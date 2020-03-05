# Layouts

Layout components to make constructing a page easier.

## Installation

```bash
yarn add @alexseitsinger/react-layouts
```

## Exports

#### LayoutProvider

Provides initial props to each layout component used throughout the app. Most of the props specified on the individual layout components will override the values provided by the provider.

###### Props

Name                  | Description                                           | Default   | Required?
---                   | ---                                                   | ---       | ---
initialViewportHeight | Thie height to use before retrieving it from the DOM. | 0px       | yes, if not specified on layout components
initialHeaderHeight   | Initial height to use for the header.                 | 0px       | yes, if not specified on `<HeaderLayout />`
initialFooterHeight   | Initial height to use for the footer.                 | 0px       | yes, if not specified on `<FooterLayout />`
sidebarWidth          | The width to use for the sidebar.                     | 0px       | yes, if not specified on `<SidebarLayout />`
onRenderHeader        | Invoked to render the header.                         | undefined | yes, if not specified on `<HeaderLayout />`
onRenderFooter        | Invoked to render the footer.                         | undefined | yes, if not specified on `<FooterLayout />`
onRenderSidebar       | Invoked to render the sidebar.                        | undefined | yes, if not specified on `<SidebarLayout />`
sidebarContainerStyle | Extra css to apply.                                   | undefined | no
sidebarBodyStyle      | Extra css to apply.                                   | undefined | no
sidebarVoidStyle      | Extra css to apply.                                   | undefined | no
headerStyle           | Extra css to apply.                                   | undefined | no
footerStyle           | Extra css to apply.                                   | undefined | no

#### HeaderLayout

Renders a fixed header at the top of the page.

The header is initially rendered with a `min-height` matching the value of `initialHeaderHeight`. Then, once mounted, the
header's actual height in the DOM is retrieved and set as `height`, then `position: fixed` gets set.

In the browser, all sizes are updated following each window resize.

###### Props

Name                  | Description                                          | Default   | Required?
---                   | ---                                                  | ---       | ---
initialViewportHeight | Initial height to use for the viewport.              | undefined | yes, if not specified on `<LayoutProvider />`
initialHeaderHeight   | The height to use before retrieving it from the DOM. | undefined | yes, if not specified on `<LayoutProvider />`
onRenderHeader        | Invoked to render the inner body of the header.      | undefined | yes, if not specified on `<LayoutProvider />`
headerStyle           | Additional css to apply to the rendered header body. | undefined | no
children              | The main page content to render below the header.    | undefined | yes

#### SidebarLayout

Container with space reserved for a fixed sidebar (on the right).

###### Props

Name                  | Description                                                    | Default   | Required?
---                   | ---                                                            | ---       | ---
initialViewportHeight | Initial height to use for the viewport.                        | undefined | yes, if not specified on `<LayoutProvider />`
sidebarWidth          | Width of the sidebar.                                          | 0px       | yes, if not specified on `<LayoutProvider />`
sidebarContainerStyle | Extra css to apply                                             | undefined | no
sidebarBodyStyle      | Extra css to apply                                             | undefined | no
sidebarVoidStyle      | Extra css to apply                                             | undefined | no
isMainStatic          | Should `<main>` element use `height` instead of `min-height`   | false     | no
isFooterStatic        | Should `<footer>` element use `height` instead of `min-height` | false     | no
children              | The content to render (to the left) of the sidebar.            | undefined | yes

#### FooterLayout

Includes a footer element below the main content. Footer height is removed from main element's possible height so it initially fits within the screen.

###### Props

Name                | Description                                                                          | Default   | Required?
---                 | ---                                                                                  | ---       | ---
initialFooterHeight | Intitial height (px) to use for the footer before measuring and resizing in the DOM. | undefined | yes, if not specified on `<LayoutProvider />`
onRenderFooter      | Invoked to render the footer.                                                        | undefined | yes, if not specified on `<LayoutProvider />`
footerStyle         | Extra css to apply.                                                                  | undefined | no
isMainStatic        | Should `<main>` use `height` instead of `min-height`?                                | false     | no
isFooterStatic      | Should `<footer>` use `height` instead of `min-height`?                              | false     | no
children            | The content to render (above) the footer, as the main page.                          | undefined | yes

#### Main

A container with the remaining height (viewport - header) as either `min-height` or `height` if `isStatic` is true.

###### Props

Name     | Description                                           | Default | Required?
---      | ---                                                   | ---     | ---
isStatic | Should `<main>` use `height` instead of `min-height`? | false   | no
children | The content to render within this element.            | null    | yes

#### withLayout

HOC that supplies the wrapped component with the layout context props.

###### Props Provided

Name                  | Description                                                                       | Overwritable?
---                   | ---                                                                               | ---
viewportHeight        | The final measured height(px) of the viewport.                                    | no
headerHeight          | The final measured height(px) of the header.                                      | no
footerHeight          | The final measured height(px_ of the footer.                                      | no
mainHeight            | The final measured height(px) of the main content (viewport - (header + footer)). | no
initialHeaderHeight   | The initial height(px) to use for the header before measuring.                    | yes
initialFooterHeight   | The initial height(px) to use for the footer before measuring.                    | yes
onResize              | Function used to update `<LayoutProvider />` from each layout component.          | no
onRenderHeader        | Function used by `<HeaderLayout />` to render its content.                        | yes
onRenderFooter        | Function used by `<FooterLayout />` to render its content.                        | yes
onRenderSidebar       | Function used by `<SidebarLayout />` to render its content.                       | yes
headerStyle           | Extra css to use.                                                                 | yes
footerStyle           | Extra css to use.                                                                 | yes
sidebarWidth          | The width(px) to use.                                                             | yes
sidebarContainerStyle | Extra css to use                                                                  | yes
sidebarBodyStyle      | Extra css to use.                                                                 | yes
sidebarVoidStyle      | Extra css to use.                                                                 | yes

#### Viewport

Container with `min-height` set to the height of the browser window (or the initial value). If `isStatic` is true, will use `height` instead.

## Example

```javascript
// In app root
import { LayoutProvider } from "@alexseitsinger/react-layouts"

const App = () => (
  <LayoutProvider
    initialViewportHeight={"600px"}
    initialHeaderHeight={"30px"}
    initialFooterHeight={"10px"}
    sidebarWidth={"100px"}
    onRenderFooter={() => (
      <div>Footer here since it never changes</div>
      )}>
    <Router>
      <Route path={"/"} exact component={HomePage} />
      <Route path={"*"} exact component={NotFoundPage} />
    </Router>
  </LayoutProvider>
)
```

```javascript
import { HeaderLayout, SidebarLayout, FooterLayout } from "@alexseitsinger/react-layouts"

function HomePage(props) {
  return (
    <HeaderLayout
      renderHeader={() => (
        <div>Header content</div>
      )}>
      <SidebarLayout
        onRenderSidebar={() => (
          <div>Sidebar content</div>
        )}>
        <FooterLayout>
          <div>This page content will include a footer below it</div>
        </FooterLayout>
      </SidebarLayout>
    </HeaderLayout>
  )
  ```

```javascript
import { Viewport } from "@alexseitsinger/react-layouts"

function NotFoundPage(props) {
  return (
    <Viewport>
      Something that has the height of the browser.
    </Viewport>
  )
}
```

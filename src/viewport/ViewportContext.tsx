import React from "react"

export interface ViewportContextProps {
  viewportHeight: string;
  viewportWidth?: string;
}

const defaultContext: ViewportContextProps = {
  viewportWidth: "0px",
  viewportHeight: "0px",
}

export const ViewportContext = React.createContext(defaultContext)

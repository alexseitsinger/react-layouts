import React from "react"

export interface ContextProps {
  viewportHeight: string;
  headerHeight: string;
  mainHeight: string;
}

const defaultContext: ContextProps = {
  viewportHeight: "0px",
  headerHeight: "0px",
  mainHeight: "0px",
}

export const Context = React.createContext(defaultContext)

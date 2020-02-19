import React from "react"

export interface ContextProps {
  fullHeight: string;
  headerHeight: string;
  mainHeight: string;
}

const defaultContext: ContextProps = {
  headerHeight: "0px",
  mainHeight: "0px",
  fullHeight: "0px",
}

export const Context = React.createContext(defaultContext)

import React from "react"

export interface ContextProps {
  fullHeight: string;
  headerHeight: string;
  mainHeight: string;
}

const defaultContext: ContextProps = {
  headerHeight: "",
  mainHeight: "",
  fullHeight: "",
}

export const Context = React.createContext(defaultContext)

import React from "react"

export interface ContextProps {
  viewportHeight: string;
  viewportWidth?: string;
}

const defaultContext: ContextProps = {
  viewportWidth: "0px",
  viewportHeight: "0px",
}

export const Context = React.createContext(defaultContext)

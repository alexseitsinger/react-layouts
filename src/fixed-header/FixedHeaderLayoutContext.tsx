import React from "react"

export interface FixedHeaderLayoutContextProps {
  viewportHeight: string;
  headerHeight: string;
  mainHeight: string;
}

const defaultContext: FixedHeaderLayoutContextProps = {
  viewportHeight: "0px",
  headerHeight: "0px",
  mainHeight: "0px",
}

export const FixedHeaderLayoutContext = React.createContext(defaultContext)

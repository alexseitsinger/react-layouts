import React from "react"

export interface FixedHeaderLayoutContextProps {
  viewportHeight: string;
  headerHeight: string;
  mainHeight: string;
  //footerHeight?: string;
}

export const defaultContext: FixedHeaderLayoutContextProps = {
  viewportHeight: "0px",
  headerHeight: "0px",
  mainHeight: "0px",
  //footerHeight: "0px",
}

export const FixedHeaderLayoutContext = React.createContext(defaultContext)

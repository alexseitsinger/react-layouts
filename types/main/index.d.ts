import React, { ReactNode } from "react";
import { LayoutContextProps as ContextProps } from "../context";
declare const defaultProps: {
    isStatic: boolean;
};
declare type Props = ContextProps & {
    children: ReactNode | ReactNode[];
} & Partial<Readonly<typeof defaultProps>>;
export declare const Main: React.ComponentType<import("../types").Partialize<Props, "mainHeight" | "sidebarWidth" | "headerHeight" | "footerHeight" | "onRenderHeader" | "onRenderFooter" | "onRenderSidebar" | "sidebarVoidStyle" | "sidebarBodyStyle" | "sidebarContainerStyle" | "headerStyle" | "footerStyle" | "onResize" | "initialFooterHeight" | "initialHeaderHeight" | "initialViewportHeight" | "viewportHeight">>;
export {};

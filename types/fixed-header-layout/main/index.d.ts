import React, { ReactNode } from "react";
import { FixedHeaderLayoutContextProps as ContextProps } from "../context";
declare type Props = {
    isStatic?: boolean;
    children: ReactNode | ReactNode[];
} & ContextProps;
export declare const Main: React.ComponentType<import("../../types").Partialize<Props, "onResize" | "initialFooterHeight" | "footerStyle" | "onRenderFooter" | "onRenderSidebar" | "sidebarWidth" | "viewportHeight" | "headerHeight" | "mainHeight" | "footerHeight" | "initialSidebarWidth" | "sidebarStyle">>;
export {};

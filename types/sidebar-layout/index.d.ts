import React, { ReactNode } from "react";
import { LayoutContextProps as ContextProps } from "../context";
import { CSSObject } from "@emotion/core";
export declare type SidebarLayoutProps = {
    onRenderSidebar: () => ReactNode;
    sidebarWidth: string;
    sidebarContainerStyle?: CSSObject;
    sidebarVoidStyle?: CSSObject;
    sidebarBodyStyle?: CSSObject;
};
declare type Props = ContextProps & SidebarLayoutProps & {
    children: ReactNode | ReactNode[];
};
export declare const SidebarLayout: React.ComponentType<import("../types").Partialize<Props, "mainHeight" | "sidebarWidth" | "headerHeight" | "footerHeight" | "onRenderHeader" | "onRenderFooter" | "onRenderSidebar" | "sidebarVoidStyle" | "sidebarBodyStyle" | "sidebarContainerStyle" | "headerStyle" | "footerStyle" | "onResize" | "initialFooterHeight" | "initialHeaderHeight" | "viewportHeight">>;
export {};

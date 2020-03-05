import React, { ReactNode } from "react";
import { CSSObject } from "@emotion/core";
import { LayoutContextProps as ContextProps } from "../context";
export interface HeaderLayoutProps {
    onRenderHeader: () => ReactNode;
    initialHeaderHeight: string;
    headerStyle?: CSSObject;
}
declare type BaseProps = ContextProps & HeaderLayoutProps;
declare type Props = BaseProps & {
    children: ReactNode | ReactNode[];
};
export declare const HeaderLayout: React.ComponentType<import("../types").Partialize<Props, "mainHeight" | "sidebarWidth" | "headerHeight" | "footerHeight" | "onRenderHeader" | "onRenderFooter" | "onRenderSidebar" | "sidebarVoidStyle" | "sidebarBodyStyle" | "sidebarContainerStyle" | "headerStyle" | "footerStyle" | "onResize" | "initialFooterHeight" | "initialHeaderHeight" | "initialViewportHeight" | "viewportHeight">>;
export {};

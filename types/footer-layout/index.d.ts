import React, { ReactNode } from "react";
import { LayoutContextProps as ContextProps } from "../context";
import { CSSObject } from "@emotion/core";
declare const defaultProps: {
    isFooterStatic: boolean;
    isMainStatic: boolean;
};
export declare type FooterLayoutProps = {
    onRenderFooter: () => ReactNode;
    initialFooterHeight: string;
    footerStyle?: CSSObject;
};
declare type Props = ContextProps & FooterLayoutProps & {
    children: ReactNode | ReactNode[];
} & Partial<Readonly<typeof defaultProps>>;
export declare const FooterLayout: React.ComponentType<import("../types").Partialize<Props, "mainHeight" | "sidebarWidth" | "headerHeight" | "footerHeight" | "onRenderHeader" | "onRenderFooter" | "onRenderSidebar" | "sidebarVoidStyle" | "sidebarBodyStyle" | "sidebarContainerStyle" | "headerStyle" | "footerStyle" | "onResize" | "initialFooterHeight" | "initialHeaderHeight" | "initialViewportHeight" | "viewportHeight">>;
export {};

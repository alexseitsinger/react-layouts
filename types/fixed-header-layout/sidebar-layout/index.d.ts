import React, { ReactNode } from "react";
import { CSSObject } from "@emotion/core";
import { FixedHeaderLayoutContextProps as ContextProps } from "../context";
declare type Props = ContextProps & {
    children: ReactNode | ReactNode[];
    onRenderSidebar: () => ReactNode;
    sidebarWidth: string;
    containerStyle?: CSSObject;
    voidStyle?: CSSObject;
    bodyStyle?: CSSObject;
};
export declare const SidebarLayout: React.ComponentType<import("../../types").Partialize<Props, "onResize" | "initialFooterHeight" | "footerStyle" | "onRenderFooter" | "onRenderSidebar" | "sidebarWidth" | "viewportHeight" | "headerHeight" | "mainHeight" | "footerHeight" | "initialSidebarWidth" | "sidebarStyle">>;
export {};

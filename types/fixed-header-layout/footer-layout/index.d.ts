import React, { ReactNode } from "react";
import { FixedHeaderLayoutContextProps as ContextProps } from "../context";
import { CSSObject } from "@emotion/core";
import { HeightProps } from "src/fixed-header-layout/provider";
declare const defaultProps: {
    isFooterStatic: boolean;
    isMainStatic: boolean;
};
declare type DefaultProps = Readonly<typeof defaultProps>;
declare type Props = ContextProps & {
    children: ReactNode | ReactNode[];
    onRenderFooter: () => ReactNode;
    onResize: (p: HeightProps) => void;
    initialFooterHeight: string;
    footerHeight: string;
    footerStyle?: CSSObject;
} & Partial<DefaultProps>;
export declare const FooterLayout: React.ComponentType<import("../../types").Partialize<Props, "onResize" | "initialFooterHeight" | "footerStyle" | "onRenderFooter" | "onRenderSidebar" | "sidebarWidth" | "viewportHeight" | "headerHeight" | "mainHeight" | "footerHeight" | "initialSidebarWidth" | "sidebarStyle">>;
export {};

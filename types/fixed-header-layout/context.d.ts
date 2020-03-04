import React, { ReactNode } from "react";
import { CSSObject } from "@emotion/core";
import { HeightProps } from "src/fixed-header-layout/provider";
export interface FixedHeaderLayoutContextProps {
    viewportHeight: string;
    headerHeight: string;
    mainHeight: string;
    footerHeight: string;
    sidebarWidth?: string;
    initialFooterHeight?: string;
    initialSidebarWidth?: string;
    onRenderFooter?: () => ReactNode;
    onRenderSidebar?: () => ReactNode;
    onResize?: (h: HeightProps) => void;
    footerStyle?: CSSObject;
    sidebarStyle?: CSSObject;
}
export declare const defaultContext: FixedHeaderLayoutContextProps;
export declare const FixedHeaderLayoutContext: React.Context<FixedHeaderLayoutContextProps>;

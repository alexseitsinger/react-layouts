import React, { ReactNode } from "react";
import { CSSObject } from "@emotion/core";
import { FixedHeaderLayoutContextProps } from "./FixedHeaderLayoutContext";
declare type Props = {
    children: ReactNode | ReactNode[];
    renderSidebar: () => ReactNode;
    sidebarWidth: string;
    containerStyle?: CSSObject;
    voidStyle?: CSSObject;
    bodyStyle?: CSSObject;
} & FixedHeaderLayoutContextProps;
export declare const SidebarLayout: React.ComponentType<import("../types").Partialize<Props, "mainHeight" | "viewportHeight" | "headerHeight">>;
export {};

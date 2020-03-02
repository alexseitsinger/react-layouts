import React, { ReactElement, ReactNode } from "react";
import { CSSObject } from "@emotion/core";
import { FixedHeaderLayoutContextProps as ContextProps } from "../context";
declare type Props = {
    children: ReactNode | ReactNode[];
    onRenderSidebar: () => ReactElement;
    sidebarWidth: string;
    containerStyle?: CSSObject;
    voidStyle?: CSSObject;
    bodyStyle?: CSSObject;
} & ContextProps;
export declare const SidebarLayout: React.ComponentType<import("../../types").Partialize<Props, "viewportHeight" | "headerHeight" | "mainHeight">>;
export {};

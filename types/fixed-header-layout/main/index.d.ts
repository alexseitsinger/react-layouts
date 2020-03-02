import React, { ReactNode } from "react";
import { FixedHeaderLayoutContextProps as ContextProps } from "../context";
declare type Props = {
    isStatic?: boolean;
    children: ReactNode | ReactNode[];
} & ContextProps;
export declare const Main: React.ComponentType<import("../../types").Partialize<Props, "viewportHeight" | "headerHeight" | "mainHeight">>;
export {};

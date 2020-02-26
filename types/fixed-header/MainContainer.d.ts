import React, { ReactNode } from "react";
import { FixedHeaderLayoutContextProps } from "./FixedHeaderLayoutContext";
declare type Props = FixedHeaderLayoutContextProps & {
    isStatic?: boolean;
    children: ReactNode | ReactNode[];
};
export declare const MainContainer: React.ComponentType<import("../types").Partialize<Props, "mainHeight" | "viewportHeight" | "headerHeight">>;
export {};

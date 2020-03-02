import React, { ReactNode } from "react";
import { ViewportContextProps as ContextProps } from "./context";
declare type Props = {
    children: ReactNode | ReactNode[];
} & ContextProps;
export declare const ViewportContainer: React.ComponentType<import("../types").Partialize<Props, "viewportHeight" | "viewportWidth">>;
export {};

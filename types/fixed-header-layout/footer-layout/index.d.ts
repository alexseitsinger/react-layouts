import React, { ReactNode, ReactElement } from "react";
import { FixedHeaderLayoutContextProps as ContextProps } from "../context";
import { CSSObject } from "@emotion/core";
declare const defaultProps: {
    isFooterStatic: boolean;
    isMainStatic: boolean;
};
declare type DefaultProps = Readonly<typeof defaultProps>;
declare type Props = {
    children: ReactNode | ReactNode[];
    initialFooterHeight: string;
    onRenderFooter: () => ReactElement;
    footerStyle?: CSSObject;
} & ContextProps & Partial<DefaultProps>;
export declare const FooterLayout: React.ComponentType<import("../../types").Partialize<Props, "viewportHeight" | "headerHeight" | "mainHeight">>;
export {};

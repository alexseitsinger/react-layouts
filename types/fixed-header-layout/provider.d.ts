import { ReactNode, ReactElement } from "react";
import { CSSObject } from "@emotion/core";
declare const defaultProps: {
    initialFooterHeight: string;
};
declare type DefaultProps = Readonly<typeof defaultProps>;
declare type Props = {
    children: ReactNode | ReactNode[];
    onRenderHeader: () => ReactNode;
    onRenderFooter?: () => ReactNode;
    onRenderSidebar?: () => ReactNode;
    headerStyle?: CSSObject;
    footerStyle?: CSSObject;
    initialViewportHeight: string;
    initialHeaderHeight: string;
    sidebarWidth?: string;
} & DefaultProps;
export interface HeightProps {
    nextHeaderHeight?: string;
    nextFooterHeight?: string;
}
export declare function FixedHeaderLayout({ children, initialHeaderHeight, initialViewportHeight, initialFooterHeight, headerStyle, footerStyle, onRenderHeader, onRenderFooter, onRenderSidebar, sidebarWidth, }: Props): ReactElement;
export declare namespace FixedHeaderLayout {
    var defaultProps: {
        initialFooterHeight: string;
    };
}
export {};

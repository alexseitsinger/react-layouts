import { ReactNode, ReactElement } from "react";
import { SidebarLayoutProps } from "src/sidebar-layout";
import { HeaderLayoutProps } from "src/header-layout";
import { FooterLayoutProps } from "src/footer-layout";
export declare const defaultProps: {
    initialHeaderHeight: string;
    initialFooterHeight: string;
    sidebarWidth: string;
};
declare type Props = {
    children: ReactNode | ReactNode[];
    initialViewportHeight: string;
} & Partial<SidebarLayoutProps> & Partial<FooterLayoutProps> & Partial<HeaderLayoutProps> & Readonly<typeof defaultProps>;
export declare const initialState: {
    viewportHeight: string;
    headerHeight: string;
    mainHeight: string;
    footerHeight: string;
};
export interface HeightProps {
    nextHeaderHeight?: string;
    nextFooterHeight?: string;
}
export declare function LayoutProvider({ children, initialHeaderHeight, initialViewportHeight, initialFooterHeight, headerStyle, footerStyle, onRenderHeader, onRenderFooter, onRenderSidebar, sidebarWidth, sidebarVoidStyle, sidebarBodyStyle, sidebarContainerStyle, }: Props): ReactElement;
export declare namespace LayoutProvider {
    var defaultProps: {
        initialHeaderHeight: string;
        initialFooterHeight: string;
        sidebarWidth: string;
    };
}
export {};

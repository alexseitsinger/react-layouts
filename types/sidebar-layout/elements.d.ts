/// <reference types="react" />
/// <reference types="@emotion/core" />
interface SidebarLayoutMainProps {
    sidebarWidth: string;
    mainHeight: string;
}
export declare const SidebarLayoutMain: import("@emotion/styled-base").StyledComponent<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, SidebarLayoutMainProps, object>;
interface SidebarLayoutContainerProps {
    sidebarWidth: string;
}
export declare const SidebarLayoutContainer: import("@emotion/styled-base").StyledComponent<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, SidebarLayoutContainerProps, object>;
interface SidebarContainerProps {
    sidebarWidth: string;
}
export declare const SidebarContainer: import("@emotion/styled-base").StyledComponent<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, SidebarContainerProps, object>;
interface SidebarVoidProps {
    headerHeight: string;
}
export declare const SidebarVoid: import("@emotion/styled-base").StyledComponent<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, SidebarVoidProps, object>;
interface SidebarBodyProps {
    mainHeight: string;
    footerHeight: string;
}
export declare const SidebarBody: import("@emotion/styled-base").StyledComponent<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, SidebarBodyProps, object>;
export {};

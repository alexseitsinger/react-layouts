import React, { ReactNode } from "react";
import { CSSObject } from "@emotion/core";
interface Props {
    children: ReactNode | ReactNode[];
    renderSidebar: () => React.ReactElement;
    mainHeight: string;
    headerHeight: string;
    viewportHeight: string;
    sidebarWidth: string;
    containerStyle: CSSObject;
    voidStyle: CSSObject;
    bodyStyle: CSSObject;
}
export declare const SidebarLayout: React.FC<Partial<Props>>;
export {};

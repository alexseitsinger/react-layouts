import { ReactNode, ReactElement } from "react";
import { CSSObject } from "@emotion/core";
interface Props {
    children: ReactNode | ReactNode[];
    onRenderHeader: () => ReactNode;
    headerStyle?: CSSObject;
    initialViewportHeight: string;
    initialHeaderHeight: string;
}
export declare function FixedHeaderLayout({ initialHeaderHeight, initialViewportHeight, onRenderHeader, children, headerStyle, }: Props): ReactElement;
export {};

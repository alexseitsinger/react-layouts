import { ReactElement, ReactNode } from "react";
import { CSSObject } from "@emotion/core";
interface Props {
    children: ReactNode | ReactNode[];
    styles?: CSSObject;
    initialHeight: string;
    finalHeight: string;
    onResize: (h: string) => void;
}
export declare function Header({ children, styles, initialHeight, finalHeight, onResize, }: Props): ReactElement;
export {};

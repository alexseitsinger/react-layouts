import { ReactElement, ReactNode } from "react";
import { CSSObject } from "@emotion/core";
import { HeightProps } from "src/fixed-header-layout/provider";
interface Props {
    children: ReactNode | ReactNode[];
    styles?: CSSObject;
    initialHeight: string;
    finalHeight: string;
    onResize: (p: HeightProps) => void;
}
export declare function Header({ children, styles, initialHeight, finalHeight, onResize, }: Props): ReactElement;
export {};

/// <reference types="react" />
/// <reference types="@emotion/core" />
import { LayoutContextProps as ContextProps } from "../context";
declare type MainElementProps = Partial<ContextProps> & {
    isStatic?: boolean;
};
export declare const MainElement: import("@emotion/styled-base").StyledComponent<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, MainElementProps, object>;
export {};

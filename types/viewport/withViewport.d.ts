import { ComponentType } from "react";
import { Partialize } from "../types";
import { ViewportContextProps as ContextProps } from "./ViewportContext";
declare type OptionalProps<T extends ContextProps> = Partialize<T, keyof ContextProps>;
declare type Props<P extends ContextProps> = OptionalProps<P>;
export declare function withViewport<P extends ContextProps>(Component: ComponentType<Props<P>>): ComponentType<Props<P>>;
export {};

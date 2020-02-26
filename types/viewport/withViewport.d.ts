import { ComponentType } from "react";
import { Partialize } from "../types";
import { ViewportContextProps as ContextProps } from "./ViewportContext";
declare type Optional<T extends ContextProps> = Partialize<T, keyof ContextProps>;
declare type WithoutContextProps<P extends ContextProps> = Optional<P>;
export declare function withViewport<P extends ContextProps>(Component: ComponentType<WithoutContextProps<P>>): ComponentType<WithoutContextProps<P>>;
export {};

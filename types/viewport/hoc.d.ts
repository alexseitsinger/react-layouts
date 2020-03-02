import { ComponentType } from "react";
import { Partialize } from "../types";
import { ViewportContextProps as ContextProps } from "./context";
declare type Optional<T extends ContextProps> = Partialize<T, keyof ContextProps>;
export declare function withViewport<T extends ContextProps>(Component: ComponentType<T>): ComponentType<Optional<T>>;
export {};

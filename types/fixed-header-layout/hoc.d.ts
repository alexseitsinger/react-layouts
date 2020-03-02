import { ComponentType } from "react";
import { FixedHeaderLayoutContextProps as ContextProps } from "./context";
import { Partialize } from "../types";
declare type Optional<T extends ContextProps> = Partialize<T, keyof ContextProps>;
export declare function withFixedHeaderLayout<T extends ContextProps>(Component: ComponentType<T>): ComponentType<Optional<T>>;
export {};

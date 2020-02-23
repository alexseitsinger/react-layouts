import { ComponentType } from "react";
import { Partialize } from "../types";
import { FixedHeaderLayoutContextProps as ContextProps } from "./FixedHeaderLayoutContext";
declare type Optional<T extends ContextProps> = Partialize<T, keyof ContextProps>;
export declare function withFixedHeaderLayout<P extends ContextProps>(Component: ComponentType<P>): ComponentType<Optional<P>>;
export {};

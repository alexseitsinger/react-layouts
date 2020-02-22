import React from "react";
export interface ContextProps {
    viewportHeight: string;
    headerHeight: string;
    mainHeight: string;
}
export declare const Context: React.Context<ContextProps>;

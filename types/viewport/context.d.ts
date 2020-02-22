import React from "react";
export interface ContextProps {
    viewportHeight: string;
    viewportWidth?: string;
}
export declare const Context: React.Context<ContextProps>;

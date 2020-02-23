import React from "react";
export interface FixedHeaderLayoutContextProps {
    viewportHeight: string;
    headerHeight: string;
    mainHeight: string;
}
export declare const FixedHeaderLayoutContext: React.Context<FixedHeaderLayoutContextProps>;

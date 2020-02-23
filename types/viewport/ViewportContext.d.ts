import React from "react";
export interface ViewportContextProps {
    viewportHeight: string;
    viewportWidth?: string;
}
export declare const ViewportContext: React.Context<ViewportContextProps>;

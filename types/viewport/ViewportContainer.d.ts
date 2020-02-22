import React, { ReactNode } from "react";
interface Props {
    children: ReactNode | ReactNode[];
    viewportHeight: string;
}
export declare const ViewportContainer: React.FC<Partial<Props>>;
export {};

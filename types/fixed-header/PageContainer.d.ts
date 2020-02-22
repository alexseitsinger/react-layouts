import React, { ReactNode } from "react";
interface Props {
    isStatic: boolean;
    mainHeight: string;
    children: ReactNode | ReactNode[];
}
export declare const PageContainer: React.FC<Partial<Props>>;
export {};

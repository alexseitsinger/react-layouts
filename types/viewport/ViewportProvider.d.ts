/// <reference types="underscore" />
import React, { ReactElement, ReactNode } from "react";
interface State {
    viewportWidth: string;
    viewportHeight: string;
}
interface Props {
    initialHeight: string;
    initialWidth?: string;
    children: ReactNode | ReactNode[];
}
export declare class ViewportProvider extends React.Component<Props, State> {
    state: State;
    isMountedNow: boolean;
    handleResize: (() => void) & import("underscore").Cancelable;
    constructor(props: Props);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    updateSizes: () => void;
    getWidth: () => string;
    getHeight: () => string;
    createSizes: () => State;
    render(): ReactElement;
}
export {};

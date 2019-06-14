import * as React from "react";
export interface IFormHeaderViewProps {
    desc: string;
    title: string;
    subtitle: string;
    showSteps: boolean;
    currentPage: number;
    numPages: number;
}
export declare class FormHeaderView extends React.Component<IFormHeaderViewProps, any> {
    render(): JSX.Element;
}

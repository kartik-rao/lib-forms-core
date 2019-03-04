import moment from 'moment';
import * as React from "react";
import { IViewProps } from "./IViewProps";
export declare class DateRangeView extends React.Component<IViewProps, any> {
    constructor(props: any);
    componentWillUnmount(): void;
    onChange: (dates: moment.Moment[], dateStrings: string[]) => void;
    render(): JSX.Element;
}

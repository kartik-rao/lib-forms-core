import moment from "moment";
import * as React from "react";
import { IViewProps } from "./IViewProps";
export declare class DateRangeView extends React.Component<IViewProps, any> {
    values: any;
    dateFormat: string;
    constructor(props: any);
    disabledStartDate: (startValue: moment.Moment) => boolean;
    disabledEndDate: (endValue: moment.Moment) => boolean;
    onChange: (field: any, value: any) => void;
    onStartChange: (value: any) => void;
    onEndChange: (value: any) => void;
    render(): JSX.Element;
}

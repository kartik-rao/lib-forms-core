import { DatePicker } from "antd";
import { observer } from "mobx-react";
import moment from "moment";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { IDateRangeProps } from "../../models/field.properties";

@observer
export class DateRangeView extends React.Component<IViewProps, any> {
    dateFormat: string;

    constructor(props: any) {
        super(props);
        this.state = {
            start: null,
            end: null
        }
    }

    disabledStartDate = (startValue:  moment.Moment) => {
        const endValue = this.state.end;
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.isAfter(endValue);
    }

    disabledEndDate = (endValue: moment.Moment) => {
        const startValue = this.state.start;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.isSameOrBefore(startValue);
    }

    onChange = (field, value) => {
        let state = Object.assign(this.state, {[field]: moment(value).format(this.state.dateFormat)})
        if (state.start && state.end) {
            this.props.onChange(`${state.start}|${state.end}`);
        }
        this.setState(state);
    }

    onStartChange = (value) => {
        this.onChange('start', value);
    }

    onEndChange = (value) => {
        this.onChange('end', value);
    }

    render() {
        let {field} = this.props;
        let component = field.componentProps as IDateRangeProps;
        let mode= (component.mode ? component.mode : 'date') as "time"|"date"|"month"|"year";
        let dateFormat = component.dateFormat;

        if (!dateFormat) {
            switch (mode) {
                case 'date' : {
                    dateFormat = moment.HTML5_FMT.DATE;
                    break;
                }
                case 'month' : {
                    dateFormat = moment.HTML5_FMT.MONTH;
                    break;
                }
                case 'time' : {
                    dateFormat = moment.HTML5_FMT.TIME;
                    break;
                }
                case 'year' : {
                    dateFormat = moment.HTML5_FMT.TIME;
                    break;
                }
            }
        }

        let startValue = !!component.startValue ? moment(component.startValue, dateFormat) : null;
        let endValue = !!component.endValue ? moment(component.endValue, dateFormat) : null;

        return <div id={field.id} data-uuid={field.uuid} className={`fl-field fl-daterange-field`}>
            <span id={`${field.id}-start`} className="fl-daterange-field-start" style={{marginRight: '5px'}} >
                <DatePicker
                    mode={mode}
                    disabledDate={this.disabledStartDate}
                    format={dateFormat}
                    defaultValue={startValue}
                    placeholder="Start"
                    onChange={this.onStartChange} />
            </span>
            <span id={`${field.id}-start`} className="fl-daterange-field-end">
                <DatePicker
                    mode={mode}
                    disabledDate={this.disabledEndDate}
                    format={dateFormat}
                    defaultValue={endValue}
                    placeholder="End"
                    onChange={this.onEndChange} />
            </span>
         </div>
    }
}
import { DatePicker } from "antd";
import { RangePickerProps } from "antd/lib/date-picker/interface";
import { observer } from "mobx-react";
import moment from "moment";
import * as React from "react";

export interface IDaterangeFieldProps extends RangePickerProps {
    id   : string,
    uuid : string,
    onChange: any,
    dateFormat: string;
}

@observer
export class DaterangeField extends React.Component<IDaterangeFieldProps, any> {
    values: any = {};
    dateFormat: string;

    constructor(props: any) {
        super(props);
        this.state = {start: null, end: null}
    }

    disabledStartDate = (startValue:  moment.Moment) => {
        const endValue = this.values.end;
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.isAfter(endValue);
    }

    disabledEndDate = (endValue: moment.Moment) => {
        const startValue = this.values.start;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.isSameOrBefore(startValue);
    }

    onChange = (field, value) => {
        this.values[field] = moment(value).format(this.dateFormat);
        if (this.values.start && this.values.end) {
            this.props.onChange(`${this.values.start}|${this.values.end}`);
        }
    }

    onStartChange = (value) => {
        this.onChange('start', value);
    }

    onEndChange = (value) => {
        this.onChange('end', value);
    }

    render() {
        let {props} = this;
        let mode = props.mode ? props.mode : 'date';
        let dateFormat = props.dateFormat;

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

        this.dateFormat = dateFormat;
        let startValue = !!props.value && props.value["start"] ? props.value["start"] : null;
        let endValue = !!props.value && props.value["end"] ? props.value["end"] : null;

        return <div id={props.id} data-uuid={props.uuid} className={`fl-field fl-daterange-field`}>
            <span style={{marginRight: '5px'}} id={`${props.id}-start`} className="fl-daterange-field-start">
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    format={dateFormat}
                    defaultValue={startValue}
                    placeholder="Start"
                    onChange={this.onStartChange} />
            </span>
            <span id={`${props.id}-start`} className="fl-daterange-field-end">
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    format={dateFormat}
                    defaultValue={endValue}
                    placeholder="End"
                    onChange={this.onEndChange} />
            </span>
         </div>
    }
}
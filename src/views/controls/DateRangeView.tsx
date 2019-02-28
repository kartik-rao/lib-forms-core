import { DatePicker } from "antd";
import {toJS, observe} from 'mobx';
import { observer } from "mobx-react";
import * as moment from 'moment'
import {Moment} from 'moment';
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { IDateRangeProps } from "../../models/field.properties";
import { any } from "prop-types";

@observer
export class DateRangeView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);

        let {dateFormat, mode, defaultStartValue, defaultEndValue} = (this.props.field.componentProps as IDateRangeProps);

        let dateMode= (mode ? mode : 'date') as "time"|"date"|"month"|"year";
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

        let defaultStart = !!defaultStartValue ? moment(defaultStartValue, dateFormat) : null;
        let defaultEnd  = !!defaultEndValue ? moment(defaultEndValue, dateFormat) : null;
        let {minStartDate} = this.props.field.componentProps as IDateRangeProps;

        let minStart: Moment;
        if (minStartDate) {
            minStart = moment().add(toJS(minStartDate.relative))
        }

        let disposer = observe(props.field.componentProps, "minStartDate", (change) => {
            if(change.newValue) {
                this.setState({'minStart' : moment().add(toJS(change.newValue.relative))})
            } else {
                this.setState({'minStart' : null})
            }
        });

        this.state = {
            start: defaultStart,
            end: defaultEnd,
            mode: dateMode,
            dateFormat: dateFormat,
            minStart: minStart,
            disposer: disposer
        }


    }

    componentWillUnmount() {
        this.state.disposer();
    }

    disabledStartDate = (startValue:  moment.Moment) => {
        const endValue = this.state.end;
        const minStart = this.state.minStart;
        let response = false;

        if(startValue) {
            if(minStart && startValue.isBefore(minStart)) {
                return true;
            }
            if (endValue && startValue.isAfter(endValue)) {
                return true;
            }
        }
        return response;
    }

    disabledEndDate = (endValue: moment.Moment) => {
        let response = false;
        const startValue = this.state.start;
        if(!endValue || !startValue) {
            return false;
        } else {
            response = endValue.isBefore(startValue)
        }
        return response;
    }

    onChange = (field: string, value: moment.Moment) => {
        let {state} = this;
        if (state.start && state.end) {
            let {startValuePropsName, endValuePropsName} = this.props.field.componentProps as IDateRangeProps;
            this.props.onChange({[startValuePropsName] : state.start.format(this.state.dateFormat), [endValuePropsName]: state.end.format(this.state.dateFormat)});
        }
    }

    onStartChange = (value) => {
        this.setState({'start': value});
        this.onChange('start', value);
    }

    onEndChange = (value) => {
        this.setState({'end': value});
        this.onChange('end', value);
    }

    render() {
        let {field} = this.props;
        return <div id={field.id} data-uuid={field.uuid} className={`fl-field fl-daterange-field`}>
            <span id={`${field.id}-start`} className="fl-daterange-field-start" style={{marginRight: '5px'}} >
                <DatePicker
                    mode={this.state.mode}
                    disabledDate={this.disabledStartDate}
                    format={this.state.dateFormat}
                    defaultValue={this.state.defaultEnd}
                    placeholder="Start"
                    onChange={this.onStartChange}
                    value={this.state.start}/>
            </span>
            <span id={`${field.id}-start`} className="fl-daterange-field-end">
                <DatePicker
                    mode={this.state.mode}
                    disabledDate={this.disabledEndDate}
                    format={this.state.dateFormat}
                    defaultValue={this.state.defaultEnd}
                    placeholder="End"
                    onChange={this.onEndChange}
                    value={this.state.end}/>
            </span>
         </div>
    }
}
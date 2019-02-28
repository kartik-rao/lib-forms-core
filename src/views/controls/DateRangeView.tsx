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

        let disposer = observe(props.field, "componentProps", (change) => {
            let props = change.newValue;
            let newState = {};
            if (props.dateFormat) {
                newState['dateFormat'] = props.dateFormat;
            }
            if(props.defaultStart) {
                newState['dates'] = this.state.defaultValue.splice()
            }
            if(props) {
                this.setState({
                    'minStart' : moment().add(toJS(change.newValue.relative)),
                })
            } else {
                this.setState({'minStart' : null})
            }
        });

        this.state = {
            defaultValue: [defaultStart, defaultEnd],
            dates: [defaultStart, defaultEnd],
            mode: dateMode,
            dateFormat: dateFormat,
            minStart: minStart,
            disposer: disposer
        }
    }

    componentWillUnmount() {
        this.state.disposer();
    }

    onChange = (dates: moment.Moment[], dateStrings: string[]) => {
        this.setState({"dates": dates})
        let {startValuePropsName, endValuePropsName} = this.props.field.componentProps as IDateRangeProps;
        this.props.onChange({[startValuePropsName] : dateStrings[0], [endValuePropsName]: dateStrings[1]});
    }

    render() {
        let {field} = this.props;
        return <div id={field.id} data-uuid={field.uuid} className={`fl-field fl-daterange-field`}>
            <span id={`${field.id}-start`} className="fl-daterange-field-start" style={{marginRight: '5px'}} >
            <DatePicker.RangePicker
                onChange={this.onChange}
                format={this.state.dateFormat}
                />
            </span>
         </div>
    }
}
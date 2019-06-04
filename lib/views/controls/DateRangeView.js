var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DatePicker } from "antd";
import { toJS, observe } from 'mobx';
import { observer } from "mobx-react";
import moment from 'moment';
import * as React from "react";
let DateRangeView = class DateRangeView extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = (dates, dateStrings) => {
            this.setState({ "dates": dates });
            let { startValuePropsName, endValuePropsName } = this.props.field.componentProps;
            this.props.onChange({ [startValuePropsName]: dateStrings[0], [endValuePropsName]: dateStrings[1] });
        };
        let { dateFormat, mode, defaultStartValue, defaultEndValue } = this.props.field.componentProps;
        let dateMode = (mode ? mode : 'date');
        if (!dateFormat) {
            switch (mode) {
                case 'date': {
                    dateFormat = moment.HTML5_FMT.DATE;
                    break;
                }
                case 'month': {
                    dateFormat = moment.HTML5_FMT.MONTH;
                    break;
                }
                case 'time': {
                    dateFormat = moment.HTML5_FMT.TIME;
                    break;
                }
                case 'year': {
                    dateFormat = moment.HTML5_FMT.TIME;
                    break;
                }
            }
        }
        let defaultStart = !!defaultStartValue ? moment(defaultStartValue, dateFormat) : null;
        let defaultEnd = !!defaultEndValue ? moment(defaultEndValue, dateFormat) : null;
        let { minStartDate } = this.props.field.componentProps;
        let minStart;
        if (minStartDate) {
            minStart = moment().add(toJS(minStartDate.relative));
        }
        let disposer = observe(props.field, "componentProps", (change) => {
            let props = change.newValue;
            let newState = {};
            if (props.dateFormat) {
                newState['dateFormat'] = props.dateFormat;
            }
            if (props.defaultStart) {
                newState['dates'] = this.state.defaultValue.splice();
            }
            if (props) {
                this.setState({
                    'minStart': moment().add(toJS(change.newValue.relative)),
                });
            }
            else {
                this.setState({ 'minStart': null });
            }
        });
        this.state = {
            defaultValue: [defaultStart, defaultEnd],
            dates: [defaultStart, defaultEnd],
            mode: dateMode,
            dateFormat: dateFormat,
            minStart: minStart,
            disposer: disposer
        };
    }
    componentWillUnmount() {
        this.state.disposer();
    }
    render() {
        let { field } = this.props;
        return React.createElement("span", { id: `${field.id}-start`, className: "fl-daterange-field-start", style: { marginRight: '5px' } },
            React.createElement(DatePicker.RangePicker, { onChange: this.onChange, format: this.state.dateFormat }));
    }
};
DateRangeView = __decorate([
    observer
], DateRangeView);
export { DateRangeView };

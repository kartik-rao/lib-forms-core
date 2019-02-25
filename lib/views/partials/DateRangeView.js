var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DatePicker } from "antd";
import { observer } from "mobx-react";
import moment from "moment";
import * as React from "react";
let DateRangeView = class DateRangeView extends React.Component {
    constructor(props) {
        super(props);
        this.values = {};
        this.disabledStartDate = (startValue) => {
            const endValue = this.state.end;
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.isAfter(endValue);
        };
        this.disabledEndDate = (endValue) => {
            const startValue = this.state.start;
            if (!endValue || !startValue) {
                return false;
            }
            return endValue.isSameOrBefore(startValue);
        };
        this.onChange = (field, value) => {
            this.setState({ [field]: moment(value).format(this.state.dateFormat) });
            if (this.state.start && this.state.end) {
                this.props.onChange(`${this.state.start}|${this.values.end}`);
            }
        };
        this.onStartChange = (value) => {
            this.onChange('start', value);
        };
        this.onEndChange = (value) => {
            this.onChange('end', value);
        };
        this.state = {
            start: null,
            end: null
        };
    }
    render() {
        let { field } = this.props;
        let component = field.componentProps;
        let mode = (component.mode ? component.mode : 'date');
        let dateFormat = component.dateFormat;
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
        let startValue = !!component.startValue ? moment(component.startValue, dateFormat) : null;
        let endValue = !!component.endValue ? moment(component.startValue, dateFormat) : null;
        return React.createElement("div", { id: field.id, "data-uuid": field.uuid, className: `fl-field fl-daterange-field` },
            React.createElement("span", { id: `${field.id}-start`, className: "fl-daterange-field-start", style: { marginRight: '5px' } },
                React.createElement(DatePicker, { mode: mode, disabledDate: this.disabledStartDate, format: dateFormat, defaultValue: startValue, placeholder: "Start", onChange: this.onStartChange })),
            React.createElement("span", { id: `${field.id}-start`, className: "fl-daterange-field-end" },
                React.createElement(DatePicker, { mode: mode, disabledDate: this.disabledEndDate, format: dateFormat, defaultValue: endValue, placeholder: "End", onChange: this.onEndChange })));
    }
};
DateRangeView = __decorate([
    observer
], DateRangeView);
export { DateRangeView };

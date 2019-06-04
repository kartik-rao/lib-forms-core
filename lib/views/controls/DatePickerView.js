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
let DatePickerView = class DatePickerView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange } = this.props;
        let component = field.componentProps;
        let { dateFormat, mode } = component;
        if (!mode) {
            mode = "date";
        }
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
        let _onChange = (e) => {
            let v = e.target ? e.target.value : e;
            v ? onChange(moment(v).format(dateFormat)) : onChange(null);
        };
        return React.createElement(DatePicker, { mode: component.mode, defaultValue: component.defaultValue ? moment(component.defaultValue, dateFormat) : null, format: component.dateFormat, onChange: _onChange });
    }
};
DatePickerView = __decorate([
    observer
], DatePickerView);
export { DatePickerView };

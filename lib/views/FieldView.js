var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DatePicker, Form, Input, Rate, Slider } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { CheckboxGroupView } from "./partials/CheckboxGroupView";
import { CheckboxView } from "./partials/CheckboxView";
import { DatePickerView } from "./partials/DatePickerView";
import { DateRangeView } from "./partials/DateRangeView";
import { InputView } from "./partials/InputView";
import { NumberView } from "./partials/NumberView";
import { RadioGroupView } from "./partials/RadioGroupView";
import { SelectView } from "./partials/SelectView";
let FieldView = class FieldView extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const { field, store } = this.props;
        const { inputType } = field;
        let onChange = (e) => {
            let value = e && typeof (e) == 'object' && e.target ? e.target.value : e;
            console.warn(`field.onChange triggered ${field.id} ${value}`);
            field.setValue(value);
        };
        let onBlur = () => field.setTouched();
        let { id } = field;
        return !field.isDisabled && React.createElement(Form.Item, { label: field.label, hasFeedback: store.touched[id] && store.errors[id] ? true : false, validateStatus: store.touched[id] && store.errors[id] ? "error" : "validating", help: store.touched[id] ? store.errors[id] : null },
            inputType == "input" && React.createElement(InputView, { field: field, onChange: onChange, onBlur: onBlur }),
            inputType == "checkbox" && React.createElement(CheckboxView, { field: field, onChange: onChange }),
            inputType == "number" && React.createElement(NumberView, { field: field, onChange: onChange, onBlur: onBlur }),
            inputType == "select" && React.createElement(SelectView, { field: field, onChange: onChange, onBlur: onBlur }),
            inputType == "radiogroup" && React.createElement(RadioGroupView, { field: field, onChange: onChange }),
            inputType == "checkboxgroup" && React.createElement(CheckboxGroupView, { field: field, onChange: onChange }),
            inputType == "textarea" && React.createElement(Input.TextArea, { onChange: onChange }),
            inputType == "daterange" && React.createElement(DateRangeView, { field: field, onChange: onChange }),
            inputType == "datepicker" && React.createElement(DatePickerView, { field: field, onChange: onChange }),
            inputType == "monthpicker" && React.createElement(DatePickerView, { field: field, onChange: onChange }),
            inputType == "timepicker" && React.createElement(DatePickerView, { field: field, onChange: onChange }),
            inputType == "yearpicker" && React.createElement(DatePickerView, { field: field, onChange: onChange }),
            inputType == "rangepicker" && React.createElement(DatePicker.RangePicker, { onChange: onChange }),
            inputType == 'rate' && React.createElement(Rate, { onChange: onChange }),
            inputType == 'slider' && React.createElement(Slider, { onChange: onChange }),
            inputType == "textblock" && React.createElement("p", null, field.value));
    }
};
FieldView = __decorate([
    observer
], FieldView);
export { FieldView };

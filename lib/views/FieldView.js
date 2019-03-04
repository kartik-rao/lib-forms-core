var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Form } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { CheckboxGroupView } from "./controls/CheckboxGroupView";
import { CheckboxView } from "./controls/CheckboxView";
import { DatePickerView } from "./controls/DatePickerView";
import { DateRangeView } from "./controls/DateRangeView";
import { InputView } from "./controls/InputView";
import { NumberView } from "./controls/NumberView";
import { RadioGroupView } from "./controls/RadioGroupView";
import { SelectView } from "./controls/SelectView";
import { CascaderView } from "./controls/CascaderView";
import { StarRatingView } from "./controls/StarRatingView";
import { SwitchView } from "./controls/SwitchView";
import { TransferView } from "./controls/TransferView";
import { SliderView } from "./controls/SliderView";
import { TextAreaView } from "./controls/TextAreaView";
import { TextBlockView } from "./controls/TextBlockView";
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
            field.setValue(value);
        };
        let onBlur = () => field.setTouched();
        let { id } = field;
        return !field.isDisabled && React.createElement(Form.Item, { label: field.label, hasFeedback: store.touched[id] && store.errors[id] ? true : false, validateStatus: store.touched[id] && store.errors[id] ? "error" : "validating", help: store.touched[id] ? (store.errors[id] ? store.errors[id] : field.helpText) : field.helpText, required: field.isRequired },
            inputType == "input" && React.createElement(InputView, { field: field, onChange: onChange, onBlur: onBlur }),
            inputType == "checkbox" && React.createElement(CheckboxView, { field: field, onChange: onChange }),
            inputType == "number" && React.createElement(NumberView, { field: field, onChange: onChange, onBlur: onBlur }),
            inputType == "select" && React.createElement(SelectView, { field: field, onChange: onChange, onBlur: onBlur }),
            inputType == "cascader" && React.createElement(CascaderView, { field: field, onChange: onChange }),
            inputType == "radiogroup" && React.createElement(RadioGroupView, { field: field, onChange: onChange }),
            inputType == "checkboxgroup" && React.createElement(CheckboxGroupView, { field: field, onChange: onChange }),
            inputType == "textarea" && React.createElement(TextAreaView, { field: field, onChange: onChange }),
            inputType == "daterange" && React.createElement(DateRangeView, { field: field, onChange: onChange }),
            inputType == "datepicker" && React.createElement(DatePickerView, { field: field, onChange: onChange }),
            inputType == "monthpicker" && React.createElement(DatePickerView, { field: field, onChange: onChange }),
            inputType == "timepicker" && React.createElement(DatePickerView, { field: field, onChange: onChange }),
            inputType == "yearpicker" && React.createElement(DatePickerView, { field: field, onChange: onChange }),
            inputType == 'starrating' && React.createElement(StarRatingView, { field: field, onChange: onChange }),
            inputType == 'switch' && React.createElement(SwitchView, { field: field, onChange: onChange }),
            inputType == 'transfer' && React.createElement(TransferView, { field: field, onChange: onChange }),
            inputType == 'slider' && React.createElement(SliderView, { field: field, onChange: onChange }),
            inputType == "textblock" && React.createElement(TextBlockView, { field: field, onChange: onChange }));
    }
};
FieldView = __decorate([
    observer
], FieldView);
export { FieldView };

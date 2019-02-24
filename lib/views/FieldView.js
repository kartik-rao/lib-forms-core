var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Rate, Select, Slider } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let FieldView = class FieldView extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const { field, store } = this.props;
        const { type, inputType } = field;
        let onChange = (e) => field.setValue(e.target ? e.target.value : e);
        let onBlur = (e) => field.setTouched();
        let { id, name, uuid } = field;
        return !field.isDisabled && React.createElement(Form.Item, { label: field.label, hasFeedback: store.touched[id] && store.errors[id] ? true : false, validateStatus: store.touched[id] && store.errors[id] ? "error" : "validating", help: store.touched[id] ? store.errors[id] : null },
            (inputType == "input" && (type == "text" || type == "hidden")) && React.createElement(Input, { id: field.id, "data-uuid": field.uuid, type: field.type, placeholder: field.placeholder, value: store.values[id], onChange: onChange, onBlur: onBlur }),
            inputType == "checkbox" && React.createElement(Checkbox, { onChange: onChange, checked: store.values[id] == true }),
            inputType == "number" && React.createElement(InputNumber, { onChange: onChange, onBlur: onBlur, value: store.values[id] }),
            inputType == "select" && React.createElement(Select, { onChange: onChange, onBlur: onBlur, value: store.values[id] }, field.children.map((child, index) => {
                return React.createElement(Select.Option, { key: "" + index, value: child.value }, child.label);
            })),
            inputType == "radiogroup" && React.createElement(Radio.Group, { onChange: onChange, options: field.children, value: store.values[id] }),
            inputType == "checkboxgroup" && React.createElement(Checkbox.Group, { onChange: onChange, options: field.children, value: store.values[id] }),
            inputType == "textarea" && React.createElement(Input.TextArea, { onChange: onChange, value: store.values[id] }),
            inputType == "datepicker" && React.createElement(DatePicker, { onChange: onChange, value: store.values[id] }),
            inputType == "monthpicker" && React.createElement(DatePicker.MonthPicker, { onChange: onChange, value: store.values[id] }),
            inputType == "rangepicker" && React.createElement(DatePicker.RangePicker, { onChange: onChange, value: store.values[id] }),
            inputType == "weekpicker" && React.createElement(DatePicker.WeekPicker, { onChange: onChange, value: store.values[id] }),
            inputType == 'rate' && React.createElement(Rate, { onChange: onChange, value: store.values[id] }),
            inputType == 'slider' && React.createElement(Slider, { onChange: onChange, value: store.values[id] }),
            inputType == "textblock" && React.createElement("p", null, field.value));
    }
};
FieldView = __decorate([
    observer
], FieldView);
export { FieldView };

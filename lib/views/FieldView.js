import * as tslib_1 from "tslib";
import { Form } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { CascaderView } from "./controls/CascaderView";
import { CheckboxGroupView } from "./controls/CheckboxGroupView";
import { CheckboxView } from "./controls/CheckboxView";
import { DatePickerView } from "./controls/DatePickerView";
import { DateRangeView } from "./controls/DateRangeView";
import { HTMLFragmentView } from './controls/HtmlFragmentView';
import { InputView } from "./controls/InputView";
import { NumberView } from "./controls/NumberView";
import { RadioGroupView } from "./controls/RadioGroupView";
import { RadioView } from './controls/RadioView';
import { SelectView } from "./controls/SelectView";
import { SliderView } from "./controls/SliderView";
import { StarRatingView } from "./controls/StarRatingView";
import { SwitchView } from "./controls/SwitchView";
import { TextAreaView } from "./controls/TextAreaView";
import { TextBlockView } from "./controls/TextBlockView";
import { TransferView } from "./controls/TransferView";
let FieldView = class FieldView extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const { field, store } = this.props;
        const { layout } = store.form;
        const { form } = store;
        let onChange = (e) => {
            let value = e && typeof (e) == 'object' && e.target ? e.target.value : e;
            field.setValue(value);
        };
        let onBlur = () => field.setTouched();
        let { id, inputType, type } = field;
        let fieldClass = inputType == type ? inputType : (type ? `${inputType}-${type}` : `${inputType}`);
        let labelAlign = field.itemLayoutOptions.labelAlign || form.itemLayoutOptions.labelAlign || 'left';
        let itemLayout = field.itemLayoutOptions || form.itemLayoutOptions || {};
        return React.createElement("div", { id: `fl-field-${field.id}`, "data-uuid": field.uuid, className: `fl-field fl-field-${fieldClass}` }, !field.isDisabled && React.createElement(Form.Item, { label: field.label, labelAlign: labelAlign, hasFeedback: store.touched[id] && store.errors[id] ? true : null, validateStatus: store.touched[id] && store.errors[id] ? "error" : "validating", wrapperCol: itemLayout.wrapperCol, labelCol: layout == "horizontal" ? itemLayout.labelCol : null, extra: field.helpText, help: store.touched[id] ? (store.errors[id] ? store.errors[id] : field.helpText) : '', required: field.isRequired },
            inputType == "input" && React.createElement(InputView, { field: field, onChange: onChange, onBlur: onBlur }),
            inputType == "radio" && React.createElement(RadioView, { field: field, onChange: onChange }),
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
            inputType == "textblock" && React.createElement(TextBlockView, { field: field, onChange: onChange }),
            inputType == "htmlfragment" && React.createElement(HTMLFragmentView, { field: field })));
    }
};
FieldView = tslib_1.__decorate([
    observer
], FieldView);
export { FieldView };

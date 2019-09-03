import { Form } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { formStoreContext } from '../store/FormStoreProvider';
// import { CascaderView } from "./controls/CascaderView";
// import { CheckboxGroupView } from "./controls/CheckboxGroupView";
// import { CheckboxView } from "./controls/CheckboxView";
// import { DatePickerView } from "./controls/DatePickerView";
// import { DateRangeView } from "./controls/DateRangeView";
// import { HtmlFragmentView } from './controls/HtmlFragmentView';
// import { InputView } from "./controls/InputView";
// import { NumberView } from "./controls/NumberView";
// import { RadioGroupView } from "./controls/RadioGroupView";
// import { RadioView } from './controls/RadioView';
// import { SelectView } from "./controls/SelectView";
// import { SliderView } from "./controls/SliderView";
// import { StarRatingView } from "./controls/StarRatingView";
// import { SwitchView } from "./controls/SwitchView";
// import { TextAreaView } from "./controls/TextAreaView";
// import { TextBlockView } from "./controls/TextBlockView";
// import { TransferView } from "./controls/TransferView";
const CascaderView = React.lazy(() => import(/* webpackChunkName: "cascader" */ './controls/CascaderView').then((module) => { return { default: module.CascaderView }; }));
const CheckboxGroupView = React.lazy(() => import(/* webpackChunkName: "checkboxgroup" */ './controls/CheckboxGroupView').then((module) => { return { default: module.CheckboxGroupView }; }));
const CheckboxView = React.lazy(() => import(/* webpackChunkName: "checkbox" */ './controls/CheckboxView').then((module) => { return { default: module.CheckboxView }; }));
const DatePickerView = React.lazy(() => import(/* webpackChunkName: "datepicker" */ './controls/DatePickerView').then((module) => { return { default: module.DatePickerView }; }));
const DateRangeView = React.lazy(() => import(/* webpackChunkName: "daterange" */ './controls/DateRangeView').then((module) => { return { default: module.DateRangeView }; }));
const HtmlFragmentView = React.lazy(() => import(/* webpackChunkName: "htmlfragment" */ './controls/HtmlFragmentView').then((module) => { return { default: module.HtmlFragmentView }; }));
const InputView = React.lazy(() => import(/* webpackChunkName: "input" */ './controls/InputView').then((module) => { return { default: module.InputView }; }));
const NumberView = React.lazy(() => import(/* webpackChunkName: "number" */ './controls/NumberView').then((module) => { return { default: module.NumberView }; }));
const RadioGroupView = React.lazy(() => import(/* webpackChunkName: "radiogroup" */ './controls/RadioGroupView').then((module) => { return { default: module.RadioGroupView }; }));
const RadioView = React.lazy(() => import(/* webpackChunkName: "radio" */ './controls/RadioView').then((module) => { return { default: module.RadioView }; }));
const SelectView = React.lazy(() => import(/* webpackChunkName: "select" */ './controls/SelectView').then((module) => { return { default: module.SelectView }; }));
const SliderView = React.lazy(() => import(/* webpackChunkName: "slider" */ './controls/SliderView').then((module) => { return { default: module.SliderView }; }));
const StarRatingView = React.lazy(() => import(/* webpackChunkName: "starrating" */ './controls/StarRatingView').then((module) => { return { default: module.StarRatingView }; }));
const SwitchView = React.lazy(() => import(/* webpackChunkName: "switch" */ './controls/SwitchView').then((module) => { return { default: module.SwitchView }; }));
const TextAreaView = React.lazy(() => import(/* webpackChunkName: "textarea" */ './controls/TextAreaView').then((module) => { return { default: module.TextAreaView }; }));
const TextBlockView = React.lazy(() => import(/* webpackChunkName: "textblock" */ './controls/TextBlockView').then((module) => { return { default: module.TextBlockView }; }));
const TransferView = React.lazy(() => import(/* webpackChunkName: "transfer" */ './controls/TransferView').then((module) => { return { default: module.TransferView }; }));
export const FieldView = (props) => {
    const store = React.useContext(formStoreContext);
    if (!store)
        throw new Error("ERROR FieldView - store is null");
    let onChange = (e) => {
        let value = e && typeof (e) == 'object' && e.target ? e.target.value : e;
        props.field.setValue(value);
    };
    let onBlur = () => props.field.setTouched();
    let { id, inputType, type } = props.field;
    // Some fields only have inputtype
    let fieldClass = inputType == type ? inputType : (type ? `${inputType}-${type}` : `${inputType}`);
    // labelCol should only be passed if form is horizontal
    // otherwise the control does not go to the next line
    // Allow field item layout options to override form layout options
    let labelAlign = props.field.itemLayoutOptions.labelAlign || store.form.itemLayoutOptions.labelAlign || 'left';
    let itemLayout = props.field.itemLayoutOptions || store.form.itemLayoutOptions || {};
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "loading..." },
            React.createElement("div", { id: `fl-field-${props.field.id}`, "data-uuid": props.field.uuid, className: `fl-field fl-field-${fieldClass}` }, !props.field.isDisabled && React.createElement(Form.Item, { label: props.field.label, labelAlign: labelAlign, hasFeedback: store.touched[id] && store.errors[id] ? true : null, validateStatus: store.touched[id] && store.errors[id] ? "error" : "validating", wrapperCol: itemLayout.wrapperCol, labelCol: store.form.layout == "horizontal" ? itemLayout.labelCol : null, 
                // extra={props.field.helpText}
                help: store.touched[id] ? (store.errors[id] ? store.errors[id] : props.field.helpText) : '', required: props.field.isRequired },
                inputType == "input" && React.createElement(InputView, { field: props.field, onChange: onChange, onBlur: onBlur }),
                inputType == "radio" && React.createElement(RadioView, { field: props.field, onChange: onChange }),
                inputType == "checkbox" && React.createElement(CheckboxView, { field: props.field, onChange: onChange }),
                inputType == "number" && React.createElement(NumberView, { field: props.field, onChange: onChange, onBlur: onBlur }),
                inputType == "select" && React.createElement(SelectView, { field: props.field, onChange: onChange, onBlur: onBlur }),
                inputType == "cascader" && React.createElement(CascaderView, { field: props.field, onChange: onChange }),
                inputType == "radiogroup" && React.createElement(RadioGroupView, { field: props.field, onChange: onChange }),
                inputType == "checkboxgroup" && React.createElement(CheckboxGroupView, { field: props.field, onChange: onChange }),
                inputType == "textarea" && React.createElement(TextAreaView, { field: props.field, onChange: onChange }),
                inputType == "daterange" && React.createElement(DateRangeView, { field: props.field, onChange: onChange }),
                inputType == "datepicker" && React.createElement(DatePickerView, { field: props.field, onChange: onChange }),
                inputType == "monthpicker" && React.createElement(DatePickerView, { field: props.field, onChange: onChange }),
                inputType == "timepicker" && React.createElement(DatePickerView, { field: props.field, onChange: onChange }),
                inputType == "yearpicker" && React.createElement(DatePickerView, { field: props.field, onChange: onChange }),
                inputType == 'starrating' && React.createElement(StarRatingView, { field: props.field, onChange: onChange }),
                inputType == 'switch' && React.createElement(SwitchView, { field: props.field, onChange: onChange }),
                inputType == 'transfer' && React.createElement(TransferView, { field: props.field, onChange: onChange }),
                inputType == 'slider' && React.createElement(SliderView, { field: props.field, onChange: onChange }),
                inputType == "textblock" && React.createElement(TextBlockView, { field: props.field, onChange: onChange }),
                inputType == "htmlfragment" && React.createElement(HtmlFragmentView, { field: props.field }))));
    });
};

import { Form } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { Field } from "../models/field";
import { IItemLayoutOptions } from '../models/layout';
import { formStoreContext } from '../store/FormStoreProvider';

const CascaderView = React.lazy(() => import(/* webpackChunkName: "cascader" */ './controls/CascaderView').then((module) => {return {default: module.CascaderView}}));
const CheckboxGroupView = React.lazy(() => import(/* webpackChunkName: "checkboxgroup" */ './controls/CheckboxGroupView').then((module) => {return {default: module.CheckboxGroupView}}));
const CheckboxView = React.lazy(() => import(/* webpackChunkName: "checkbox" */ './controls/CheckboxView').then((module) => {return {default: module.CheckboxView}}));
const DatePickerView = React.lazy(() => import(/* webpackChunkName: "datepicker" */ './controls/DatePickerView').then((module) => {return {default: module.DatePickerView}}));
const DateRangeView = React.lazy(() => import(/* webpackChunkName: "daterange" */ './controls/DateRangeView').then((module) => {return {default: module.DateRangeView}}));
const HtmlFragmentView = React.lazy(() => import(/* webpackChunkName: "htmlfragment" */ './controls/HtmlFragmentView').then((module) => {return {default: module.HtmlFragmentView}}));
const InputView = React.lazy(() => import(/* webpackChunkName: "input" */ './controls/InputView').then((module) => {return {default: module.InputView}}));
const NumberView = React.lazy(() => import(/* webpackChunkName: "number" */ './controls/NumberView').then((module) => {return {default: module.NumberView}}));
const RadioGroupView = React.lazy(() => import(/* webpackChunkName: "radiogroup" */ './controls/RadioGroupView').then((module) => {return {default: module.RadioGroupView}}));
const RadioView = React.lazy(() => import(/* webpackChunkName: "radio" */ './controls/RadioView').then((module) => {return {default: module.RadioView}}));
const SelectView = React.lazy(() => import(/* webpackChunkName: "select" */ './controls/SelectView').then((module) => {return {default: module.SelectView}}));
const SliderView = React.lazy(() => import(/* webpackChunkName: "slider" */ './controls/SliderView').then((module) => {return {default: module.SliderView}}));
const StarRatingView = React.lazy(() => import(/* webpackChunkName: "starrating" */ './controls/StarRatingView').then((module) => {return {default: module.StarRatingView}}));
const SwitchView = React.lazy(() => import(/* webpackChunkName: "switch" */ './controls/SwitchView').then((module) => {return {default: module.SwitchView}}));
const TextAreaView = React.lazy(() => import(/* webpackChunkName: "textarea" */ './controls/TextAreaView').then((module) => {return {default: module.TextAreaView}}));
const TextBlockView = React.lazy(() => import(/* webpackChunkName: "textblock" */ './controls/TextBlockView').then((module) => {return {default: module.TextBlockView}}));
const TransferView = React.lazy(() => import(/* webpackChunkName: "transfer" */ './controls/TransferView').then((module) => {return {default: module.TransferView}}));


export const FieldView: React.FC<{field: Field, key: string}> = (props) => {
    const fStore = React.useContext(formStoreContext);
    if(!fStore) throw new Error("ERROR FieldView - store is null");

    let onChange = (e) => {
        let value = e && typeof(e) == 'object' && e.target ? e.target.value: e;
        props.field.setValue(value);
    };

    let onBlur = () => props.field.setTouched();
    let {id, inputType, type } = props.field;

    // Some fields only have inputtype
    let fieldClass = inputType == type ? inputType : (type ? `${inputType}-${type}` : `${inputType}`);

    // labelCol should only be passed if form is horizontal
    // otherwise the control does not go to the next line
    // Allow field item layout options to override form layout options

    let labelAlign = props.field.itemLayoutOptions.labelAlign || fStore.form.itemLayoutOptions.labelAlign || 'left';
    let itemLayout: IItemLayoutOptions = props.field.itemLayoutOptions || fStore.form.itemLayoutOptions || {};

    return useObserver(() => {
        return  <React.Suspense fallback="loading..."><div id={`fl-field-${props.field.id}`} data-uuid={props.field.uuid} className={`fl-field fl-field-${fieldClass}`}>
        { !props.field.isDisabled && <Form.Item label={props.field.label} labelAlign={labelAlign}
        hasFeedback={fStore.touched[id] && fStore.errors[id] ? true : null}
        validateStatus={fStore.touched[id] && fStore.errors[id] ?  "error" : "validating"}
        wrapperCol={itemLayout.wrapperCol}
        labelCol={fStore.form.layout == "horizontal" ? itemLayout.labelCol : null}
        // extra={props.field.helpText}
        help={fStore.touched[id] ? (fStore.errors[id] ? fStore.errors[id] : props.field.helpText): ''}
        required={props.field.isRequired}>
            {inputType == "input" && <InputView field={props.field} onChange={onChange} onBlur={onBlur}/>}
            {inputType == "radio" && <RadioView field={props.field} onChange={onChange} />}
            {inputType == "checkbox" && <CheckboxView field={props.field} onChange={onChange}  />}
            {inputType == "number" && <NumberView field={props.field} onChange={onChange} onBlur={onBlur}  />}
            {inputType == "select" && <SelectView field={props.field} onChange={onChange} onBlur={onBlur}  />}
            {inputType == "cascader" && <CascaderView field={props.field}  onChange={onChange} />}
            {inputType == "radiogroup" && <RadioGroupView field={props.field} onChange={onChange}  />}
            {inputType == "checkboxgroup" && <CheckboxGroupView field={props.field} onChange={onChange}   />}
            {inputType == "textarea" && <TextAreaView field={props.field} onChange={onChange}/>}
            {inputType == "daterange" && <DateRangeView field={props.field}  onChange={onChange} />}
            {inputType == "datepicker" && <DatePickerView field={props.field}  onChange={onChange} />}
            {inputType == "monthpicker" && <DatePickerView field={props.field} onChange={onChange} />}
            {inputType == "timepicker" && <DatePickerView field={props.field}  onChange={onChange} />}
            {inputType == "yearpicker" && <DatePickerView field={props.field}  onChange={onChange} />}
            {inputType == 'starrating' && <StarRatingView field={props.field} onChange={onChange} />}
            {inputType == 'switch' && <SwitchView field={props.field} onChange={onChange} />}
            {inputType == 'transfer' && <TransferView field={props.field} onChange={onChange} />}
            {inputType == 'slider' && <SliderView field={props.field} onChange={onChange}/>}
            {inputType == "textblock" && <TextBlockView field={props.field} onChange={onChange}/>}
            {inputType == "htmlfragment" && <HtmlFragmentView field={props.field}/>}
            </Form.Item> }
    </div></React.Suspense>
    });
}
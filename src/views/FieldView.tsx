import { Form } from "antd";
import { useObserver, useLocalStore } from "mobx-react";
import * as React from "react";
import { Field } from "../models/field";
import { IItemLayoutOptions } from '../models/layout';
import { formStoreContext } from '../store/FormStoreProvider';
import { observable } from 'mobx';

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

export type ValidateStatus = "success"|"warning"|"error"|"validating"|"";

export const FieldView: React.FC<{field: Field, key: string}> = (props) => {
    const fStore = React.useContext(formStoreContext);
    if(!fStore) throw new Error("ERROR FieldView - store is null");

    let localStore = observable(useLocalStore(() => ({
        get fieldClass() : string {
            return "fl-field fl-field-" + (inputType == type ? inputType : (type ? `${inputType}-${type}` : `${inputType}`))
        },
        get labelAlign() : "left"|"right" {
            return props.field.itemLayoutOptions.labelAlign || fStore.form.itemLayoutOptions.labelAlign || 'left';
        },
        get itemLayout() : IItemLayoutOptions {
            return props.field.itemLayoutOptions || fStore.form.itemLayoutOptions || {};
        },
        get hasFeedback() : boolean {
            return fStore.touched[id] && fStore.errors[id] ? true : null;
        },
        get isDateControl() : boolean {
            return props.field.inputType.indexOf('picker') > -1 || props.field.inputType.indexOf('date') > -1;
        },
        get validateStatus() : ValidateStatus {
            let defaultStatus: ValidateStatus = this.isDateControl ? "" : "validating";
            return !fStore.validationDisabled && fStore.touched[id] && fStore.errors[id] ? "error" : defaultStatus;
        },
        // labelCol should only be passed if form is horizontal
        // otherwise the control does not go to the next line
        // Allow field item layout options to override form layout options
        get labelColLayout() : any {
            return fStore.form.layout == "horizontal" ? this.itemLayout.labelCol : null
        },
        get wrapperColLayout() : any {
            return this.itemLayout.wrapperCol;
        },
        get helpText() : string {
            return !fStore.validationDisabled && fStore.touched[id] ? (fStore.errors[id] ? fStore.errors[id] : props.field.helpText): '';
        }
    })));

    let onChange = (e) => {
        let value = e && typeof(e) == 'object' && e.target ? e.target.value: e;
        props.field.setValue(value);
    };

    let onBlur = () => props.field.setTouched();
    let {id, inputType, type } = props.field;

    return useObserver(() => {
        return  <React.Suspense fallback="loading..."><div id={`fl-field-${props.field.id}`} data-uuid={props.field.uuid} className={localStore.fieldClass}>
        { !props.field.isDisabled && <Form.Item label={props.field.label} labelAlign={localStore.labelAlign}
        hasFeedback={localStore.hasFeedback}
        validateStatus={localStore.validateStatus}
        wrapperCol={localStore.wrapperColLayout}
        labelCol={localStore.labelColLayout}
        // extra={props.field.helpText}
        help={localStore.helpText}
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
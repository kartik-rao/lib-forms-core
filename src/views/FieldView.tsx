import { Form } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import Field from "../models/field";
import FormStore from "../store/FormStore";
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

export interface IFieldViewProps {
    field: Field;
    store: FormStore;
}

@observer
export class FieldView extends React.Component<IFieldViewProps, any> {
    props: IFieldViewProps
    constructor(props: IFieldViewProps) {
        super(props);
        this.props = props;
    }

    render() {
        const { field, store } = this.props;
        const { itemLayoutOptions } = store.form;

        let onChange = (e) => {
            let value = e && typeof(e) == 'object' && e.target ? e.target.value: e;
            field.setValue(value);
        };

        let onBlur = () => field.setTouched();

        let {id, inputType, type } = field;
        let fieldClass = inputType == type ? inputType : `${inputType}-${type}`;

        return <div id={`fl-field-${field.id}`} data-uuid={field.uuid} className={`fl-field fl-field-${fieldClass}`}>
            { !field.isDisabled && <Form.Item label={field.label}
            hasFeedback={store.touched[id] && store.errors[id] ? true : null}
            validateStatus={store.touched[id] && store.errors[id] ?  "error" : "validating"}
            {...itemLayoutOptions}
            help={store.touched[id] ? (store.errors[id] ? store.errors[id] : field.helpText): field.helpText}
            required={field.isRequired}>
                {inputType == "input" && <InputView field={field} onChange={onChange} onBlur={onBlur}/>}
                {inputType == "checkbox" && <CheckboxView field={field} onChange={onChange}  />}
                {inputType == "number" && <NumberView field={field} onChange={onChange} onBlur={onBlur}  />}
                {inputType == "select" && <SelectView field={field} onChange={onChange} onBlur={onBlur}  />}
                {inputType == "cascader" && <CascaderView field={field}  onChange={onChange} />}
                {inputType == "radiogroup" && <RadioGroupView field={field} onChange={onChange}  />}
                {inputType == "checkboxgroup" && <CheckboxGroupView field={field} onChange={onChange}   />}
                {inputType == "textarea" && <TextAreaView field={field} onChange={onChange}/>}
                {inputType == "daterange" && <DateRangeView field={field}  onChange={onChange} />}
                {inputType == "datepicker" && <DatePickerView field={field}  onChange={onChange} />}
                {inputType == "monthpicker" && <DatePickerView field={field} onChange={onChange} />}
                {inputType == "timepicker" && <DatePickerView field={field}  onChange={onChange} />}
                {inputType == "yearpicker" && <DatePickerView field={field}  onChange={onChange} />}
                {inputType == 'starrating' && <StarRatingView field={field} onChange={onChange} />}
                {inputType == 'switch' && <SwitchView field={field} onChange={onChange} />}
                {inputType == 'transfer' && <TransferView field={field} onChange={onChange} />}
                {inputType == 'slider' && <SliderView field={field} onChange={onChange}/>}
                {inputType == "textblock" && <TextBlockView field={field} onChange={onChange}/>}
                </Form.Item> }
        </div>
    }
}
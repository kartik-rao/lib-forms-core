import { Form } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import Field from "../models/field";
import FormStore from "../state/FormStore";
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

export interface IFieldProps {
    field: Field;
    store: FormStore;
}

@observer
export class FieldView extends React.Component<IFieldProps, any> {
    props: IFieldProps
    constructor(props: IFieldProps) {
        super(props);
        this.props = props;
    }

    render() {
        const {field, store} = this.props;
        const {inputType} = field;

        let onChange = (e) => {
            let value = e && typeof(e) == 'object' && e.target ? e.target.value: e;
            field.setValue(value);
        };
        let onBlur = () => field.setTouched();

        let {id} = field;
        // TODO Pass form layout to Field

        return !field.isDisabled && <Form.Item label={field.label}
            hasFeedback={store.touched[id] && store.errors[id] ? true : false}
            validateStatus={store.touched[id] && store.errors[id] ?  "error" : "validating"}
            help={store.touched[id] ? (store.errors[id] ? store.errors[id] : field.helpText): field.helpText}
            required={!!field.validationRules && !field.validationRules.required}>
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
                {inputType == "textblock" && <TextBlockView field={field} onChange={onChange}></TextBlockView>}
            </Form.Item>
    }
}
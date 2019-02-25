import { DatePicker, Form, Input, Rate, Slider } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import Field from "../models/field";
import FormStore from "../state/FormStore";
import { CheckboxGroupView } from "./partials/CheckboxGroupView";
import { CheckboxView } from "./partials/CheckboxView";
import { DatePickerView } from "./partials/DatePickerView";
import { DateRangeView } from "./partials/DateRangeView";
import { InputView } from "./partials/InputView";
import { NumberView } from "./partials/NumberView";
import { RadioGroupView } from "./partials/RadioGroupView";
import { SelectView } from "./partials/SelectView";

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
            console.warn(`field.onChange triggered ${field.id} ${value}`);
            field.setValue(value);
        };
        let onBlur = () => field.setTouched();

        let {id} = field;
        // TODO Pass form layout to Field

        return !field.isDisabled && <Form.Item label={field.label}
            hasFeedback={store.touched[id] && store.errors[id] ? true : false}
            validateStatus={store.touched[id] && store.errors[id] ?  "error" : "validating"}
            help={store.touched[id] ? store.errors[id] : null}>
                {inputType == "input" && <InputView field={field} onChange={onChange} onBlur={onBlur}/>}
                {inputType == "checkbox" && <CheckboxView field={field} onChange={onChange}  />}
                {inputType == "number" && <NumberView field={field} onChange={onChange} onBlur={onBlur}  />}
                {inputType == "select" && <SelectView field={field} onChange={onChange} onBlur={onBlur}  />}
                {inputType == "radiogroup" && <RadioGroupView field={field} onChange={onChange}  />}
                {inputType == "checkboxgroup" && <CheckboxGroupView field={field} onChange={onChange}   />}
                {inputType == "textarea" && <Input.TextArea onChange={onChange}/>}
                {inputType == "daterange" && <DateRangeView field={field}  onChange={onChange} />}
                {inputType == "datepicker" && <DatePickerView field={field}  onChange={onChange} />}
                {inputType == "monthpicker" && <DatePickerView field={field} onChange={onChange} />}
                {inputType == "timepicker" && <DatePickerView field={field}  onChange={onChange} />}
                {inputType == "yearpicker" && <DatePickerView field={field}  onChange={onChange} />}
                {inputType == "rangepicker" && <DatePicker.RangePicker onChange={onChange} />}
                {inputType == 'rate' && <Rate onChange={onChange} />}
                {inputType == 'slider' && <Slider onChange={onChange}/>}
                {inputType == "textblock" && <p>{field.value}</p>}
            </Form.Item>
    }
}
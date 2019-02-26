import { Form } from "antd";
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
import { CascaderView } from "./partials/CascaderView";
import { StarRatingView } from "./partials/StarRatingView";
import { SwitchView } from "./partials/SwitchView";
import { TransferView } from "./partials/TransferView";
import { SliderView } from "./partials/SliderView";
import { TextAreaView } from "./partials/TextAreaView";
import { TextBlockView } from "./partials/TextBlockView";

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
            help={store.touched[id] ? store.errors[id] : null}>
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
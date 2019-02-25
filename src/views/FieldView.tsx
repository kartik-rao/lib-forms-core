import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Rate, Select, Slider } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import Field from "../models/field";
import FormStore from "../state/FormStore";
import {TextField} from "./partials/TextField";
import {NumberField} from "./partials/NumberField";
import {SelectField} from "./partials/SelectField";
import {CheckboxField} from "./partials/CheckboxField";
import {DaterangeField} from "./partials//DaterangeField";
import {DatepickerField} from "./partials/DatepickerField";



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
        const {type, inputType} = field;

        let onChange = (e) => field.setValue( e && typeof(e) == 'object' && e.target ? e.target.value: e);
        let onBlur = (e) => field.setTouched();

        let {id, name, uuid} = field;
        // TODO Pass form layout to Field
        let idUUID = {id: id, uuid: uuid};
        return !field.isDisabled && <Form.Item label={field.label}
            hasFeedback={store.touched[id] && store.errors[id] ? true : false}
            validateStatus={store.touched[id] && store.errors[id] ?  "error" : "validating"}
            help={store.touched[id] ? store.errors[id] : null}>
            {
                (inputType == "input" && (type == "text" || type == "hidden")) && <TextField
                    {...idUUID}
                    type={field.type}
                    placeholder={field.placeholder}
                    defaultValue={store.values[id]}
                    onChange={onChange}
                    onBlur={onBlur}/>
            }
            {inputType == "checkbox" && <CheckboxField {...idUUID} onChange={onChange} defaultChecked={store.values[id] == true}/>}
            {inputType == "number" && <NumberField {...idUUID} onChange={onChange} onBlur={onBlur} defaultValue={store.values[id]}/>}
            {inputType == "select" && <SelectField {...idUUID} onChange={onChange} onBlur={onBlur} defaultValue={store.values[id]} options={field.children}/>}
            {inputType == "radiogroup" && <Radio.Group onChange={onChange} options={field.children} value={store.values[id]}>
                {/* {field.children.map((child: any, index: number)  => {
                    return <Radio key={""+index} value={child.value}>{child.label}</Radio>
                })} */}
                </Radio.Group>
            }
            {inputType == "checkboxgroup" && <Checkbox.Group onChange={onChange} options={field.children} value={store.values[id]}/>}
            {inputType == "textarea" && <Input.TextArea onChange={onChange} value={store.values[id]}></Input.TextArea>}

            {inputType == "daterange" && <DaterangeField {...idUUID}  dateFormat={field.format} onChange={onChange} defaultValue={store.values[id]}/>}
            {inputType == "datepicker" && <DatepickerField {...idUUID} mode="date" dateFormat={field.format} onChange={onChange} defaultValue={store.values[id]}/>}
            {inputType == "monthpicker" && <DatepickerField {...idUUID} mode="month" dateFormat={field.format} onChange={onChange} defaultValue={store.values[id]}/>}
            {inputType == "timepicker" && <DatepickerField {...idUUID} mode="time" dateFormat={field.format} onChange={onChange} defaultValue={store.values[id]}/>}
            {inputType == "yearpicker" && <DatepickerField {...idUUID} mode="year" dateFormat={field.format} onChange={onChange} defaultValue={store.values[id]}/>}

            {inputType == "rangepicker" && <DatePicker.RangePicker onChange={onChange} value={store.values[id]}/>}
            {inputType == 'rate' && <Rate onChange={onChange} value={store.values[id]}></Rate>}
            {inputType == 'slider' && <Slider onChange={onChange} value={store.values[id]}></Slider>}
            {inputType == "textblock" && <p>{field.value}</p>}
            </Form.Item>
    }
}
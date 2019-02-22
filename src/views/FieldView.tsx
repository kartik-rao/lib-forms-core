import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Rate, Select, Slider } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import Field from "../models/field";
import FormStore from "../state/FormStore";

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

        let onChange = (e) => {field.setValue(e.target.value)}
        let onBlur = (e) => {
            store.touched[field.id] = true;
            field.validate();
        }
        let {id, name, uuid} = field;
        // TODO Pass form layout to Field
        return !field.isDisabled && <Form.Item label={field.label}
            hasFeedback={store.touched[id] && !!store.errors[id]}
            validateStatus={store.errors[id] && "error"}
            help={store.errors[id]}>
            {
                (inputType == "input" && (type == "text" || type == "hidden")) && <Input
                    id={field.id}
                    data-uuid={field.uuid}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={store.values[id]}
                    onChange={onChange}
                    onBlur={onBlur}/>
            }
            {inputType == "checkbox" && <Checkbox onChange={onChange} checked={store.values[id] == true}/>}
            {inputType == "number" && <InputNumber onChange={onChange} onBlur={onBlur} value={store.values[id]}/>}
            {inputType == "select" && <Select onChange={onChange} onBlur={onBlur} value={store.values[id]}>
                {field.children.map((child: any, index: number) => {
                    return <Select.Option key={""+index} value={child.value}>{child.label}</Select.Option>
                })}
                </Select>
            }
            {inputType == "radiogroup" && <Radio.Group onChange={onChange} options={field.children} value={store.values[id]}>
                    {/* {field.children.map((child: any, index: number)  => {
                        return <Radio key={""+index} value={child.value}>{child.label}</Radio>
                    })} */}
                </Radio.Group>
            }
            {inputType == "checkboxgroup" && <Checkbox.Group onChange={onChange} options={field.children} value={store.values[id]}/>}
            {inputType == "textarea" && <Input.TextArea onChange={onChange} value={store.values[id]}></Input.TextArea>}
            {inputType == "datepicker" && <DatePicker onChange={onChange} value={store.values[id]}/>}
            {inputType == "monthpicker" && <DatePicker.MonthPicker onChange={onChange} value={store.values[id]}/>}
            {inputType == "rangepicker" && <DatePicker.RangePicker onChange={onChange} value={store.values[id]}/>}
            {inputType == "weekpicker" && <DatePicker.WeekPicker onChange={onChange} value={store.values[id]}/>}
            {inputType == 'rate' && <Rate onChange={onChange} value={store.values[id]}></Rate>}
            {inputType == 'slider' && <Slider onChange={onChange} value={store.values[id]}></Slider>}
            {inputType == "textblock" && <p>{field.value}</p>}
            </Form.Item>
    }
}
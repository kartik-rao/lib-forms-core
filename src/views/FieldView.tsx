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
        const {inputType} = field;

        let onChange = (e) => field.setValue(e.target.value)
        let onBlur = (e) => {
            store.touched[field.id] = true;
            field.validate();
        }

        // TODO Pass form layout to Field
        return !field.isHidden && <Form.Item label={field.label}
            hasFeedback={store.touched[name] && !!store.errors[name]}
            validateStatus={store.errors[name] && "error"}
            help={store.errors[name]}>
            {
                (inputType == "input" || inputType == "hidden") && <Input
                    type={field.inputType}
                    placeholder={field.placeholder}
                    value={store.values[name]}
                    onChange={onChange}
                    onBlur={onBlur}/>
            }
            {inputType == "checkbox" && <Checkbox onChange={onChange} checked={store.values[name] == true}/>}
            {inputType == "number" && <InputNumber onChange={onChange} onBlur={onBlur} value={store.values[name]}/>}
            {inputType == "select" && <Select onChange={onChange} onBlur={onBlur} value={store.values[name]}>
                {field.children.map((child: any, index: number) => {
                    return <Select.Option key={""+index} value={child.value}>{child.label}</Select.Option>
                })}
                </Select>
            }
            {inputType == "radiogroup" && <Radio.Group onChange={onChange} options={field.children} value={store.values[name]}>
                    {/* {field.children.map((child: any, index: number)  => {
                        return <Radio key={""+index} value={child.value}>{child.label}</Radio>
                    })} */}
                </Radio.Group>
            }
            {inputType == "checkboxgroup" && <Checkbox.Group onChange={onChange} options={field.children} value={store.values[name]}/>}
            {inputType == "textarea" && <Input.TextArea onChange={onChange} value={store.values[name]}></Input.TextArea>}
            {inputType == "datepicker" && <DatePicker onChange={onChange} value={store.values[name]}/>}
            {inputType == "monthpicker" && <DatePicker.MonthPicker onChange={onChange} value={store.values[name]}/>}
            {inputType == "rangepicker" && <DatePicker.RangePicker onChange={onChange} value={store.values[name]}/>}
            {inputType == "weekpicker" && <DatePicker.WeekPicker onChange={onChange} value={store.values[name]}/>}
            {inputType == 'rate' && <Rate onChange={onChange} value={store.values[name]}></Rate>}
            {inputType == 'slider' && <Slider onChange={onChange} value={store.values[name]}></Slider>}
            {inputType == "textblock" && <p>{field.value}</p>}
            </Form.Item>
    }
}
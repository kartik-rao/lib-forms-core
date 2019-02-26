import { observer } from "mobx-react";
import * as React from "react";
import { Form, Input, Select } from "antd";
import { IViewProps } from "../IViewProps";
import { IInputProps } from "../../../models/field.properties";
import Field from "../../../models/field";
var setNestedProperty = require('set-value');


@observer
export class InputViewProperties extends React.Component<IViewProps> {

    constructor(props: IViewProps) {
        super(props);
    }

    /*
        id: string;
        name: string;
        uuid?: string;
        type?: string;
        label?: string;
        value? : any;
        inputType : string;
        helpText? : string;
        placeholder?: string;
        valuePropName: string[];
        condition?: ICondition;
        storage?: IFieldStorage;
        validationRules?: any;
        componentProps: IComponentProps
    */


    render() {
        let field = this.props.field as Field;
        let component = field.componentProps as IInputProps;

        let setTextValue = (prop, value) => {
            console.log(`Set ${prop} ${value}`);
            setNestedProperty(this.props.field, prop, value);
            console.log(field.serialize);
        }


        return <Form layout="vertical">
            <Form.Item label="Label">
                <Input type="text" title="Label" placeholder="Enter label" value={field.label} onChange={(e) => {setTextValue('label', e.target.value)}}></Input>
            </Form.Item>
            <Form.Item label="Name">
                <Input type="text" title="Name" placeholder="Enter name" value={field.name} onChange={(e) => {setTextValue('name', e.target.value)}}></Input>
            </Form.Item>
            <Form.Item label="Default Value">
                <Input type="text" title="Default Value" placeholder="Enter default value" value={component.defaultValue} onChange={(e) => {setTextValue('componentProps.defaultValue', e.target.value);}}></Input>
            </Form.Item>
            <Form.Item label="Size">
                <Select defaultValue={component.size || 'default'} onChange={(e) => {setTextValue('componentProps.size', e)}}>
                    <Select.Option value={"default"}>default</Select.Option>
                    <Select.Option value={"small"}>small</Select.Option>
                    <Select.Option value={"large"}>large</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    }
}
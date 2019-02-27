import { observer } from "mobx-react";
import {toJS} from "mobx";
import * as React from "react";
import { Form, Button, Input, Select, Card, DatePicker, InputNumber } from "antd";
import { IViewProps } from "../IViewProps";
import { IInputProps } from "../../../models/field.properties";
import Field from "../../../models/field";
var setNestedProperty = require('set-value');
import moment from 'moment';

@observer
export class InputViewProperties extends React.Component<IViewProps, any> {

    constructor(props: IViewProps) {
        super(props);
        let fState = toJS(this.props.field);
        delete fState["store"];
        this.state = fState;
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
        valuePropName: string;
        condition?: ICondition;
        storage?: IFieldStorage;
        validationRules?: any;
        componentProps: IComponentProps
    */
    componentWillUpdate() {
        console.log("Component will update");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {field} = this.props;
        console.log(`mergeUpdating field with`, this.state);
        field["mergeUpdate"](this.state);
        // Handle conditions
        // Handle valudation rules
        // Handle Storage
    }

    render() {
        let field = this.props.field as Field;
        let component = field.componentProps as IInputProps;

        let setTextValue = (prop: string, value: any) => {
            console.log(`Set ${prop} ${value}`);

            let update: any;
            if(prop.indexOf("componentProps") > -1) {
                update = {componentProps: {...this.state.componentProps}};
            } else {
                update = {};
            }

            setNestedProperty(update, prop, value);
            this.setState(update);
            console.log(update, this.state);
        }

        console.log(field.inputType);

        return <Card title={`Field Properties - ${this.state.name} `}>
            <Form layout="vertical" onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Item label="Name" required>
                    <Input type="text" size="small" title="Name" placeholder="Enter name" value={this.state.name} onChange={(e) => {setTextValue('name', e.target.value)}}></Input>
                </Form.Item>
                <Form.Item label="Label">
                    <Input type="text" size="small" title="Label" placeholder="Enter label" value={this.state.label} onChange={(e) => {setTextValue('label', e.target.value)}}></Input>
                </Form.Item>
                <Form.Item label="Default Value">
                    { this.state.inputType == 'datepicker' && <DatePicker mode="date"
                        defaultValue={this.state.componentProps.defaultValue ? moment(this.state.componentProps.defaultValue, this.state.componentProps.dateFormat): null}
                        format={this.state.componentProps.dateFormat} onChange={(m) => setTextValue('componentProps.defaultValue', m.format(this.state.componentProps.dateFormat))}/> }
                    { this.state.inputType == 'number' && <InputNumber value={this.state.componentProps.defaultValue} onChange={(e) => {setTextValue('componentProps.defaultValue', e);}}/> }
                    { this.state.inputType !== 'datepicker' && this.state.inputType !== 'daterange' &&
                        <Input type="text" size="small" title="Default Value" placeholder="Enter default value" value={component.defaultValue} onChange={(e) => {setTextValue('componentProps.defaultValue', e.target.value);}}></Input>
                    }
                </Form.Item>

                { this.state.inputType ==  'daterange' &&
                    <div>
                        <Form.Item label="Range starts from"><DatePicker mode="date"
                            defaultValue={this.state.componentProps.startValue ? moment(this.state.componentProps.startValue, this.state.componentProps.dateFormat): null}
                            format={this.state.componentProps.dateFormat} onChange={(m) => setTextValue('componentProps.startValue', m.format(this.state.componentProps.dateFormat))}/></Form.Item>
                        <Form.Item label="Range ends at"><DatePicker mode="date"
                            defaultValue={this.state.componentProps.endValue ? moment(this.state.componentProps.endValue, this.state.componentProps.dateFormat): null}
                            format={this.state.componentProps.dateFormat} onChange={(m) => setTextValue('componentProps.endValue', m.format(this.state.componentProps.dateFormat))}/></Form.Item>
                    </div>
                }

                <Form.Item label="Size">
                    <Select  size="small" defaultValue={component.size || 'default'} onChange={(e) => {setTextValue('componentProps.size', e)}}>
                        <Select.Option value={"default"}>default</Select.Option>
                        <Select.Option value={"small"}>small</Select.Option>
                        <Select.Option value={"large"}>large</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Help Text">
                    <Input.TextArea title="Help Text" placeholder="Enter help text" value={this.state.helpText} onChange={(e) => {setTextValue('helpText', e.target.value)}}></Input.TextArea>
                </Form.Item>
                <Form.Item  label="Placeholder Text">
                    <Input type="text" size="small" title="Placeholder Text" placeholder="Enter placeholder text" value={this.state.placeholder} onChange={(e) => {setTextValue('placeholder', e.target.value)}}></Input>
                </Form.Item>
                    {this.state.inputType !== 'daterange' &&
                        <Form.Item required>
                            <Input type="text" size="small" title="Value property name" placeholder="Value property" value={this.state.valuePropName} onChange={(e) => {setTextValue('valuePropName', e.target.value)}}/>}
                        </Form.Item>
                    }
                    {this.state.inputType == 'daterange' &&
                        <div>
                        <Form.Item label="Start date property name" required>
                            <Input type="text" size="small" title="Start date value property" placeholder="start_date" value={this.state.componentProps["startValuePropsName"]}
                                onChange={(e) => {e.target.value && e.target.value.length > 0 && setTextValue('componentProps.startValuePropName', e.target.value)}} required/>
                        </Form.Item>
                        <Form.Item  label="End date property name"  required>
                            <Input type="text" title="End date value property" placeholder="end_date" value={this.state.componentProps["endValuePropsName"]}
                                onChange={(e) => {e.target.value && e.target.value.length > 0 && setTextValue('componentProps.endValuePropName', e.target.value)}} required/>
                        </Form.Item>
                        </div>
                    }
                <Form.Item><Button htmlType="submit" type="primary">Apply</Button></Form.Item>
            </Form>
        </Card>
    }
}
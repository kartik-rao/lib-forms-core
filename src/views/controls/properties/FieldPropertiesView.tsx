import { observer } from "mobx-react";
import {toJS} from "mobx";

import * as React from "react";
import { Form, Input, Select, Row, Col, Card, Button} from "antd";
import { IFieldEditorView } from "./IFieldEditorView"
import { IFieldProps } from "../../../models/field.properties";

@observer
export class FieldPropertiesView extends React.Component<IFieldEditorView, any> {

    isUpdated : boolean = false;

    constructor(props: IFieldEditorView) {
        super(props);
        this.state = toJS(this.props.editorStore.field);
    }

    setFieldProperty(key:string, value: any) {
        this.isUpdated = true;
        this.setState({[key] : value});
    }

    setComponentProperty(key: string, value: any) {
        this.isUpdated = true;
        this.setState({componentProps:{...this.state.componentProps, [key] : value}});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {field} = this.props.editorStore;
        field.mergeUpdate(this.state as IFieldProps);
        this.isUpdated = false;
        return
    }

    render() {
        let field = this.state;
        return <Row>
                <Col span={20} offset={2}>
                <Card title="Update Field Properties">
                <Form layout="horizontal" onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Item label="Name" style={{ marginBottom: 10 }} required>
                    <Input type="text" placeholder="Field name" value={field.name} onChange={(e) => this.setFieldProperty("name", e.target.value)}></Input>
                </Form.Item>
                <Form.Item label="Label" style={{ marginBottom: 10 }}>
                    <Input type="text" placeholder="Enter label" value={field.label} onChange={(e) => {this.setFieldProperty('label', e.target.value)}}></Input>
                </Form.Item>
                <Form.Item label="Placeholder Text" style={{ marginBottom: 10 }}>
                    <Input type="text" placeholder="Enter placeholder text" value={field.componentProps.placeholder} onChange={(e) => {this.setComponentProperty('placeholder', e.target.value)}}></Input>
                </Form.Item>
                {/* <Form.Item label="Default Value">
                    { field.inputType == 'datepicker' && <DatePicker mode="date"
                        defaultValue={component.defaultValue ? moment(component.defaultValue, component.dateFormat): null}
                        format={component.dateFormat} onChange={(m) => setTextValue('componentProps.defaultValue', m.format(component.dateFormat))}/> }
                    { field.inputType == 'number' && <InputNumber value={component.defaultValue} onChange={(e) => {setTextValue('componentProps.defaultValue', e);}}/> }
                    { field.inputType !== 'datepicker' && field.inputType !== 'daterange' &&
                        <Input type="text" title="Default Value" placeholder="Enter default value" value={component.defaultValue} onChange={(e) => {setTextValue('componentProps.defaultValue', e.target.value);}}></Input>
                    }
                </Form.Item>
                { field.inputType ==  'daterange' &&
                    <div>
                        <Form.Item label="Range starts from"><DatePicker mode="date"
                            defaultValue={component.startValue ? moment(component.startValue, component.dateFormat): null}
                            format={component.dateFormat} onChange={(m) => setTextValue('componentProps.startValue', m.format(component.dateFormat))}/></Form.Item>
                        <Form.Item label="Range ends at"><DatePicker mode="date"
                            defaultValue={component.endValue ? moment(component.endValue, component.dateFormat): null}
                            format={component.dateFormat} onChange={(m) => setTextValue('componentProps.endValue', m.format(component.dateFormat))}/></Form.Item>
                    </div>
                } */}
                {field.inputType.indexOf('checkbox') > 0 && <Form.Item label="Size">
                    <Select  value={field.componentProps.size || 'default'} onChange={(e) => {this.setComponentProperty('size', e)}}>
                        <Select.Option value={"default"}>default</Select.Option>
                        <Select.Option value={"small"}>small</Select.Option>
                        <Select.Option value={"large"}>large</Select.Option>
                    </Select>
                </Form.Item>}
                {field.inputType !== 'daterange' &&
                    <Form.Item label="Value property name" required>
                        <Input type="text" title="Value property name" placeholder="Value property" value={field.valuePropName} onChange={(e) => {this.setFieldProperty('valuePropName', e.target.value)}}/>
                    </Form.Item>
                }
                {field.inputType == 'daterange' &&
                    <div>
                    <Form.Item label="Start date property name" required>
                        <Input type="text" title="Start date value property" placeholder="start_date" value={field.componentProps["startValuePropsName"]}
                            onChange={(e) => {e.target.value && e.target.value.length > 0 && this.setComponentProperty('startValuePropName', e.target.value)}} required/>
                    </Form.Item>
                    <Form.Item  label="End date property name"  required>
                        <Input type="text" title="End date value property" placeholder="end_date" value={field.componentProps["endValuePropsName"]}
                            onChange={(e) => {e.target.value && e.target.value.length > 0 && this.setComponentProperty('endValuePropName', e.target.value)}} required/>
                    </Form.Item>
                    </div>
                }
                <Form.Item label="Help Text">
                    <Input.TextArea title="Help Text" placeholder="Enter help text" value={field.helpText} onChange={(e) => {this.setFieldProperty('helpText', e.target.value)}}></Input.TextArea>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={!this.isUpdated}>Apply</Button>
                </Form.Item>
            </Form>
            </Card>
        </Col>
    </Row>
    }
}
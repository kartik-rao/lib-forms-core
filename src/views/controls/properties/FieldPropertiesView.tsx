import { observer } from "mobx-react";
import * as React from "react";
import { Form, Input, Select } from "antd";
import { IFieldEditorView } from "./IFieldEditorView"

@observer
export class FieldPropertiesView extends React.Component<IFieldEditorView, any> {

    constructor(props: IFieldEditorView) {
        super(props);
    }

    componentWillUpdate() {
        console.log("Component will update");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {field} = this.props.editorStore;
        console.log(`mergeUpdating field with`, this.state);
        field["mergeUpdate"](this.state.field);
    }

    render() {
        let {setFieldProperty, setComponentProperty, field} = this.props.editorStore;
        let {componentProps} = field;

        return <Form layout="vertical" onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Item label="UUID" required>
                    <Input type="text" size="small" title="UUID" disabled value={field.uuid}></Input>
                </Form.Item>
                <Form.Item label="ID">
                    <Input type="text" size="small" title="Id" disabled value={field.id}></Input>
                </Form.Item>
                <Form.Item label="Name" required>
                    <Input type="text" size="small" title="Name" placeholder="Enter name" value={field.name} onChange={(e) => {setFieldProperty('name', e.target.value)}}></Input>
                </Form.Item>
                <Form.Item label="Label">
                    <Input type="text" size="small" title="Label" placeholder="Enter label" value={field.label} onChange={(e) => {setFieldProperty('label', e.target.value)}}></Input>
                </Form.Item>
                {/* <Form.Item label="Default Value">
                    { field.inputType == 'datepicker' && <DatePicker mode="date"
                        defaultValue={component.defaultValue ? moment(component.defaultValue, component.dateFormat): null}
                        format={component.dateFormat} onChange={(m) => setTextValue('componentProps.defaultValue', m.format(component.dateFormat))}/> }
                    { field.inputType == 'number' && <InputNumber value={component.defaultValue} onChange={(e) => {setTextValue('componentProps.defaultValue', e);}}/> }
                    { field.inputType !== 'datepicker' && field.inputType !== 'daterange' &&
                        <Input type="text" size="small" title="Default Value" placeholder="Enter default value" value={component.defaultValue} onChange={(e) => {setTextValue('componentProps.defaultValue', e.target.value);}}></Input>
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
                    <Select  size="small" value={componentProps["size"] || 'default'} onChange={(e) => {setComponentProperty('size', e)}}>
                        <Select.Option value={"default"}>default</Select.Option>
                        <Select.Option value={"small"}>small</Select.Option>
                        <Select.Option value={"large"}>large</Select.Option>
                    </Select>
                </Form.Item>}
                <Form.Item label="Help Text">
                    <Input.TextArea title="Help Text" placeholder="Enter help text" value={field.helpText} onChange={(e) => {setFieldProperty('helpText', e.target.value)}}></Input.TextArea>
                </Form.Item>
                <Form.Item  label="Placeholder Text">
                    <Input type="text" size="small" title="Placeholder Text" placeholder="Enter placeholder text" value={componentProps["placeholder"]} onChange={(e) => {setComponentProperty('placeholder', e.target.value)}}></Input>
                </Form.Item>
                    {field.inputType !== 'daterange' &&
                        <Form.Item label="Value property name" required>
                            <Input type="text" size="small" title="Value property name" placeholder="Value property" value={field.valuePropName} onChange={(e) => {setFieldProperty('valuePropName', e.target.value)}}/>
                        </Form.Item>
                    }
                    {field.inputType == 'daterange' &&
                        <div>
                        <Form.Item label="Start date property name" required>
                            <Input type="text" size="small" title="Start date value property" placeholder="start_date" value={componentProps["startValuePropsName"]}
                                onChange={(e) => {e.target.value && e.target.value.length > 0 && setComponentProperty('startValuePropName', e.target.value)}} required/>
                        </Form.Item>
                        <Form.Item  label="End date property name"  required>
                            <Input type="text" title="End date value property" placeholder="end_date" value={componentProps["endValuePropsName"]}
                                onChange={(e) => {e.target.value && e.target.value.length > 0 && setComponentProperty('endValuePropName', e.target.value)}} required/>
                        </Form.Item>
                        </div>
                    }
            </Form>
    }
}
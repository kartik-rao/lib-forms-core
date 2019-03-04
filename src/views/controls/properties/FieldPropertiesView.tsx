import { observer } from "mobx-react";
import {toJS} from "mobx";
import * as React from "react";
import { Form, Input, Select,  Button, DatePicker, InputNumber} from "antd";
import { IFieldEditorView } from "./IFieldEditorView"
import { IFieldProps } from "../../../models/field.properties";
import { FormComponentProps } from "antd/lib/form";


@observer
class FieldPropertiesView extends React.Component<FormComponentProps&IFieldEditorView, any> {
    constructor(props: FormComponentProps&IFieldEditorView) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {field} = this.props.editorStore;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let merge = {componentProps: {}};
                Object.keys(values).forEach((p: string) => {
                    if(p.indexOf("c_") == 0) {
                        merge.componentProps[p.replace("c_","")] = values[p]
                    } else  {
                        merge[p] = values[p];
                    }
                });
                field.mergeUpdate(merge);
            }
        });
        return;
    }

    render() {
        let field = toJS(this.props.editorStore.field) as IFieldProps;
        let formLayoutProps = {
            labelcol: {span: 8, offset: 2},
            wrappercol: {span: 8, offset: 2}
        };
        let {getFieldDecorator, getFieldValue} = this.props.form;

        return  <Form {...formLayoutProps} onSubmit={(e) => this.handleSubmit(e)}>
            {/* GENERAL PROPERTIES */}
            <Form.Item label="Name" required>
                {
                    getFieldDecorator('name', {
                        initialValue : field.name, rules: [
                            {type: "string"},
                            {required: true, message: "A name is required"}]
                        })(<Input/>)
                }
            </Form.Item>
            <Form.Item label="Label" required>
                {
                    getFieldDecorator('label', {
                        initialValue : field.label, rules: [
                            {type: "string"},
                            {required: true, message: "A label is required"}]
                        })(<Input/>)
                }
            </Form.Item>

            {field.inputType !== 'checkbox' && <Form.Item label="Placeholder Text">
                {
                    getFieldDecorator('c_placeholder', { initialValue : field.componentProps["placeholder"],
                        rules: [
                            {type: "string"}
                    ]})(<Input/>)
                }
            </Form.Item>}
            {/* DatePicker and DateRange Properties */}
            {field.inputType.indexOf('date') == 0 && <Form.Item label="Date Format" required>
                {
                    getFieldDecorator('c_dateFormat', {
                        initialValue: field.componentProps["dateFormat"],
                        rules: [{required: true, message: "A date format is required"}]
                    }) (<Select>
                        <Select.Option key="dd-mm-yyyy" value="DD-MM-YYYY">DD-MM-YYYY</Select.Option>
                        <Select.Option key="mm-dd-yyyy" value="MM-DD-YYYY">MM-DD-YYYY</Select.Option>
                        <Select.Option key="yyyy-mm-dd" value="YYYY-MM-DD">YYYY-MM-DD</Select.Option>
                        <Select.Option key="dd/mm/yyyy" value="DD/MM/YYYY">DD/MM/YYYY</Select.Option>
                        <Select.Option key="mm/dd/yyyy" value="MM/DD/YYYY">MM/DD/YYYY</Select.Option>
                        <Select.Option key="yyyy/mm/dd" value="YYYY/MM/DD">YYYY/MM/DD</Select.Option>
                    </Select>)
                }  </Form.Item>
            }
            {
                field.inputType == 'daterange' && <div>
                    <Form.Item label="Default start date">
                    {
                        getFieldDecorator('c_defaultStartValue', {
                            initialValue: field.componentProps["defaultStartValue"]
                        })(<DatePicker format={getFieldValue('c_dateFormat')}/>)
                    }
                    </Form.Item>
                    <Form.Item label="Default end date">
                    {
                        getFieldDecorator('c_defaultEndValue', {
                            initialValue: field.componentProps["defaultEndValue"]
                        })(<DatePicker format={getFieldValue('c_dateFormat')}/>)
                    }
                    </Form.Item>
                    <Form.Item label="Start date property name">
                    {
                        getFieldDecorator('c_startValuePropsName', {
                            initialValue: field.componentProps["startValuePropsName"],
                            rules: [ {pattern: /^[aA-zZ][\w|_|0-9]+/, message: "Must be valid property name"}]
                        })(<Input/>)
                    }
                    </Form.Item>
                    <Form.Item label="End date property name">
                    {
                        getFieldDecorator('c_endValuePropsName', {
                            initialValue: field.componentProps["endValuePropsName"],
                            rules: [ {pattern: /^[aA-zZ][\w|_|0-9]+/, message: "Must be valid property name"}]
                        })(<Input/>)
                    }
                    </Form.Item>
                </div>
            }
            { field.inputType == 'number' && <Form.Item label="Default value">
                {
                    getFieldDecorator("c_defaultValue", {
                        initialValue: field.componentProps['defaultValue'],
                        rules: [{type: 'number'}]
                    })(<InputNumber/>)
                }
            </Form.Item>
            }
            { field.inputType !== 'number' && field.inputType !== 'datepicker' && field.inputType !== 'daterange' &&
                <Form.Item label="Default Value">
                    {
                        getFieldDecorator("c_defaultValue", {
                            initialValue: field.componentProps['defaultValue'],
                            rules: [{type: 'string'}]
                        })(<Input/>)
                    }
                </Form.Item>
            }
            {field.inputType.indexOf('checkbox') > 0 && <Form.Item label="Size">
                {
                    getFieldDecorator("c_size", {
                        initialValue: field.componentProps['size'],
                        rules: [{type: 'string'}]
                    })(<Select>
                        <Select.Option value={"default"}>default</Select.Option>
                        <Select.Option value={"small"}>small</Select.Option>
                        <Select.Option value={"large"}>large</Select.Option>
                    </Select>)
                }
                </Form.Item>
            }
            {field.inputType !== 'daterange' &&
                <Form.Item label="Value property name" required>
                    {
                        getFieldDecorator("valuePropName", {
                            initialValue: field.valuePropName,
                            rules: [
                                {type: 'string'},
                                {required: true, message: 'A value property name is required'},
                                {pattern: /^[aA-zZ][aA-zZ|_|0-9]+/, message: 'Can only use a-z, underscore and numbers'},
                            ]
                        })(<Input />)
                    }
                </Form.Item>
            }
            <Form.Item label="Help Text">
                {
                    getFieldDecorator("helpText", {
                        initialValue: field.helpText,
                        rules: [{type: 'string'}]
                    })(<Input.TextArea />)
                }
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Apply</Button>
            </Form.Item>
    </Form>
    }
}

const WrappedFieldPropertiesView = Form.create({ name: 'FieldPropertiesView' })(FieldPropertiesView);
export default WrappedFieldPropertiesView;
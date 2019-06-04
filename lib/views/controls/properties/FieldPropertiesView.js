var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observer } from "mobx-react";
import { toJS, action } from "mobx";
import * as React from "react";
import { Form, Input, Select, Button, DatePicker, InputNumber } from "antd";
import { ChoiceOptionEditorView } from "./partials/ChoiceOptionEditorView";
let FieldPropertiesView = class FieldPropertiesView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { field } = this.props.editorStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    let merge = { componentProps: {} };
                    Object.keys(values).forEach((p) => {
                        if (p.indexOf("c_") == 0) {
                            merge.componentProps[p.replace("c_", "")] = values[p];
                        }
                        else {
                            merge[p] = values[p];
                        }
                    });
                    field.mergeUpdate(merge);
                }
            });
            return;
        };
    }
    updateOptions(options) {
        this.props.editorStore.field.componentProps["options"] = options;
    }
    render() {
        let field = toJS(this.props.editorStore.field);
        let formLayoutProps = {
            labelcol: { span: 8, offset: 2 },
            wrappercol: { span: 8, offset: 2 }
        };
        let { getFieldDecorator, getFieldValue } = this.props.form;
        return React.createElement(Form, Object.assign({}, formLayoutProps, { onSubmit: (e) => this.handleSubmit(e) }),
            React.createElement(Form.Item, { label: "Name", required: true }, getFieldDecorator('name', {
                initialValue: field.name, rules: [
                    { type: "string" },
                    { required: true, message: "A name is required" }
                ]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { label: "Label", required: true }, getFieldDecorator('label', {
                initialValue: field.label, rules: [
                    { type: "string" },
                    { required: true, message: "A label is required" }
                ]
            })(React.createElement(Input, null))),
            field.inputType != 'checkbox' && React.createElement(Form.Item, { label: "Placeholder Text" }, getFieldDecorator('c_placeholder', { initialValue: field.componentProps["placeholder"],
                rules: [
                    { type: "string" }
                ] })(React.createElement(Input, null))),
            field.inputType.indexOf('date') == 0 && React.createElement(Form.Item, { label: "Date Format", required: true },
                getFieldDecorator('c_dateFormat', {
                    initialValue: field.componentProps["dateFormat"],
                    rules: [{ required: true, message: "A date format is required" }]
                })(React.createElement(Select, null,
                    React.createElement(Select.Option, { key: "dd-mm-yyyy", value: "DD-MM-YYYY" }, "DD-MM-YYYY"),
                    React.createElement(Select.Option, { key: "mm-dd-yyyy", value: "MM-DD-YYYY" }, "MM-DD-YYYY"),
                    React.createElement(Select.Option, { key: "yyyy-mm-dd", value: "YYYY-MM-DD" }, "YYYY-MM-DD"),
                    React.createElement(Select.Option, { key: "dd/mm/yyyy", value: "DD/MM/YYYY" }, "DD/MM/YYYY"),
                    React.createElement(Select.Option, { key: "mm/dd/yyyy", value: "MM/DD/YYYY" }, "MM/DD/YYYY"),
                    React.createElement(Select.Option, { key: "yyyy/mm/dd", value: "YYYY/MM/DD" }, "YYYY/MM/DD"))),
                "  "),
            field.inputType == 'daterange' && React.createElement("div", null,
                React.createElement(Form.Item, { label: "Default start date" }, getFieldDecorator('c_defaultStartValue', {
                    initialValue: field.componentProps["defaultStartValue"]
                })(React.createElement(DatePicker, { format: getFieldValue('c_dateFormat') }))),
                React.createElement(Form.Item, { label: "Default end date" }, getFieldDecorator('c_defaultEndValue', {
                    initialValue: field.componentProps["defaultEndValue"]
                })(React.createElement(DatePicker, { format: getFieldValue('c_dateFormat') }))),
                React.createElement(Form.Item, { label: "Start date property name" }, getFieldDecorator('c_startValuePropsName', {
                    initialValue: field.componentProps["startValuePropsName"],
                    rules: [{ pattern: /^[aA-zZ][\w|_|0-9]+/, message: "Must be valid property name" }]
                })(React.createElement(Input, null))),
                React.createElement(Form.Item, { label: "End date property name" }, getFieldDecorator('c_endValuePropsName', {
                    initialValue: field.componentProps["endValuePropsName"],
                    rules: [{ pattern: /^[aA-zZ][\w|_|0-9]+/, message: "Must be valid property name" }]
                })(React.createElement(Input, null)))),
            field.inputType == 'number' && React.createElement(Form.Item, { label: "Default value" }, getFieldDecorator("c_defaultValue", {
                initialValue: field.componentProps['defaultValue'],
                rules: [{ type: 'number' }]
            })(React.createElement(InputNumber, null))),
            field.inputType !== 'number' && field.inputType !== 'datepicker' && field.inputType !== 'daterange' &&
                React.createElement(Form.Item, { label: "Default Value" }, getFieldDecorator("c_defaultValue", {
                    initialValue: field.componentProps['defaultValue'],
                    rules: [{ type: 'string' }]
                })(React.createElement(Input, null))),
            field.inputType.indexOf('checkbox') > 0 && React.createElement(Form.Item, { label: "Size" }, getFieldDecorator("c_size", {
                initialValue: field.componentProps['size'],
                rules: [{ type: 'string' }]
            })(React.createElement(Select, null,
                React.createElement(Select.Option, { value: "default" }, "default"),
                React.createElement(Select.Option, { value: "small" }, "small"),
                React.createElement(Select.Option, { value: "large" }, "large")))),
            field.inputType !== 'daterange' &&
                React.createElement(Form.Item, { label: "Value property name", required: true }, getFieldDecorator("valuePropName", {
                    initialValue: field.fieldOptions.valuePropName,
                    rules: [
                        { type: 'string' },
                        { required: true, message: 'A value property name is required' },
                        { pattern: /^[aA-zZ][aA-zZ|_|0-9]+/, message: 'Can only use a-z, underscore and numbers' },
                    ]
                })(React.createElement(Input, null))),
            field.inputType == 'select' && React.createElement(ChoiceOptionEditorView, { type: "select", items: field.componentProps.options, onChange: this.updateOptions }),
            React.createElement(Form.Item, { label: "Help Text" }, getFieldDecorator("helpText", {
                initialValue: field.helpText,
                rules: [{ type: 'string' }]
            })(React.createElement(Input.TextArea, null))),
            React.createElement(Form.Item, null,
                React.createElement(Button, { type: "primary", htmlType: "submit" }, "Apply")));
    }
};
__decorate([
    action.bound
], FieldPropertiesView.prototype, "updateOptions", null);
FieldPropertiesView = __decorate([
    observer
], FieldPropertiesView);
const WrappedFieldPropertiesView = Form.create({ name: 'FieldPropertiesView' })(FieldPropertiesView);
export default WrappedFieldPropertiesView;

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Card, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Select } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ValidationRuleNames } from "../../../models/validation";
import { ValidationListView } from "./partials/ValidationListView";
let ValidationView = class ValidationView extends React.Component {
    constructor(props) {
        super(props);
        this.dateFormat = "YYYY-MM-DD";
        this.applyRule = () => {
            console.log(`Apply Rule`, this.state);
            if (this.state.isEditing == true) {
                this.props.editorStore.updateValidationRule(this.state.ruleType, this.state.properties);
            }
            else {
                this.props.editorStore.addValidationRule(this.state.ruleType, this.state.properties);
            }
            this.setState({ rule: null, properties: {}, isEditing: false });
        };
        this.onEdit = (rule) => {
            this.setState({ isEditing: true, ruleType: rule, properties: this.props.editorStore.field.validator.rule[rule] });
        };
        this.state = {
            ruleType: null,
            properties: {},
            isValid: false,
            isEditing: false
        };
    }
    setRuleType(type) {
        this.setState({ ruleType: type });
    }
    setRuleProperty(name, value) {
        this.setState({ properties: Object.assign({}, this.state.properties, { [name]: value }) });
    }
    isRuleValid() {
        let { ruleType, properties } = this.state;
        if (!ruleType) {
            return false;
        }
        let isValid = false;
        switch (this.state.ruleType) {
            case "datetime": {
                isValid = properties['latest'] || properties['latest'];
                break;
            }
            case "date": {
                isValid = properties['latest'] || properties['latest'];
                break;
            }
            case "equality": {
                isValid = !!properties['attribute'];
                break;
            }
            case "exclusion": {
                isValid = !!properties['within'];
                break;
            }
            case "inclusion": {
                isValid = !!properties['within'];
                break;
            }
            case "format": {
                isValid = !!properties['pattern'];
                break;
            }
            case "length": {
                isValid = (!properties['minimum'] && !properties['maximum'] && properties['is']) || ((properties['minimum'] || properties['maximum']) && !properties['is']);
                break;
            }
            case "numericality": {
                if (properties['is']) {
                    isValid = properties['strict'] ? Object.keys(properties).length == 2 : false;
                }
                else {
                    isValid = Object.keys(properties).length > 0;
                }
                break;
            }
            case "presence": {
                isValid = !!properties['presence'];
                break;
            }
            case "url": {
                isValid = !!properties['url'];
                break;
            }
            default: {
                isValid = false;
            }
        }
        return isValid;
    }
    render() {
        let { editorStore } = this.props;
        let { field } = editorStore;
        let { fieldMeta } = editorStore.formStore;
        let fieldList = [];
        Object.keys(toJS(fieldMeta)).map((id) => {
            fieldList.push(fieldMeta[id]);
        });
        return React.createElement("div", null,
            React.createElement(ValidationListView, { validation: field.validator.rule, onEdit: this.onEdit, onRemove: editorStore.removeValidationRule }),
            React.createElement(Divider, null),
            React.createElement(Card, { title: `${this.state.isEditing == true ? "Edit" : "Add"} Validation Rule${this.state.ruleType ? ' - ' + this.state.ruleType : ''}` },
                React.createElement(Form, null,
                    React.createElement(Form.Item, { label: "Rule" },
                        React.createElement(Select, { onChange: (e) => this.setRuleType(e), style: { width: 200 }, placeholder: "Select a rule to apply", value: this.state.ruleType }, ValidationRuleNames.map((rule) => {
                            return React.createElement(Select.Option, { disabled: !!field.validator.rule[rule.value], key: rule.key, value: rule.value }, rule.label);
                        }))),
                    React.createElement(Divider, null),
                    React.createElement(Form.Item, { label: "Validation Message", help: "Default validation failure message" },
                        React.createElement(Input, { type: "text", value: this.state.properties.message, onChange: (e) => this.setRuleProperty('message', e.target.value) })),
                    React.createElement(Divider, null),
                    this.state.ruleType && this.state.ruleType.indexOf('date') > -1 && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Not before", help: "Entered date cannot be before this date", required: !this.state.properties['latest'] },
                            React.createElement(DatePicker, { value: this.state.properties.earliest, onChange: (e) => {
                                    e ? this.setRuleProperty('earliest', e.format(this.dateFormat)) : this.setRuleProperty('earliest', undefined);
                                } })),
                        this.state.properties.earliest && React.createElement(Form.Item, { label: "Message - Not Before", help: "Shown when 'Not Before' validation fails (optional)" },
                            React.createElement(Input, { value: this.state.properties.tooEarly, type: "text", onChange: (e) => this.setRuleProperty('tooEarly', e.target.value) })),
                        React.createElement(Divider, null),
                        React.createElement(Form.Item, { label: "Constraint - Not after", help: "Entered date cannot be after this date", required: !this.state.properties['earliest'] },
                            React.createElement(DatePicker, { value: this.state.properties.latest, onChange: (e) => {
                                    e ? this.setRuleProperty('latest', e.format(this.dateFormat)) : this.setRuleProperty('latest', undefined);
                                } })),
                        this.state.properties.latest && React.createElement(Form.Item, { label: "Message - Not After", help: "Shown when 'Not After' validation fails (optional)" },
                            React.createElement(Input, { value: this.state.properties.tooLate, type: "text", onChange: (e) => this.setRuleProperty('tooLate', e.target.value) }))),
                    this.state.ruleType == 'equality' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Matches", help: "Value should match field", required: true },
                            React.createElement(Select, { value: this.state.properties.attribute, placeholder: "Select a field", onChange: (e) => { this.setRuleProperty('attribute', e); }, style: { width: 200 } }, fieldList.map((f) => {
                                return React.createElement(Select.Option, { key: f.id, value: f.id, disabled: f.id == field.id },
                                    f.name,
                                    " - (",
                                    f.type || f.inputType,
                                    ")");
                            })))),
                    this.state.ruleType == 'exclusion' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Not Within", help: "Value should not be one of (comma separated list)", required: true },
                            React.createElement(Input, { type: "text", value: this.state.properties.within, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null);
                                } }))),
                    this.state.ruleType == 'inclusion' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Within", help: "Value must be one of (comma separated list)", required: true },
                            React.createElement(Input, { type: "text", value: this.state.properties.within, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null);
                                } }))),
                    this.state.ruleType == 'format' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Regular Expression", help: "Value must match regular expression", required: true },
                            React.createElement(Input, { type: "text", value: this.state.properties.pattern, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('pattern', e.target.value) : this.setRuleProperty('pattern', "/*/");
                                } })),
                        React.createElement(Form.Item, { label: "Option - Flags", help: "Regular expression flags - i|g|m", required: true },
                            React.createElement(Input, { type: "text", value: this.state.properties.flags, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('flags', e.target.value) : this.setRuleProperty('flags', "i");
                                } }))),
                    this.state.ruleType == 'length' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Exactly", help: "Value length must be exactly" },
                            React.createElement(InputNumber, { type: "text", value: this.state.properties.is, onChange: (e) => {
                                    if (e != null) {
                                        this.setRuleProperty('maximum', null);
                                        this.setRuleProperty('minimum', null);
                                        this.setRuleProperty('is', e);
                                        console.log(this.state);
                                    }
                                } })),
                        this.state.properties['is'] && React.createElement(Form.Item, { label: "Message - Exactly", help: "Shown when 'Exactly' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.state.properties.wrongLength, onChange: (e) => this.setRuleProperty('wrongLength', e.target.value) })),
                        React.createElement(Divider, null),
                        React.createElement(Form.Item, { label: "Constraint - Minimum", help: "Value length must be at least" },
                            React.createElement(InputNumber, { type: "text", value: this.state.properties.minimum, disabled: !!this.state.properties['is'], onChange: (e) => {
                                    e != null ? this.setRuleProperty('minimum', e) : this.setRuleProperty('minimum', -1);
                                } })),
                        this.state.properties['minimum'] && React.createElement(Form.Item, { label: "Message - Minimum", help: "Shown when 'Minimum' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.state.properties.tooShort, onChange: (e) => this.setRuleProperty('tooShort', e.target.value) })),
                        React.createElement(Divider, null),
                        React.createElement(Form.Item, { label: "Constraint - Maximum", help: "Value length must be at most" },
                            React.createElement(InputNumber, { type: "text", value: this.state.properties.maximum, disabled: !!this.state.properties['is'], onChange: (e) => {
                                    e != null ? this.setRuleProperty('maximum', e) : this.setRuleProperty('maximum', null);
                                } })),
                        this.state.properties['maximum'] && React.createElement(Form.Item, { label: "Message - Maximum", help: "Shown when 'Maximum' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.state.properties.tooLong, onChange: (e) => this.setRuleProperty('tooLong', e.target.value) }))),
                    this.state.ruleType == 'numericality' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Integer", help: "Value must be an integer" },
                            React.createElement(Checkbox, { checked: this.state.properties.integerOnly, onChange: (e) => { this.setRuleProperty('integerOnly', e.target.value); } })),
                        React.createElement(Form.Item, { label: "Constraint - Greater Than", help: "Value must be greater than" },
                            React.createElement(InputNumber, { value: this.state.properties.greaterThan, onChange: (e) => { this.setRuleProperty("greaterThan", e); } })),
                        this.state.properties['greaterThan'] && React.createElement(Form.Item, { label: "Message - Greater than", help: "Shown when 'Greater Than' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.state.properties.notGreaterThan, onChange: (e) => this.setRuleProperty('notGreaterThan', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Greater Than Equal To", help: "Value must be greater than or equal to" },
                            React.createElement(InputNumber, { value: this.state.properties.greaterThanOrEqualTo, onChange: (e) => { this.setRuleProperty("greaterThanOrEqualTo", e); } })),
                        this.state.properties['greaterThanOrEqualTo'] && React.createElement(Form.Item, { label: "Message - Greater than or equal to", help: "Shown when 'Exactly' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.state.properties.notGreaterThanOrEqualTo, onChange: (e) => this.setRuleProperty('notGreaterThanOrEqualTo', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Equal To", help: "Value must be exactly" },
                            React.createElement(InputNumber, { value: this.state.properties.equalTo, disabled: this.state.properties.greaterThanOrEqualTo || this.state.properties.lesserThanOrEqualTo || this.state.properties.greaterThan || this.state.properties.lesserThanThan, onChange: (e) => { this.setRuleProperty("equalTo", e); } })),
                        this.state.properties['equalTo'] && React.createElement(Form.Item, { label: "Message - Equal to", help: "Shown when 'Equal to' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.state.properties.notEqualTo, onChange: (e) => this.setRuleProperty('notEqualTo', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Less Than", help: "Value must be less than" },
                            React.createElement(InputNumber, { disabled: this.state.properties.equalTo, value: this.state.properties.lessThan, onChange: (e) => { this.setRuleProperty("lessThan", e); } })),
                        this.state.properties['lessThan'] && React.createElement(Form.Item, { label: "Message - Less than", help: "Shown when 'Less than' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.state.properties.notLessThan, onChange: (e) => this.setRuleProperty('notLessThan', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Less Than Equal To", help: "Value must be less than or equal to" },
                            React.createElement(InputNumber, { disabled: this.state.properties.equalTo, value: this.state.properties.lessThanOrEqualTo, onChange: (e) => { this.setRuleProperty("lessThanOrEqualTo", e); } })),
                        this.state.properties['lessThanOrEqualTo'] && React.createElement(Form.Item, { label: "Message - Less than or equal to", help: "Shown when 'Less than or equal to' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.state.properties.notLessThanOrEqualTo, onChange: (e) => this.setRuleProperty('notLessThanOrEqualTo', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Divisible By", help: "Value must be divisible by" },
                            React.createElement(InputNumber, { min: 2, value: this.state.properties.divisibleBy, disabled: this.state.properties.equalTo, onChange: (e) => { this.setRuleProperty("divisibleBy", e); } })),
                        this.state.properties['divisibleBy'] && React.createElement(Form.Item, { label: "Message - Not Divisible By", help: "Shown when 'Not Divisible By' validation fails (optional)" },
                            React.createElement(Input, { type: "text", onChange: (e) => this.setRuleProperty('notDivisibleBy', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Odd", help: "Value must be odd" },
                            React.createElement(Checkbox, { checked: this.state.properties.odd, onChange: (e) => { this.setRuleProperty('odd', e.target.value); } })),
                        this.state.properties['odd'] && React.createElement(Form.Item, { label: "Message - Not Odd", help: "Shown when 'Not Odd' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.state.properties.notOdd, onChange: (e) => this.setRuleProperty('notOdd', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Even", help: "Value must be even" },
                            React.createElement(Checkbox, { checked: this.state.properties.even, onChange: (e) => { this.setRuleProperty('even', e.target.value); } })),
                        this.state.properties['even'] && React.createElement(Form.Item, { label: "Message - Not Even", help: "Shown when 'Not Even' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.state.properties.notEven, onChange: (e) => this.setRuleProperty('notEven', e.target.value) }))),
                    React.createElement(Form.Item, null,
                        React.createElement(Button, { type: "primary", htmlType: "submit", disabled: !this.isRuleValid(), onClick: this.applyRule }, this.state.isEditing == true ? "Apply" : "Add")))));
    }
};
ValidationView = __decorate([
    observer
], ValidationView);
export { ValidationView };

import { Button, Card, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import Field from "../../../models/field";
import { ValidationRuleNames } from "../../../models/validation";
import { IFieldEditorView } from "./IFieldEditorView";
import { ValidationListView } from "./partials/ValidationListView";

@observer
export class ValidationView extends React.Component<IFieldEditorView,any> {
    readonly dateFormat : string = "YYYY-MM-DD"
    constructor(props:any) {
        super(props);
        this.state = {
            ruleType : null,
            properties: {},
            isValid: false,
            isEditing: false
        }
    }

    setRuleType(type) {
        this.setState({ruleType: type});
    }

    setRuleProperty(name: string, value: any) {
        this.setState({properties: {...this.state.properties, [name]: value}});
    }

    isRuleValid() {
        let {ruleType, properties} = this.state;
        if(!ruleType) {
            return false;
        }
        let isValid = false;
        switch(this.state.ruleType) {
            case "datetime" :{
                isValid = properties['latest'] || properties['latest'];
                break;
            }
            case "date" :{
                isValid = properties['latest'] || properties['latest'];
                break;
            }
            case "equality":{
                isValid = !!properties['attribute'];
                break;
            }
            case "exclusion": {
                isValid = !!properties['within'];
                break;
            }
            case "inclusion":{
                isValid = !!properties['within'];
                break;
            }
            case "format":{
                isValid = !!properties['pattern'];
                break;
            }
            case "length":{
                isValid = (!properties['minimum'] && !properties['maximum'] && properties['is']) || ((properties['minimum'] || properties['maximum']) && !properties['is']);
                break;
            }
            case "numericality": {
                if(properties['is']) {
                    isValid = properties['strict'] ? Object.keys(properties).length == 2 : false;
                } else {
                    isValid = Object.keys(properties).length > 0;
                }
                break;
            }
            case "presence": {
                isValid = !!properties['presence'];
                break;
            }
            case "url":{
                isValid = !!properties['url'];
                break;
            }
            default:{
                isValid = false;
            }
        }
        return isValid;
    }

    applyRule = () => {
        console.log(`Apply Rule`, this.state);
        if (this.state.isEditing == true) {
            this.props.editorStore.updateValidationRule(this.state.ruleType, this.state.properties);
        } else {
            this.props.editorStore.addValidationRule(this.state.ruleType, this.state.properties);
        }
        this.setState({rule: null, properties: {}, isEditing: false});
    }

    onEdit = (rule: string) => {
        this.setState({isEditing: true, ruleType: rule, properties: this.props.editorStore.field.validator.rule[rule]})
    }

    render() {
        let {editorStore} = this.props;
        let {field} = editorStore;
        let {fieldMeta} = editorStore.formStore;
        let fieldList = [];

        Object.keys(toJS(fieldMeta)).map((id: string)=> {
            fieldList.push(fieldMeta[id]);
        });

        return <div><ValidationListView validation={field.validator.rule} onEdit={this.onEdit} onRemove={editorStore.removeValidationRule}/>
            <Divider/>
            <Card title={`${this.state.isEditing == true ? "Edit" : "Add"} Validation Rule${this.state.ruleType ? ' - ' + this.state.ruleType: ''}`}>
            <Form>
                <Form.Item label="Rule">
                    <Select onChange={(e) => this.setRuleType(e)} style={{ width: 200 }} placeholder="Select a rule to apply" value={this.state.ruleType}>
                        {ValidationRuleNames.map((rule: any) => {
                            return <Select.Option disabled={!!field.validator.rule[rule.value]} key={rule.key} value={rule.value}>{rule.label}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Divider/>
                <Form.Item label="Validation Message" help="Default validation failure message">
                    <Input type="text"  value={this.state.properties.message} onChange={(e) => this.setRuleProperty('message', e.target.value)}></Input>
                </Form.Item>
                <Divider/>
                { this.state.ruleType && this.state.ruleType.indexOf('date') > -1  && <div>
                    <Form.Item label="Constraint - Not before" help="Entered date cannot be before this date" required={!this.state.properties['latest']} >
                        <DatePicker  value={this.state.properties.earliest} onChange={(e) => {
                            e ? this.setRuleProperty('earliest', e.format(this.dateFormat)) : this.setRuleProperty('earliest', undefined)
                        }}>
                        </DatePicker>
                    </Form.Item>
                    {this.state.properties.earliest && <Form.Item label="Message - Not Before" help="Shown when 'Not Before' validation fails (optional)" >
                        <Input value={this.state.properties.tooEarly} type="text" onChange={(e) => this.setRuleProperty('tooEarly', e.target.value)}></Input>
                    </Form.Item>}
                    <Divider/>
                    <Form.Item label="Constraint - Not after" help="Entered date cannot be after this date" required={!this.state.properties['earliest']}>
                        <DatePicker  value={this.state.properties.latest} onChange={(e) => {
                            e ? this.setRuleProperty('latest', e.format(this.dateFormat)) : this.setRuleProperty('latest', undefined)
                        }}>
                        </DatePicker>
                    </Form.Item>
                    {this.state.properties.latest && <Form.Item label="Message - Not After" help="Shown when 'Not After' validation fails (optional)">
                        <Input value={this.state.properties.tooLate} type="text" onChange={(e) => this.setRuleProperty('tooLate', e.target.value)}></Input>
                    </Form.Item>}
                </div>}
                { this.state.ruleType == 'equality' && <div>
                    <Form.Item label="Constraint - Matches" help="Value should match field" required>
                        <Select value={this.state.properties.attribute} placeholder="Select a field" onChange={(e) => { this.setRuleProperty('attribute', e);}} style={{width: 200}}>
                            {fieldList.map((f: Field)=> {
                                return <Select.Option key={f.id} value={f.id} disabled={f.id==field.id}>{f.name} - ({f.type||f.inputType})</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </div> }
                { this.state.ruleType == 'exclusion' && <div>
                    <Form.Item label="Constraint - Not Within" help="Value should not be one of (comma separated list)" required>
                       <Input type="text" value={this.state.properties.within} onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null )
                        }}>
                       </Input>
                    </Form.Item>
                </div> }
                { this.state.ruleType == 'inclusion' && <div>
                    <Form.Item label="Constraint - Within" help="Value must be one of (comma separated list)" required>
                       <Input type="text" value={this.state.properties.within} onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null )
                        }}>
                       </Input>
                    </Form.Item>
                </div> }
                { this.state.ruleType == 'format' && <div>
                    <Form.Item label="Constraint - Regular Expression" help="Value must match regular expression" required>
                       <Input type="text" value={this.state.properties.pattern} onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('pattern', e.target.value) : this.setRuleProperty('pattern', "/*/" )
                        }}>
                       </Input>
                    </Form.Item>
                    <Form.Item label="Option - Flags" help="Regular expression flags - i|g|m" required>
                       <Input type="text" value={this.state.properties.flags} onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('flags', e.target.value) : this.setRuleProperty('flags', "i" )
                        }}>
                       </Input>
                    </Form.Item>
                </div> }
                { this.state.ruleType == 'length' && <div>
                    <Form.Item label="Constraint - Exactly" help="Value length must be exactly">
                       <InputNumber type="text" value={this.state.properties.is} onChange={(e) => {
                            if(e != null) {
                                this.setRuleProperty('maximum', null)
                                this.setRuleProperty('minimum', null)
                                this.setRuleProperty('is', e)
                                console.log(this.state);
                            }
                        }}>
                       </InputNumber>
                    </Form.Item>
                    {this.state.properties['is'] && <Form.Item label="Message - Exactly" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" value={this.state.properties.wrongLength} onChange={(e) => this.setRuleProperty('wrongLength', e.target.value)}></Input>
                    </Form.Item>}
                    <Divider/>
                    <Form.Item label="Constraint - Minimum" help="Value length must be at least" >
                       <InputNumber type="text" value={this.state.properties.minimum} disabled={!!this.state.properties['is']} onChange={(e) => {
                                e != null ? this.setRuleProperty('minimum', e) : this.setRuleProperty('minimum', -1)
                        }}>
                       </InputNumber>
                    </Form.Item>
                    {this.state.properties['minimum'] && <Form.Item label="Message - Minimum" help="Shown when 'Minimum' validation fails (optional)">
                        <Input type="text" value={this.state.properties.tooShort} onChange={(e) => this.setRuleProperty('tooShort', e.target.value)}></Input>
                    </Form.Item>}
                    <Divider/>
                    <Form.Item label="Constraint - Maximum" help="Value length must be at most">
                       <InputNumber type="text" value={this.state.properties.maximum} disabled={!!this.state.properties['is']} onChange={(e) => {
                                e != null ? this.setRuleProperty('maximum', e) : this.setRuleProperty('maximum', null )
                        }}>
                       </InputNumber>
                    </Form.Item>
                    {this.state.properties['maximum'] && <Form.Item label="Message - Maximum" help="Shown when 'Maximum' validation fails (optional)">
                        <Input type="text" value={this.state.properties.tooLong} onChange={(e) => this.setRuleProperty('tooLong', e.target.value)}></Input>
                    </Form.Item>}
                </div> }
                { this.state.ruleType == 'numericality' && <div>
                    <Form.Item label="Constraint - Integer" help="Value must be an integer">
                        <Checkbox checked={this.state.properties.integerOnly} onChange={(e)=>{this.setRuleProperty('integerOnly', e.target.value)}}></Checkbox>
                    </Form.Item>
                    <Form.Item label="Constraint - Greater Than" help="Value must be greater than">
                        <InputNumber value={this.state.properties.greaterThan} onChange={(e) => {this.setRuleProperty("greaterThan", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['greaterThan'] && <Form.Item label="Message - Greater than" help="Shown when 'Greater Than' validation fails (optional)">
                        <Input type="text" value={this.state.properties.notGreaterThan} onChange={(e) => this.setRuleProperty('notGreaterThan', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Greater Than Equal To" help="Value must be greater than or equal to">
                        <InputNumber value={this.state.properties.greaterThanOrEqualTo} onChange={(e) => {this.setRuleProperty("greaterThanOrEqualTo", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['greaterThanOrEqualTo'] && <Form.Item label="Message - Greater than or equal to" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" value={this.state.properties.notGreaterThanOrEqualTo} onChange={(e) => this.setRuleProperty('notGreaterThanOrEqualTo', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Equal To" help="Value must be exactly">
                        <InputNumber value={this.state.properties.equalTo} disabled={this.state.properties.greaterThanOrEqualTo||this.state.properties.lesserThanOrEqualTo||this.state.properties.greaterThan||this.state.properties.lesserThanThan} onChange={(e) => {this.setRuleProperty("equalTo", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['equalTo'] && <Form.Item label="Message - Equal to" help="Shown when 'Equal to' validation fails (optional)">
                        <Input type="text" value={this.state.properties.notEqualTo} onChange={(e) => this.setRuleProperty('notEqualTo', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Less Than" help="Value must be less than">
                        <InputNumber disabled={this.state.properties.equalTo} value={this.state.properties.lessThan} onChange={(e) => {this.setRuleProperty("lessThan", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['lessThan'] && <Form.Item label="Message - Less than" help="Shown when 'Less than' validation fails (optional)">
                        <Input type="text" value={this.state.properties.notLessThan} onChange={(e) => this.setRuleProperty('notLessThan', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Less Than Equal To" help="Value must be less than or equal to">
                        <InputNumber disabled={this.state.properties.equalTo} value={this.state.properties.lessThanOrEqualTo} onChange={(e) => {this.setRuleProperty("lessThanOrEqualTo", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['lessThanOrEqualTo'] && <Form.Item label="Message - Less than or equal to" help="Shown when 'Less than or equal to' validation fails (optional)">
                        <Input type="text" value={this.state.properties.notLessThanOrEqualTo} onChange={(e) => this.setRuleProperty('notLessThanOrEqualTo', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Divisible By" help="Value must be divisible by">
                        <InputNumber min={2} value={this.state.properties.divisibleBy} disabled={this.state.properties.equalTo} onChange={(e) => {this.setRuleProperty("divisibleBy", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['divisibleBy'] && <Form.Item label="Message - Not Divisible By" help="Shown when 'Not Divisible By' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('notDivisibleBy', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Odd" help="Value must be odd">
                        <Checkbox checked={this.state.properties.odd} onChange={(e)=>{this.setRuleProperty('odd', e.target.value)}}></Checkbox>
                    </Form.Item>
                    {this.state.properties['odd'] && <Form.Item label="Message - Not Odd" help="Shown when 'Not Odd' validation fails (optional)">
                        <Input type="text" value={this.state.properties.notOdd} onChange={(e) => this.setRuleProperty('notOdd', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Even" help="Value must be even">
                        <Checkbox checked={this.state.properties.even} onChange={(e)=>{this.setRuleProperty('even', e.target.value)}}></Checkbox>
                    </Form.Item>
                    {this.state.properties['even'] && <Form.Item label="Message - Not Even" help="Shown when 'Not Even' validation fails (optional)">
                        <Input type="text" value={this.state.properties.notEven} onChange={(e) => this.setRuleProperty('notEven', e.target.value)}></Input>
                    </Form.Item>}
                </div> }
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={!this.isRuleValid()} onClick={this.applyRule}>{this.state.isEditing == true ? "Apply" : "Add"}</Button>
                </Form.Item>
            </Form>
         </Card>
    </div>
    }
}
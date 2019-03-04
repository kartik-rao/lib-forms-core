import { Table, Card, Row, Col, Form ,Select, Input, DatePicker, Divider, InputNumber, Checkbox} from "antd";
import { observer } from "mobx-react";
import {toJS, keys} from "mobx";
import * as React from "react";
import { IFieldEditorView } from "./IFieldEditorView";
import {ValidationRuleNames} from "../../../models/validation";
import * as moment from "moment";
import { IValidationRule } from "../../../models/validation";
import Field from "../../../models/field";
import {ValidationListView} from "./partials/ValidationListView";

@observer
export class ValidationView extends React.Component<IFieldEditorView,any> {
    readonly dateFormat : string = "YYYY-MM-DD"
    constructor(props:any) {
        super(props);
        this.state = {
            ruleType : null,
            properties: {}
        }
    }

    setRuleType(type) {
        this.setState({ruleType: type});
    }

    setRuleProperty(name: string, value: any) {
        this.setState({properties: {...this.state.properties, [name]: value}});
    }

    applyRule() {
        this.props.editorStore.addValidationRule(this.state.ruleType, this.state.properties);
        this.setState({rule: null, properties: {}});
    }

    render() {
        let {editorStore} = this.props;
        let {field} = editorStore;
        let {fieldMeta} = editorStore.formStore;
        let fieldList = [];

        Object.keys(toJS(fieldMeta)).map((id: string)=> {
            fieldList.push(fieldMeta[id]);
        });

        return <Row>
            <Col span={20} offset={2}>
                <ValidationListView validation={field.validation} onRemove={editorStore.removeValidationRule}/>
            <Divider/>
            <Card title={`Add Validation Rule${this.state.ruleType ? ' - ' + this.state.ruleType: ''}`}>
            <Form>
                <Form.Item label="Rule">
                    <Select onChange={(e) => this.setRuleType(e)} style={{ width: 200 }} placeholder="Select a rule to apply">
                        {ValidationRuleNames.map((rule: any) => {
                            return <Select.Option disabled={!!field.validation[rule.value]} key={rule.key} value={rule.value}>{rule.label}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Divider/>
                <Form.Item label="Validation Message" help="Default validation failure message">
                    <Input type="text" onChange={(e) => this.setRuleProperty('message', e.target.value)}></Input>
                </Form.Item>
                <Divider/>

                { this.state.ruleType && this.state.ruleType.indexOf('date') > -1  && <div>
                    <Form.Item label="Constraint - Not before" help="Entered date cannot be before this date" required={!this.state.properties['latest']}>
                        <DatePicker onChange={(e) => {
                            e ? this.setRuleProperty('earliest', e.format(this.dateFormat)) : this.setRuleProperty('earliest', undefined)
                        }}>
                        </DatePicker>
                    </Form.Item>
                    {this.state.properties.earliest && <Form.Item label="Message - Not Before" help="Shown when 'Not Before' validation fails (optional)" >
                        <Input type="text" onChange={(e) => this.setRuleProperty('tooEarly', e.target.value)}></Input>
                    </Form.Item>}
                    <Divider/>
                    <Form.Item label="Constraint - Not after" help="Entered date cannot be after this date" required={!this.state.properties['earliest']}>
                        <DatePicker onChange={(e) => {
                            e ? this.setRuleProperty('latest', e.format(this.dateFormat)) : this.setRuleProperty('latest', undefined)
                        }}>
                        </DatePicker>
                    </Form.Item>
                    {this.state.properties.latest && <Form.Item label="Message - Not After" help="Shown when 'Not After' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('tooLate', e.target.value)}></Input>
                    </Form.Item>}
                </div>}
                { this.state.ruleType == 'equality' && <div>
                    <Form.Item label="Constraint - Matches" help="Value should match field" required>
                        <Select placeholder="Select a field" onChange={(e) => { this.setRuleProperty('attribute', e);}} style={{width: 200}}>
                            {fieldList.map((f: Field)=> {
                                return <Select.Option key={f.id} value={f.id} disabled={f.id==field.id}>{f.name} - ({f.type||f.inputType})</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </div> }
                { this.state.ruleType == 'exclusion' && <div>
                    <Form.Item label="Constraint - Not Within" help="Value should not be one of (comma separated list)" required>
                       <Input type="text" onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null )
                        }}>
                       </Input>
                    </Form.Item>
                </div> }
                { this.state.ruleType == 'inclusion' && <div>
                    <Form.Item label="Constraint - Within" help="Value must be one of (comma separated list)" required>
                       <Input type="text" onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null )
                        }}>
                       </Input>
                    </Form.Item>
                </div> }
                { this.state.ruleType == 'format' && <div>
                    <Form.Item label="Constraint - Regular Expression" help="Value must match regular expression" required>
                       <Input type="text" onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('pattern', e.target.value) : this.setRuleProperty('pattern', "/*/" )
                        }}>
                       </Input>
                    </Form.Item>
                    <Form.Item label="Option - Flags" help="Regular expression flags - i|g|m" required>
                       <Input type="text" onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('flags', e.target.value) : this.setRuleProperty('flags', "i" )
                        }}>
                       </Input>
                    </Form.Item>
                </div> }
                { this.state.ruleType == 'length' && <div>
                    <Form.Item label="Constraint - Exactly" help="Value length must be exactly">
                       <InputNumber type="text" onChange={(e) => {
                            if(e != null) {
                                this.setRuleProperty('maximum', null)
                                this.setRuleProperty('minimum', null)
                                this.setRuleProperty('is', e)
                            }
                        }}>
                       </InputNumber>
                    </Form.Item>
                    {this.state.properties['is'] && <Form.Item label="Message - Maximum" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('wrongLength', e.target.value)}></Input>
                    </Form.Item>}
                    <Divider/>
                    <Form.Item label="Constraint - Minimum" help="Value length must be at least" >
                       <InputNumber type="text" disabled={!!this.state.properties['is']} onChange={(e) => {
                                e != null ? this.setRuleProperty('minimum', e) : this.setRuleProperty('minimum', -1)
                        }}>
                       </InputNumber>
                    </Form.Item>
                    {this.state.properties['minimum'] && <Form.Item label="Message - Minimum" help="Shown when 'Minimum' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('tooShort', e.target.value)}></Input>
                    </Form.Item>}
                    <Divider/>
                    <Form.Item label="Constraint - Maximum" help="Value length must be at most">
                       <InputNumber type="text" disabled={!!this.state.properties['is']} onChange={(e) => {
                                e != null ? this.setRuleProperty('maximum', e) : this.setRuleProperty('maximum', null )
                        }}>
                       </InputNumber>
                    </Form.Item>
                    {this.state.properties['maximum'] && <Form.Item label="Message - Maximum" help="Shown when 'Maximum' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('tooLong', e.target.value)}></Input>
                    </Form.Item>}
                </div> }
                { this.state.ruleType == 'numericality' && <div>
                    <Form.Item label="Constraint - Integer" help="Value must be an integer">
                        <Checkbox checked={this.state.properties.integerOnly} onChange={(e)=>{this.setRuleProperty('integerOnly', e.target.value)}}></Checkbox>
                    </Form.Item>
                    {this.state.properties['is'] && <Form.Item label="Message - Maximum" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('wrongLength', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Greater Than" help="Value must be greater than">
                        <InputNumber onChange={(e) => {this.setRuleProperty("greaterThan", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['is'] && <Form.Item label="Message - Maximum" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('wrongLength', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Greater Than Equal To" help="Value must be greater than or equal to">
                        <InputNumber onChange={(e) => {this.setRuleProperty("greaterThanOrEqualTo", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['is'] && <Form.Item label="Message - Maximum" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('wrongLength', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Equal To" help="Value must be exactly">
                        <InputNumber disabled={this.state.properties.greaterThanOrEqualTo||this.state.properties.lesserThanOrEqualTo||this.state.properties.greaterThan||this.state.properties.lesserThanThan} onChange={(e) => {this.setRuleProperty("equalTo", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['is'] && <Form.Item label="Message - Maximum" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('wrongLength', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Less Than" help="Value must be less than">
                        <InputNumber disabled={this.state.properties.equalTo} onChange={(e) => {this.setRuleProperty("lessThan", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['is'] && <Form.Item label="Message - Maximum" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('wrongLength', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Less Than Equal To" help="Value must be less than or equal to">
                        <InputNumber disabled={this.state.properties.equalTo} onChange={(e) => {this.setRuleProperty("lessThanOrEqualTo", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['is'] && <Form.Item label="Message - Maximum" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('wrongLength', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Divisible By" help="Value must be divisible by">
                        <InputNumber min={2}  disabled={this.state.properties.equalTo} onChange={(e) => {this.setRuleProperty("divisibleBy", e)}}></InputNumber>
                    </Form.Item>
                    {this.state.properties['notDivisibleBy'] && <Form.Item label="Message - Not Divisible By" help="Shown when 'Not Divisible By' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('wrongLength', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Odd" help="Value must be odd">
                        <Checkbox checked={this.state.properties.equalTo} onChange={(e)=>{this.setRuleProperty('odd', e.target.value)}}></Checkbox>
                    </Form.Item>
                    {this.state.properties['notOdd'] && <Form.Item label="Message - Not Odd" help="Shown when 'Not Odd' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('notOdd', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Even" help="Value must be even">
                        <Checkbox checked={this.state.properties.equalTo} onChange={(e)=>{this.setRuleProperty('even', e.target.value)}}></Checkbox>
                    </Form.Item>
                    {this.state.properties['notEven'] && <Form.Item label="Message - Not Even" help="Shown when 'Not Even' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('notEven', e.target.value)}></Input>
                    </Form.Item>}
                </div> }
            </Form>
         </Card>
    </Col></Row>
    }
}
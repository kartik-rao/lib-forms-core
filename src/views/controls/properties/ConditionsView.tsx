import { Button, Divider, Empty, Form, Input, Select, Table } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IPredicate } from "../../../models/condition.predicate";
import { IFieldEditorView } from "./IFieldEditorView";


@observer
export class ConditionsView extends React.Component<IFieldEditorView,any> {
    constructor(props:any) {
        super(props);
        this.state = {field: null, expression: null, value: null, operator: null};
    }

    setField = (e) => {
        this.setState({field: e})
    }

    setExpression = (e) => {
        this.setState({expression: e});
    }

    setValue = (e) => {
        this.setState({value: e.target.value});
    }

    setOperator = (e) => {
        this.setState({operator: e});
    }

    addPredicate(p: IPredicate) {
        let {editorStore} = this.props;
        editorStore.addPredicate(p);
        return;
    }

    removePredicate(uuid: string) {
        let {editorStore} = this.props;
        editorStore.removePredicate(uuid);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.addPredicate({
            field: this.state.field,
            condition: this.state.expression,
            value: this.state.value,
            operator: this.state.operator
        });
        this.setState({field: null, expression: null, value: null, operator: null})
    }

    render() {
        let {field, availableConditionSources, availableExpressions, availableOperators, hasCondition, numPredicates} = this.props.editorStore;
        let columns : any = [
            { title: 'Field', dataIndex: 'field', key: 'field' },
            { title: 'Condition', dataIndex: 'condition', key: 'condition' },
            { title: 'Value', dataIndex: 'value', key: 'value'},
            { title: 'Operator', dataIndex: 'operator', key: 'operator'},
            { title: 'Action', key: 'action',
                render: (text, record) => (
                  <span>
                    <a href="javascript:;" onClick={(e) => this.removePredicate(record.uuid)}>Delete</a>
                  </span>
                ),
              }
        ]
        return <div>
            { numPredicates > 0 && <div>
                <Table dataSource={field.condition.predicates || []} columns={columns} rowKey='uuid'/>
                </div>
            }
            { numPredicates == 0 && <Empty description={
                    <span>No conditional rendering on this field</span>
                    }>
                </Empty>
            }
            <Divider/>
            <Form onSubmit={(e)=> this.handleSubmit(e)}>
                <Form.Item label="Source field" help="Field the condition will get its source value from" required>
                    <Select showSearch={true} onChange={(e) => this.setField(e)} value={this.state.field}>
                        { availableConditionSources.map((f)=>{
                            return <Select.Option key={f.id} value={f.id} disabled={field.id == f.id}>{f.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Expression" help="The expression to evaluate"  required>
                    <Select onChange={(e) => this.setExpression(e)}  value={this.state.expression}>
                        {
                            availableExpressions.map((e)=> {
                                return <Select.Option key={e.value} value={e.value}>{e.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Value" help="The target value"  required={!this.state.expression || this.state.expression.indexOf('hasval') > -1 || !this.state.field}>
                    <Input type="text" disabled={ !this.state.expression || this.state.expression.indexOf('hasval') > -1 || !this.state.field} onChange={(e) => this.setValue(e)}></Input>
                </Form.Item>
                <Form.Item label="Operator" help="Operator to combine conditions">
                    <Select onChange={(e) => this.setOperator(e)} value={this.state.operator} disabled={numPredicates == 0}>
                        {
                            availableOperators.map((e)=> {
                                return <Select.Option key={e.value} value={e.value}>{e.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button icon="plus" htmlType="submit" type="primary" disabled={!this.state.field || !this.state.expression}>Add</Button>
                </Form.Item>
            </Form>
        </div>
    }
}
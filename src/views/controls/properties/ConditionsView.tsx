import { Button, Divider, Empty, Form, Input, Select, Table, Row, Col } from "antd";
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
        console.log("Expression", e)
        this.setState({expression: e});
    }

    setValue = (e) => {
        this.setState({value: e.target.value});
    }

    setOperator = (e) => {
        this.setState({operator: e});
    }

    addPredicate(p: IPredicate) {
        if (!this.props.editorStore.field.condition) {
            this.props.editorStore.field.setCondition({predicates: []});
        }
        this.props.editorStore.field.condition.addPredicates(p);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.addPredicate({
            field: this.state.field,
            condition: this.state.expresion,
            value: this.state.value,
            operator: this.state.operator
        });

        this.setState({field: null, expression: null, value: null, operator: null})
    }

    render() {
        let {field, availableConditionSources, availableExpressions, availableOperators} = this.props.editorStore;
        let columns : any = [
            { title: 'Field', dataIndex: 'field', key: 'field' },
            { title: 'Condition', dataIndex: 'condition', key: 'condition' },
            { title: 'Value', dataIndex: 'value', key: 'value'},
            { title: 'Operator', dataIndex: 'operator', key: 'operator'}
        ]

        return <Row gutter={8}>
            <Col span={8}>
            { !field.condition && <Empty description={
                    <span>No conditional rendering on this field</span>
                    }>
                </Empty>
            }
            {   field.condition && <div>
                <Table dataSource={field.condition.predicates || []} columns={columns} />
                <Divider/></div>
            }
            <Form onSubmit={(e)=> this.handleSubmit(e)}>
                <Form.Item label="Source field">
                    <Select showSearch={true} onChange={(e) => this.setField(e)} value={this.state.field}>
                        { availableConditionSources.map((f)=>{
                            return <Select.Option key={f.id} value={f.id} disabled={field.id == f.id}>{f.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Expression">
                    <Select onChange={(e) => this.setExpression(e)}  value={this.state.expresion}>
                        {
                            availableExpressions.map((e)=> {
                                return <Select.Option key={e.value} value={e.value}>{e.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Operator">
                    <Select onChange={(e) => this.setOperator(e)} value={this.state.operator} disabled={!field.condition || field.condition.predicates.length <=1}>
                        {
                            availableOperators.map((e)=> {
                                return <Select.Option key={e.value} value={e.value}>{e.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Value">
                    <Input type="text" disabled={ !this.state.expression || this.state.expression.indexOf('hasval') > -1 || !this.state.field} onChange={(e) => this.setValue(e)}></Input>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" disabled={!this.state.field || !this.state.expresion}>Add</Button>
                </Form.Item>
            </Form>
            </Col>
        </Row>
    }
}
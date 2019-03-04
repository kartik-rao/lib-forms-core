var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Divider, Empty, Form, Input, Select, Table } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let ConditionsView = class ConditionsView extends React.Component {
    constructor(props) {
        super(props);
        this.setField = (e) => {
            this.setState({ field: e });
        };
        this.setExpression = (e) => {
            this.setState({ expression: e });
        };
        this.setValue = (e) => {
            this.setState({ value: e.target.value });
        };
        this.setOperator = (e) => {
            this.setState({ operator: e });
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.addPredicate({
                field: this.state.field,
                condition: this.state.expression,
                value: this.state.value,
                operator: this.state.operator
            });
            this.setState({ field: null, expression: null, value: null, operator: null });
        };
        this.state = { field: null, expression: null, value: null, operator: null };
    }
    addPredicate(p) {
        let { editorStore } = this.props;
        editorStore.addPredicate(p);
        return;
    }
    removePredicate(uuid) {
        let { editorStore } = this.props;
        editorStore.removePredicate(uuid);
    }
    render() {
        let { field, availableConditionSources, availableExpressions, availableOperators, hasCondition, numPredicates } = this.props.editorStore;
        let columns = [
            { title: 'Field', dataIndex: 'field', key: 'field' },
            { title: 'Condition', dataIndex: 'condition', key: 'condition' },
            { title: 'Value', dataIndex: 'value', key: 'value' },
            { title: 'Operator', dataIndex: 'operator', key: 'operator' },
            { title: 'Action', key: 'action',
                render: (text, record) => (React.createElement("span", null,
                    React.createElement("a", { href: "javascript:;", onClick: (e) => this.removePredicate(record.uuid) }, "Delete"))),
            }
        ];
        return React.createElement("div", null,
            numPredicates > 0 && React.createElement("div", null,
                React.createElement(Table, { dataSource: field.condition.predicates || [], columns: columns, rowKey: 'uuid' })),
            numPredicates == 0 && React.createElement(Empty, { description: React.createElement("span", null, "No conditional rendering on this field") }),
            React.createElement(Divider, null),
            React.createElement(Form, { onSubmit: (e) => this.handleSubmit(e) },
                React.createElement(Form.Item, { label: "Source field", help: "Field the condition will get its source value from", required: true },
                    React.createElement(Select, { showSearch: true, onChange: (e) => this.setField(e), value: this.state.field }, availableConditionSources.map((f) => {
                        return React.createElement(Select.Option, { key: f.id, value: f.id, disabled: field.id == f.id }, f.name);
                    }))),
                React.createElement(Form.Item, { label: "Expression", help: "The expression to evaluate", required: true },
                    React.createElement(Select, { onChange: (e) => this.setExpression(e), value: this.state.expression }, availableExpressions.map((e) => {
                        return React.createElement(Select.Option, { key: e.value, value: e.value }, e.name);
                    }))),
                React.createElement(Form.Item, { label: "Value", help: "The target value", required: !this.state.expression || this.state.expression.indexOf('hasval') > -1 || !this.state.field },
                    React.createElement(Input, { type: "text", disabled: !this.state.expression || this.state.expression.indexOf('hasval') > -1 || !this.state.field, onChange: (e) => this.setValue(e) })),
                React.createElement(Form.Item, { label: "Operator", help: "Operator to combine conditions" },
                    React.createElement(Select, { onChange: (e) => this.setOperator(e), value: this.state.operator, disabled: numPredicates == 0 }, availableOperators.map((e) => {
                        return React.createElement(Select.Option, { key: e.value, value: e.value }, e.name);
                    }))),
                React.createElement(Form.Item, null,
                    React.createElement(Button, { icon: "plus", htmlType: "submit", type: "primary", disabled: !this.state.field || !this.state.expression }, "Add"))));
    }
};
ConditionsView = __decorate([
    observer
], ConditionsView);
export { ConditionsView };

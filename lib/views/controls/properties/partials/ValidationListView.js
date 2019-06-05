import * as tslib_1 from "tslib";
import { Button, Table } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { ValidationRuleMap } from "../../../../models/validation";
let ValidationListView = class ValidationListView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let columns = [{
                title: 'Rule',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Message',
                dataIndex: 'defaultMessage',
                key: 'defaultMessage',
            },
            {
                title: 'Constraints',
                dataIndex: 'constraint',
                key: 'constraint',
                render: (text, record) => {
                    return React.createElement("ul", null, Object.keys(record.constraint).map((key) => {
                        return key == 'message' ? null : React.createElement("li", { key: key },
                            key,
                            " - ",
                            record.constraint[key]);
                    }));
                }
            },
            {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (React.createElement("span", null,
                    React.createElement(Button, { shape: "circle", type: "default", onClick: (e) => { this.props.onEdit(record.rule); }, icon: "tool", size: "small", style: { marginRight: '5px' } }),
                    React.createElement(Button, { shape: "circle", type: "danger", onClick: (e) => { this.props.onRemove(record.rule); }, icon: "delete", size: "small" }))),
            }];
        let numConstraints = 0;
        let rows = [];
        if (this.props.validation && this.props.validation.constraints) {
            let { constraints } = this.props.validation;
            numConstraints = Object.keys(constraints).length;
            Object.keys(constraints).forEach((rule, index) => {
                let row = {};
                let { message } = constraints[rule];
                row.rule = rule;
                row.name = ValidationRuleMap[rule];
                row.key = index;
                row.defaultMessage = message;
                row.constraint = constraints[rule];
                rows.push(row);
            });
        }
        return React.createElement(Table, { bordered: true, pagination: numConstraints > 5 ? { position: 'bottom' } : false, dataSource: rows, columns: columns, rowKey: 'key' });
    }
};
ValidationListView = tslib_1.__decorate([
    observer
], ValidationListView);
export { ValidationListView };

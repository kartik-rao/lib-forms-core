import { Button, Table } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import ValidationRule, { ValidationRuleMap } from "../../../../models/validation";

export interface IValidationListViewProps {
    validation: ValidationRule;
    onRemove: (rule: string) => void;
}

@observer
export class ValidationListView extends React.Component<IValidationListViewProps, any> {
    constructor(props: IValidationListViewProps) {
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
            key: 'constraint'
          },
          {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" onClick={(e) => {this.props.onRemove(record.rule); console.log(this.props.validation.constraints)}} icon="delete" size="small">Remove</Button>
            ),
          }];

        let numConstraints = 0;
        let rows = [];
        if (this.props.validation && this.props.validation.constraints) {
            let {constraints} = this.props.validation;
            numConstraints = Object.keys(constraints).length;
            Object.keys(constraints).forEach((rule: string, index: number) => {
                let row: any = {};
                let {message} = constraints[rule];
                row.rule = rule;
                row.name = ValidationRuleMap[rule];
                row.key = index;
                row.defaultMessage = message;
                row.constraint = "";
                Object.keys(constraints[rule]).forEach((key: string) => {
                    if (key != 'message') {
                        row.constraint += `${key} = ${constraints[rule][key]}`;
                    }
                });
                rows.push(row);
            });
        }
        return <Table bordered={true} pagination={numConstraints > 5 ? {position: 'bottom'} : false} dataSource={rows} columns={columns} rowKey='key'>
        </Table>
    }
}
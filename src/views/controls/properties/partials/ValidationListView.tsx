import { Table, Button } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IValidationRule } from "../../../../models/validation";
import {ValidationRuleMap} from "../../../../models/validation";

export interface IValidationListViewProps {
    validation: IValidationRule;
    onRemove: (rule: string) => void;
}

@observer
export class ValidationListView extends React.Component<IValidationListViewProps, any> {
    constructor(props: IValidationListViewProps) {
        super(props);
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
                <Button type="primary" onClick={(e) => {this.props.onRemove(record.rule)}} icon="delete" size="small">Remove</Button>
            ),
          }];

        let rows = [];
        if (props.validation) {
            Object.keys(props.validation).forEach((rule: string, index: number) => {
                let row: any = {};
                let {message} = props.validation[rule];
                row.rule = rule;
                row.name = ValidationRuleMap[rule];
                row.key = index;
                row.defaultMessage = message;
                row.constraint = "";
                Object.keys(props.validation[rule]).forEach((key: string) => {
                    if (key != 'message') {
                        row.constraint += `${key} = ${props.validation[rule][key]}`;
                    }
                });
                rows.push(row);
            });
        }

        this.state = {rows: rows, columns: columns};
    }

    render() {
        let {rows, columns } = this.state;
        return <Table bordered={true}  dataSource={rows} columns={columns} rowKey='key'>
        </Table>
    }
}
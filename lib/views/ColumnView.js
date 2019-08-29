import { Card, Col } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { formStoreContext } from '../store/FormStoreProvider';
import { FieldView } from "./FieldView";
export const ColumnView = (props) => {
    const store = React.useContext(formStoreContext);
    if (!store)
        throw new Error("Store is  null");
    return useObserver(() => {
        return React.createElement("div", { className: "fl-col", "data-uuid": props.column.uuid, id: `fl-col-${props.column.id}` },
            React.createElement(Col, { span: props.column.span ? props.column.span : props.span },
                React.createElement(Card, { bordered: false }, props.column.fields.map((field) => {
                    return React.createElement(FieldView, { field: field, key: field.uuid });
                }))));
    });
};
// import { FormStore } from "../store/FormStore";
// export interface ColumnProps {
//     column: Column;
//     store: FormStore;
//     span: number
// }
// @observer
// export class ColumnView extends React.Component<ColumnProps, any> {
//     props: ColumnProps;
//     constructor(props: ColumnProps) {
//         super(props);
//         this.props = props;
//     }
//     render() {
//         let {store, column} = this.props;
//         const { fields } = column;
//         return <div className="fl-col" data-uuid={column.uuid} id={`fl-col-${column.id}`}>
//             <Col span={column.span ? column.span : this.props.span}>
//                 <Card bordered={false}>
//                     {fields.map((field: Field) => {
//                         return <FieldView field={field} store={store} key={field.uuid}></FieldView>
//                     })}
//                 </Card>
//             </Col>
//         </div>;
//     }
// }

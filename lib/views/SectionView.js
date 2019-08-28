import { Card, Row } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
// import { FormStore } from "../store/FormStore";
import { ColumnView } from "./ColumnView";
import { formStoreContext } from '../store/FormStoreProvider';
// export interface SectionProps {
//     section: Section;
//     store: FormStore;
// }
export const SectionView = (props) => {
    const store = React.useContext(formStoreContext);
    if (!store)
        throw new Error("Store is  null");
    const numColumns = props.section.columns.length;
    let span = numColumns <= 1 ? 24 : 24 / numColumns;
    return useObserver(() => {
        return React.createElement("div", { className: "fl-section", "data-uuid": props.section.uuid, id: `fl-section-${props.section.id}` },
            React.createElement(Card, { bordered: store.form.formLayoutOptions.showSectionBorders, title: store.form.formLayoutOptions.showSectionTitles ? props.section.title : "", style: { padding: "1px" }, size: "small" },
                React.createElement(Row, { gutter: props.section.gutter }, props.section.columns.map((column) => {
                    return React.createElement(ColumnView, { key: column.uuid, column: column, span: span });
                }))));
    });
};
// @observer
// export class SectionView extends React.Component<SectionProps, any> {
//     props: SectionProps;
//     constructor(props: SectionProps) {
//         super(props);
//         this.props = props;
//     }
//     render() {
//         let {store, section} = this.props;
//         const numColumns = section.columns.length;
//         let span = numColumns <= 1 ? 24 : 24 / numColumns;
//         return <div className="fl-section" data-uuid={section.uuid} id={`fl-section-${section.id}`}>
//             <Card bordered={store.form.formLayoutOptions.showSectionBorders} title={store.form.formLayoutOptions.showSectionTitles ? section.title : ""} style={{padding: "1px"}} size="small">
//                 <Row gutter={section.gutter}>
//                     {section.columns.map((column: Column) => {
//                         return <ColumnView store={store} key={column.uuid} column={column} span={span}/>
//                     })}
//                 </Row>
//             </Card>
//         </div>
//     }
// }

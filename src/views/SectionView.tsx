import { Card, Row } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { Column } from "../models/column";
import { Section } from "../models/section";
import { formStoreContext } from '../store/FormStoreProvider';
import { ColumnView } from "./ColumnView";

export const SectionView: React.FC<{section: Section, key: string}> = (props) => {
    const fStore = React.useContext(formStoreContext);
    if(!fStore) throw new Error("Store is  null");

    const numColumns = props.section.columns.length;
    let span = numColumns <= 1 ? 24 : 24 / numColumns;
    return useObserver(() => {
        return <div className="fl-section" data-uuid={props.section.uuid} id={`fl-section-${props.section.id}`}>
        <Card bordered={fStore.form.formLayoutOptions.showSectionBorders} title={fStore.form.formLayoutOptions.showSectionTitles ? props.section.title : ""} style={{padding: "1px"}} size="small">
            <Row gutter={props.section.gutter}>
                {props.section.columns.map((column: Column) => {
                    return <ColumnView key={column.uuid} column={column} span={span}/>
                })}
            </Row>
        </Card>
    </div>
    });
}
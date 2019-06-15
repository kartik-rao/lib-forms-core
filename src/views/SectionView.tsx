import { Card, Row } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { Column } from "../models/column";
import { Section } from "../models/section";
import { FormStore } from "../store/FormStore";
import { ColumnView } from "./ColumnView";

export interface SectionProps {
    section: Section;
    store: FormStore;
}

@observer
export class SectionView extends React.Component<SectionProps, any> {

    props: SectionProps;
    constructor(props: SectionProps) {
        super(props);
        this.props = props;
    }

    render() {
        let {store, section} = this.props;
        const numColumns = section.columns.length;
        let span = numColumns <= 1 ? 24 : 24 / numColumns;

        return <div className="fl-section" data-uuid={section.uuid} id={`fl-section-${section.id}`}>
            <Card bordered={false} title={section.title} style={{padding: "1px"}} size="small">
                <Row gutter={section.gutter || 4}>
                    {section.columns.map((column: Column, cn: number) => {
                        return <ColumnView store={store} key={column.uuid} column={column} span={span}/>
                    })}
                </Row>
            </Card>
        </div>
    }
}
import * as React from "react";
import {Card, Row} from "antd";
import {ColumnView} from "./ColumnView";
import { observer } from "mobx-react";
import Column from "../models/column";
import Section from "../models/section";
import FormStore from "../store/FormStore";

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
        // let section = store.formData.content.pages[pageIndex].sections[sectionIndex];
        // let {showSectionTitles, showSectionBorders} = store.formData.formLayoutOptions;
        const numColumns = section.columns.length;
        // Handle form layout options
        return <div id={section.id}>
            <Card bordered={true} title={section.name}>
                <Row gutter={section.gutter || 4}>
                    {section.columns.map((column: Column, cn: number) => {
                        return <ColumnView store={store} key={column.uuid} column={column} span={24/numColumns}/>
                    })}
                </Row>
            </Card>
        </div>
    }
}
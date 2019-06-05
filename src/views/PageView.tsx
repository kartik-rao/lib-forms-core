import { Card } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import Page from "../models/page";
import Section from "../models/section";
import FormStore from "../store/FormStore";
import { SectionView } from "./SectionView";


export interface PageProps {
    store: FormStore;
    page: Page;
}

@observer
export class PageView extends React.Component<PageProps, any> {

    state: any;
    props: PageProps;

    constructor(props: PageProps) {
        super(props);
        this.props = props;
    }

    render() {
        let {store, page} = this.props;
        return <div className="fl-page-wrap">
            <Card title={page.title}>
                <div id={`fl-page-${store.currentPage}`} className="fl-page" data-uuid={page.uuid}>
                    {page.sections.map((section: Section, sn: number) => {
                        return <SectionView key={section.uuid} store={store} section={section}></SectionView>
                    })}
                </div>
            </Card>
        </div>
    }
}
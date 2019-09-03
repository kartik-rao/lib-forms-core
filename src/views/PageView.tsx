import { Card } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { Page } from "../models/page";
import { Section } from "../models/section";
import { formStoreContext } from '../store/FormStoreProvider';
import { SectionView } from "./SectionView";

export const PageView: React.FC<{page: Page}> = (props) => {
    const fStore = React.useContext(formStoreContext);
    if(!fStore) throw new Error("Store is  null");
    return useObserver(() => {
        return <div className="fl-page-wrap">
        <Card style={{padding:"0"}} bordered={false} title={fStore.form.formLayoutOptions.showPageTitles ? props.page.title : ''}>
            <div id={`fl-page-${props.page.id || fStore.currentPage}`} className="fl-page" data-uuid={`fl-page-${props.page.uuid}`}>
                {props.page.sections.map((section: Section, sn: number) => {
                    return <SectionView key={section.uuid} section={section}></SectionView>
                })}
            </div>
        </Card>
    </div>
    });
}
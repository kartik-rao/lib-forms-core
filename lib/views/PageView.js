import { Card } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { formStoreContext } from '../store/FormStoreProvider';
import { SectionView } from "./SectionView";
export const PageView = (props) => {
    const store = React.useContext(formStoreContext);
    if (!store)
        throw new Error("Store is  null");
    if (!store)
        throw new Error("Store is  null");
    return useObserver(() => {
        return React.createElement("div", { className: "fl-page-wrap" },
            React.createElement(Card, { style: { padding: "0" }, bordered: false, title: store.form.formLayoutOptions.showPageTitles ? props.page.title : '' },
                React.createElement("div", { id: `fl-page-${props.page.id || store.currentPage}`, className: "fl-page", "data-uuid": `fl-page-${props.page.uuid}` }, props.page.sections.map((section, sn) => {
                    return React.createElement(SectionView, { key: section.uuid, section: section });
                }))));
    });
};

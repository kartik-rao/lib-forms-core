import { Card } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
// import { FormStore } from "../store/FormStore";
import { SectionView } from "./SectionView";
import { formStoreContext } from '../store/FormStoreProvider';
// export interface PageProps {
//     store: FormStore;
//     page: Page;
// }
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
// @observer
// export class PageView extends React.Component<PageProps, any> {
//     state: any;
//     props: PageProps;
//     constructor(props: PageProps) {
//         super(props);
//         this.props = props;
//     }
//     render() {
//         let {store, page} = this.props;
//         let {showPageTitles} = store.form.formLayoutOptions;
// return <div className="fl-page-wrap">
//     <Card style={{padding:"0"}} bordered={false} title={showPageTitles ? page.title : ''}>
//         <div id={`fl-page-${page.id || store.currentPage}`} className="fl-page" data-uuid={`fl-page-${page.uuid}`}>
//             {page.sections.map((section: Section, sn: number) => {
//                 return <SectionView key={section.uuid} store={store} section={section}></SectionView>
//             })}
//         </div>
//     </Card>
// </div>
//     }
// }

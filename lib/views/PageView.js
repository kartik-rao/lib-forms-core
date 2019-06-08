import * as tslib_1 from "tslib";
import { Card } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { SectionView } from "./SectionView";
let PageView = class PageView extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        let { store, page } = this.props;
        return React.createElement("div", { className: "fl-page-wrap" },
            React.createElement(Card, { style: { padding: "0" } },
                React.createElement("div", { id: `fl-page-${store.currentPage}`, className: "fl-page", "data-uuid": page.uuid }, page.sections.map((section, sn) => {
                    return React.createElement(SectionView, { key: section.uuid, store: store, section: section });
                }))));
    }
};
PageView = tslib_1.__decorate([
    observer
], PageView);
export { PageView };

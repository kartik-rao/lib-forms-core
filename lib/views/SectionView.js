import * as tslib_1 from "tslib";
import { Card, Row } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { ColumnView } from "./ColumnView";
let SectionView = class SectionView extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        let { store, section } = this.props;
        const numColumns = section.columns.length;
        let span = numColumns <= 1 ? 24 : 24 / numColumns;
        return React.createElement("div", { className: "fl-section", "data-uuid": section.uuid, id: `fl-section-${section.id}` },
            React.createElement(Card, { bordered: false, title: section.title, style: { padding: "1px" }, size: "small" },
                React.createElement(Row, { gutter: section.gutter || 4 }, section.columns.map((column, cn) => {
                    return React.createElement(ColumnView, { store: store, key: column.uuid, column: column, span: span });
                }))));
    }
};
SectionView = tslib_1.__decorate([
    observer
], SectionView);
export { SectionView };

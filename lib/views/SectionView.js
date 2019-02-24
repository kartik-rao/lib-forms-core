var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { Card, Row } from "antd";
import { ColumnView } from "./ColumnView";
import { observer } from "mobx-react";
let SectionView = class SectionView extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        let { store, section } = this.props;
        const numColumns = section.columns.length;
        return React.createElement("div", { id: section.id },
            React.createElement(Card, { bordered: true, title: section.name },
                React.createElement(Row, { gutter: 8 }, section.columns.map((column, cn) => {
                    return React.createElement(ColumnView, { store: store, key: column.uuid, column: column, span: 24 / numColumns });
                }))));
    }
};
SectionView = __decorate([
    observer
], SectionView);
export { SectionView };
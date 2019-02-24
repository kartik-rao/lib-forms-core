var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        return React.createElement("div", { className: "page-content" },
            React.createElement(Card, { title: page.title },
                React.createElement("div", { className: "page" }, page.sections.map((section, sn) => {
                    return React.createElement(SectionView, { key: section.uuid, store: store, section: section });
                }))));
    }
};
PageView = __decorate([
    observer
], PageView);
export { PageView };

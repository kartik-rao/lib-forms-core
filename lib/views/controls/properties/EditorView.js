var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Tabs, Drawer, Row, Col } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { ConditionsView } from "./ConditionsView";
import FieldPropertiesView from "./FieldPropertiesView";
import { ValidationView } from "./ValidationView";
let EditorView = class EditorView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { editorStore } = this.props;
        let { field } = editorStore;
        return field && React.createElement(Drawer, { title: `Field ${field.name} (id=${field.id} class=${field.className})`, width: 800, onClose: () => editorStore.setField(null), visible: editorStore.visible, style: { overflow: 'auto', height: 'calc(100% - 108px)', paddingBottom: '108px' } }, editorStore.field &&
            React.createElement(Tabs, null,
                React.createElement(Tabs.TabPane, { tab: "Properties", key: "1" },
                    React.createElement(Row, null,
                        React.createElement(Col, { span: 20, offset: 2 },
                            React.createElement(FieldPropertiesView, { editorStore: editorStore })))),
                React.createElement(Tabs.TabPane, { tab: "Validation", key: "2" },
                    React.createElement(Row, null,
                        React.createElement(Col, { span: 20, offset: 2 },
                            React.createElement(ValidationView, { editorStore: editorStore })))),
                React.createElement(Tabs.TabPane, { tab: "Condition", key: "3" },
                    React.createElement(Row, null,
                        React.createElement(Col, { span: 20, offset: 2 },
                            React.createElement(ConditionsView, { editorStore: editorStore }))))));
    }
};
EditorView = __decorate([
    observer
], EditorView);
export { EditorView };

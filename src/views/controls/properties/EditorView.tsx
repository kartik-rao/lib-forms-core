import { Tabs, Drawer } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { ConditionsView } from "./ConditionsView";
import { FieldPropertiesView } from "./FieldPropertiesView";
import { IFieldEditorView } from "./IFieldEditorView";

@observer
export class EditorView extends React.Component<IFieldEditorView,any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        let {editorStore} = this.props;
        return <Drawer title="Edit Field" width={480} onClose={() => editorStore.setField(null)} visible={editorStore.visible}
        style={{ overflow: 'auto', height: 'calc(100% - 108px)', paddingBottom: '108px' }}>
        {editorStore.field && <Tabs>
            <Tabs.TabPane tab="Properties" key="1">
                <FieldPropertiesView editorStore={editorStore}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Validation" key="2"></Tabs.TabPane>
            <Tabs.TabPane tab="Condition" key="3">
                <ConditionsView editorStore={editorStore}/>
            </Tabs.TabPane>
        </Tabs>}
        </Drawer>
    }
}
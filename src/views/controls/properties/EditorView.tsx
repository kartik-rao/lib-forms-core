import { Tabs, Drawer, Card } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { ConditionsView } from "./ConditionsView";
import { FieldPropertiesView } from "./FieldPropertiesView";
import { IFieldEditorView } from "./IFieldEditorView";
import { ValidationView } from "./ValidationView";

@observer
export class EditorView extends React.Component<IFieldEditorView,any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        let {editorStore} = this.props;
        let {field} = editorStore;

        return field && <Drawer title={`Field ${field.name} (id=${field.id} class=${field.className})`}
            width={800} onClose={() => editorStore.setField(null)} visible={editorStore.visible}
            style={{ overflow: 'auto', height: 'calc(100% - 108px)', paddingBottom: '108px' }}>
            {editorStore.field &&
                <Tabs>
                    <Tabs.TabPane tab="Properties" key="1">
                        <FieldPropertiesView editorStore={editorStore}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Validation" key="2">
                        <ValidationView editorStore={editorStore} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Condition" key="3">
                        <ConditionsView editorStore={editorStore}/>
                    </Tabs.TabPane>
                </Tabs>
            }
        </Drawer>
    }
}
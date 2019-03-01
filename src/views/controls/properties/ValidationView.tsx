import { Button, Divider, Empty, Form, Input, Select, Table } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IFieldEditorView } from "./IFieldEditorView";


@observer
export class ValidationView extends React.Component<IFieldEditorView,any> {

    constructor(props:any) {
        super(props);
    }

    render() {
        let {editorStore} = this.props;
        let {field} = editorStore;
        return null
    }
}
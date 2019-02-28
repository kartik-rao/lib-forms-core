import { observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { ITextAreaProps } from "../../models/field.properties";
import { Input } from "antd";

@observer
export class TextAreaView extends React.Component<IViewProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onChange} = this.props;
        let component = field.componentProps as ITextAreaProps;
        return <div id={field.id} data-uuid={field.uuid} className="fl-field fl-textarea-field">
            <Input.TextArea {...component} onChange={onChange}/>
         </div>
    }
}
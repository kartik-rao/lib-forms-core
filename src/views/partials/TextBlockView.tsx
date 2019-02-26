import { observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";

@observer
export class TextBlockView extends React.Component<IViewProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let {field} = this.props;
        return <div className="fl-field fl-textblock-field">
            <p id={field.id} data-uuid={field.uuid}>{field.value}</p>
         </div>
    }
}
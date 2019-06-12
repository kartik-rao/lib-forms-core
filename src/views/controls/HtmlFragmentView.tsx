import * as React from "react";
import { IHTMLFragmentProps } from '../../models/field.properties';
import { IViewProps } from './IViewProps';

export class HTMLFragmentView extends React.Component<IViewProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let {field} = this.props;
        let {defaultValue} = field.componentProps as IHTMLFragmentProps;
        return <div id={field.id} data-uuid={field.uuid} dangerouslySetInnerHTML={{__html: defaultValue}}></div>
    }
}
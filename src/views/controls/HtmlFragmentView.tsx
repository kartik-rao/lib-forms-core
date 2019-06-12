import * as React from "react";
import { IHTMLFragmentProps } from '../../models/field.properties';
import { IViewProps } from './IViewProps';

export class HTMLFragmentView extends React.Component<IViewProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let {field} = this.props;
        let {allowForms, allowPopups, allowScripts, fragmentUrl, seamless, ...rest} = field.componentProps as IHTMLFragmentProps;
        let sandboxProps = [];
        if (allowForms) {sandboxProps.push("allow-forms")}
        if (allowPopups) {sandboxProps.push("allow-popups")}
        if (allowScripts) {sandboxProps.push("allow-scripts")}
        return <iframe {...rest} src={fragmentUrl} id={field.id} data-uuid={field.uuid} sandbox={sandboxProps.join(" ")} seamless={seamless}></iframe>
    }
}
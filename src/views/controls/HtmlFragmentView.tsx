import * as React from "react";
import { IHTMLFragmentProps } from '../../models/field.properties';
import { IViewProps } from './IViewProps';
import { useObserver } from "mobx-react";

export const HtmlFragmentView: React.FC<IViewProps> = (props) => {
    let {field} = props;
    let {allowForms, allowPopups, allowScripts, fragmentUrl, seamless, ...rest} = field.componentProps as IHTMLFragmentProps;
    let sandboxProps = [];
    if (allowForms) {sandboxProps.push("allow-forms")}
    if (allowPopups) {sandboxProps.push("allow-popups")}
    if (allowScripts) {sandboxProps.push("allow-scripts")}
    return useObserver(() => {
        return <React.Suspense fallback="">
        <iframe {...rest} src={fragmentUrl} id={field.id} data-uuid={field.uuid} sandbox={sandboxProps.join(" ")} seamless={seamless}></iframe>
    </React.Suspense>
    });
};
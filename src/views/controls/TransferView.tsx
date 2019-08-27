import { useObserver } from "mobx-react";
import * as React from "react";
import { ITransferProps } from "../../models/field.properties";
import { IViewProps } from "./IViewProps";

const Transfer = React.lazy(() => import(/* webpackChunkName: "transfer" */ "antd/es/transfer"));

export const TransferView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as ITransferProps;
    return useObserver(() => {
        return <React.Suspense fallback="">
        <Transfer {...component} onChange={props.onChange} render={(item) => item.title}/>
    </React.Suspense>
    });
};
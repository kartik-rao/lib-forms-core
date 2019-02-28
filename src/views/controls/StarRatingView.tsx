import { Rate } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { IStarRatingProps } from "../../models/field.properties";

@observer
export class StarRatingView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onChange} = this.props;
        let component = field.componentProps as IStarRatingProps;
        return <div id={field.id} data-uuid={field.uuid} className="fl-field fl-starrating-field">
            <Rate {...component} onChange={onChange}/>
         </div>
    }
}
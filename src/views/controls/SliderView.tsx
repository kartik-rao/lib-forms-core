import { Slider } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { ISliderProps } from "../../models/field.properties";

@observer
export class SliderView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onChange} = this.props;
        let component = field.componentProps as ISliderProps;
        return <div id={field.id} data-uuid={field.uuid} className="fl-field fl-slider-field">
            <Slider {...component} onChange={onChange}/>
         </div>
    }
}
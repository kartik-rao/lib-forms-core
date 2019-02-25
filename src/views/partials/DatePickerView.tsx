import { DatePicker } from "antd";
import { observer } from "mobx-react";
import moment from "moment";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { IDatePickerProps } from "../../models/field.properties";

@observer
export class DatePickerView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onChange} = this.props;
        let component = field.componentProps as IDatePickerProps;
        let {dateFormat, mode} = component;

        if (!mode) {
            mode = "date";
        }

        if (!dateFormat) {
            switch (mode) {
                case 'date' : {
                    dateFormat = moment.HTML5_FMT.DATE;
                    break;
                }
                case 'month' : {
                    dateFormat = moment.HTML5_FMT.MONTH;
                    break;
                }
                case 'time' : {
                    dateFormat = moment.HTML5_FMT.TIME;
                    break;
                }
                case 'year' : {
                    dateFormat = moment.HTML5_FMT.TIME;
                    break;
                }
            }
        }

        let _onChange = (e) => {
            let v = e.target ? e.target.value : e;
            v ? onChange(moment(v).format(dateFormat)) : onChange(null);
        };

        return <div id={field.id} data-uuid={field.uuid} className={`fl-field fl-datapicker-field fl-datepicker-${mode}`}>
            <DatePicker mode={component.mode}
                defaultValue={component.defaultValue ? moment(component.defaultValue, dateFormat): null}
                format={component.dateFormat} onChange={_onChange}/>
        </div>
    }
}
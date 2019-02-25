import { DatePicker } from "antd";
import { DatePickerProps } from "antd/lib/date-picker/interface";
import { observer } from "mobx-react";
import moment from "moment";
import * as React from "react";

export interface ICheckboxFieldProps extends DatePickerProps {
    id   : string,
    uuid : string,
    onChange: any,
    dateFormat: string;
}

@observer
export class DatepickerField extends React.Component<ICheckboxFieldProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {props} = this;
        let mode = props.mode ? props.mode : 'date';
        let dateFormat = props.dateFormat;

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

        let onChange = (e) => {
            let v = e.target ? e.target.value : e;
            v ? props.onChange(moment(v).format(dateFormat)) : props.onChange(null);
        };
        return <div id={props.id} data-uuid={props.uuid} className={`fl-field fl-datapicker-field fl-datepicker-${mode}`}>
            <DatePicker {...props} mode={mode}
                defaultValue={props.defaultValue ? moment(props.defaultValue, dateFormat): null}
                format={props.dateFormat} onChange={onChange}/>
         </div>
    }
}
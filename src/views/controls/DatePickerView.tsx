import { useLocalStore, useObserver } from "mobx-react";
import moment from "moment";
import * as React from "react";
import { IDatePickerProps } from "../../models/field.properties";
import { IViewProps } from "./IViewProps";

const DatePicker = React.lazy(() => import(/* webpackChunkName: "datepicker" */ "antd/es/date-picker").then((module) => {return {default: module.default}}));

export const DatePickerView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as IDatePickerProps;
    const localStore = useLocalStore(() => {
        return {
            defaultValue: component.defaultValue,
            mode: component.mode,
            get dateFormat() : string {
                switch (localStore.mode) {
                    case 'date' : {
                        return moment.HTML5_FMT.DATE;
                    }
                    case 'month' : {
                        return moment.HTML5_FMT.MONTH;
                    }
                    case 'time' : {
                        return moment.HTML5_FMT.TIME;
                    }
                    case 'year' : {
                        return moment.HTML5_FMT.TIME;
                    }

                    default : return moment.HTML5_FMT.DATE;
                }
            }
        }
    });

    let _onChange = (e) => {
        let v = e.target ? e.target.value : e;
        v ? props.onChange(moment(v).format(localStore.dateFormat)) : props.onChange(null);
    };

    return useObserver(() => {
        return <React.Suspense fallback="">
        <DatePicker mode={localStore.mode}
            defaultValue={localStore.defaultValue ? moment(localStore.defaultValue, localStore.dateFormat): null}
            format={localStore.dateFormat} onChange={_onChange}/>
    </React.Suspense>
    });
};
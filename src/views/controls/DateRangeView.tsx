import {toJS, observe, computed} from 'mobx';
import { observer, useLocalStore, useObserver } from "mobx-react";
import moment, { Moment } from 'moment'
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { IDateRangeProps } from "../../models/field.properties";
import { useDisposable } from 'mobx-react-lite';

// @observer
// export class DateRangeView extends React.Component<IViewProps, any> {

//     constructor(props: any) {
//         super(props);

//         let {dateFormat, mode, defaultStartValue, defaultEndValue} = (this.props.field.componentProps as IDateRangeProps);

//         let dateMode= (mode ? mode : 'date') as "time"|"date"|"month"|"year";
//         if (!dateFormat) {
//             switch (mode) {
//                 case 'date' : {
//                     dateFormat = moment.HTML5_FMT.DATE;
//                     break;
//                 }
//                 case 'month' : {
//                     dateFormat = moment.HTML5_FMT.MONTH;
//                     break;
//                 }
//                 case 'time' : {
//                     dateFormat = moment.HTML5_FMT.TIME;
//                     break;
//                 }
//                 case 'year' : {
//                     dateFormat = moment.HTML5_FMT.TIME;
//                     break;
//                 }
//             }
//         }

//         let defaultStart = !!defaultStartValue ? moment(defaultStartValue, dateFormat) : null;
//         let defaultEnd  = !!defaultEndValue ? moment(defaultEndValue, dateFormat) : null;
//         let {minStartDate} = this.props.field.componentProps as IDateRangeProps;

//         let minStart: moment.Moment;
//         if (minStartDate) {
//             minStart = moment().add(toJS(minStartDate.relative))
//         }

//         let disposer = observe(props.field, "componentProps", (change) => {
//             let props = change.newValue;
//             let newState = {};
//             if (props.dateFormat) {
//                 newState['dateFormat'] = props.dateFormat;
//             }
//             if(props.defaultStart) {
//                 newState['dates'] = this.state.defaultValue.splice()
//             }
//             if(props) {
//                 this.setState({
//                     'minStart' : moment().add(toJS(change.newValue.relative)),
//                 })
//             } else {
//                 this.setState({'minStart' : null})
//             }
//         });

//         this.state = {
//             defaultValue: [defaultStart, defaultEnd],
//             dates: [defaultStart, defaultEnd],
//             mode: dateMode,
//             dateFormat: dateFormat,
//             minStart: minStart,
//             disposer: disposer
//         }
//     }

//     componentWillUnmount() {
//         this.state.disposer();
//     }

//     onChange = (dates: moment.Moment[], dateStrings: string[]) => {
//         this.setState({"dates": dates})
//         let {startValuePropsName, endValuePropsName} = this.props.field.componentProps as IDateRangeProps;
//         this.props.onChange({[startValuePropsName] : dateStrings[0], [endValuePropsName]: dateStrings[1]});
//     }

//     render() {
//         let {field} = this.props;
        // return <span id={`${field.id}-start`} className="fl-daterange-field-start" style={{marginRight: '5px'}} >
        //     <DatePicker.RangePicker
        //         onChange={this.onChange}
        //         format={this.state.dateFormat}
        //         />
        // </span>
//     }
// }


import DatePicker from 'antd/es/date-picker';

export const DateRangeView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as IDateRangeProps;
    let {dateFormat, mode, defaultStartValue, defaultEndValue} = (props.field.componentProps as IDateRangeProps);

    const localStore = useLocalStore(() => {
        return {
            get dates(): Moment[]  {return [localStore.defaultStart, localStore.defaultEnd]},
            defaultValue: component.defaultValue,
            dateMode : (mode ? mode : 'date') as "time"|"date"|"month"|"year",
            defaultStart : !!defaultStartValue ? moment(defaultStartValue, dateFormat) : null,
            defaultEnd  : !!defaultEndValue ? moment(defaultEndValue, dateFormat) : null,
            get dateFormat() : string {
                switch (component.mode) {
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
            <span id={`${props.field.id}-start`} className="fl-daterange-field-start" style={{marginRight: '5px'}} >
            <DatePicker.RangePicker onChange={_onChange} format={localStore.dateFormat}/>
            </span>
        </React.Suspense>
    });
};
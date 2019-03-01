import { InputProps } from "antd/lib/input/Input";
import { CheckboxProps } from "antd/lib/checkbox/Checkbox";
import { CheckboxGroupProps } from "antd/lib/checkbox/index";
import { DatePickerProps } from "antd/lib/date-picker/interface";
import { RangePickerProps } from "antd/lib/date-picker/interface";
import { InputNumberProps} from "antd/lib/input-number/index";
import { RadioGroupProps } from "antd/lib/radio/index";
import { SelectProps } from "antd/lib/select/index";
import { CascaderProps } from "antd/lib/cascader/index";
import { TransferProps } from "antd/lib/transfer/index";

import { ICondition } from "./condition";
import FormStore from "../state/FormStore";
import { RateProps } from "antd/lib/rate/index";
import { SwitchProps } from "antd/lib/switch/index";
import { SliderProps } from "antd/lib/slider";
import { TextAreaProps } from "antd/lib/input";
import {IValidationRule} from "./field.validation";

/* CheckboxGroupProps|CheckboxProps|InputProps  */
export class FieldTypes {
    static text : string = "text";
    static input: string = "input";
    static checkbox: string = "checkbox";
    static number: string = "number";
    static select: string = "select";
    static radiogroup: string = "radiogroup";
    static checkboxgroup: string = "checkboxgroup";
    static textarea: string = "textarea";
    static daterange: string = "daterange";
    static datepicker: string = "datepicker";
    static monthpicker: string = "monthpicker";
    static timepicker: string = "timepicker";
    static yearpicker: string = "yearpicker";
    static rangepicker: string = "rangepicker";
    static rate: string = "rate";
    static slider: string = "slider";
    static textblock : string = "textblock";
}

export interface DateConstraintDuration {
    years? : number;
    quarters? : number;
    months?: number;
    days?: number;
}
export interface DateConstraint {
    from?: "now"|"start"|"end";
    relative: DateConstraintDuration;
}
export interface ChoiceOption {
    label : string;
    value: any;
    onChange?: any;
    disabled?: boolean;
    children?: ChoiceOption[]
}

export interface TransferItem {
    key : string;
    title: string;
    description: string;
    disabled: boolean;
}

export interface IInternalProps {

}

// Marker interface, no special properties required;
export interface ICheckboxProps extends CheckboxProps {
    defaultValue? : boolean;
}


export interface ICheckboxGroupProps extends CheckboxGroupProps {
    defaultValue?: (string|number|boolean)[],
    options: ChoiceOption[]
}

export interface INumberProps extends InputNumberProps {
    defaultValue?: number
}

export interface IDatePickerProps extends DatePickerProps {
    dateFormat: string;
}

export interface IDateRangeProps extends RangePickerProps {
    dateFormat : string;
    startValuePropsName?: string;
    endValuePropsName?: string;
    defaultStartValue?: string;
    defaultEndValue?  : string;
    minStartDate?: DateConstraint;
    maxEndDate?: DateConstraint;
    maxRange?: DateConstraint;
}

export interface IInputProps extends InputProps {
    defaultValue?: string
}

export interface IRadioGroupProps extends RadioGroupProps {
    options: ChoiceOption[]
}

export interface ISelectProps extends SelectProps {
    options: ChoiceOption[]
}

export interface ITransferProps extends TransferProps {
    maxItems?: number;
}

export interface ChoiceOption {
    label : string;
    value: any;
    onChange?: any;
    disabled?: boolean;
}

export interface ICascaderProps extends CascaderProps {
    defaultValue?: string[]
}

export interface IStarRatingProps extends RateProps {
    defaultValue?: number;
}

export interface ISwitchProps extends SwitchProps {
    defaultChecked?: boolean
}

export interface ISliderProps extends SliderProps {

}

export interface ITextAreaProps extends TextAreaProps {

}

export interface ITextBlockProps {

}

export type IComponentProps = ICheckboxProps|ICheckboxGroupProps|IDatePickerProps|IDateRangeProps|
                            INumberProps|IRadioGroupProps|ISelectProps|IInputProps|ICascaderProps|
                            IStarRatingProps|ISwitchProps|ITransferProps|ISliderProps|ITextAreaProps|
                            ITextBlockProps;

export interface IFieldStorage {
    unique: boolean;
    name: string;
    type: string;
    customerKey: string;
    description: string;
    isNullable: boolean;
    isPrimaryKey: boolean;
    isRequired: boolean;
    isSendable: boolean;
}

export interface IFieldProps {
    id: string;
    name: string;
    uuid?: string;
    type?: string;
    label?: string;
    value? : any;
    inputType : string;
    helpText? : string;
    placeholder?: string;
    valuePropName: string;
    condition?: ICondition;
    storage?: IFieldStorage;
    validation?: IValidationRule;
    componentProps: IComponentProps
}
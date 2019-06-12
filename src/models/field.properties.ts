import { InputProps } from "antd/lib/input/Input";
import { CheckboxProps } from "antd/lib/checkbox/Checkbox";
import { CheckboxGroupProps } from "antd/lib/checkbox/index";
import { DatePickerProps, RangePickerValue } from "antd/lib/date-picker/interface";
import { RangePickerProps } from "antd/lib/date-picker/interface";
import { InputNumberProps} from "antd/lib/input-number/index";
import { RadioGroupProps, RadioProps } from "antd/lib/radio/index";
import { SelectProps } from "antd/lib/select/index";
import { CascaderProps } from "antd/lib/cascader/index";
import { TransferProps } from "antd/lib/transfer/index";
import { ICondition } from "./condition";
import { RateProps } from "antd/lib/rate/index";
import { SwitchProps } from "antd/lib/switch/index";
import { SliderProps } from "antd/lib/slider";
import { TextAreaProps } from "antd/lib/input";
import { IValidationRule } from "./validation";
import { IFieldOptions } from "./field.options";
import { CSSProperties } from 'react';

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

export interface IDateDurationConstraint {
    years? : number;
    quarters? : number;
    months?: number;
    days?: number;
}
export interface IDateRangeConstraint {
    from?: "now"|"start"|"end";
    relative: IDateDurationConstraint;
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

export interface IFieldInternalProps {
    icon?: string;
    width?: number;
    children?: any[];
    showLabel?: boolean;
    showLegend?: boolean;
    helpPlacement?: string;
    queryParam?: string;
    saveable?: boolean;
    location?: any;
}

export interface IFieldRuntimeProps {
    /** The following are computed values */
    readonly isHidden : boolean;
    readonly className : string;
    readonly isTouched : boolean;
    readonly isValidateable : boolean;
    readonly isValid : boolean;
    readonly isRequired : boolean;
    readonly currentValue : any;
    readonly isDisabled : boolean;
    readonly serialize: string ;
}

export interface ICheckboxProps extends CheckboxProps {
    defaultChecked? : boolean;
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
    minStartDate?: IDateRangeConstraint;
    maxEndDate?: IDateRangeConstraint;
    maxRange?: IDateRangeConstraint;
}

export interface IInputProps extends InputProps {
    defaultValue?: string
}

export interface IRadioGroupProps extends RadioGroupProps {
    options: ChoiceOption[]
}

export interface IRadioProps extends RadioProps {
    optionLabel: string;
    optionValue: string;
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

export interface IRangePickerProps extends RangePickerProps {
    defaultValue?: RangePickerValue;
}

export interface IHTMLFragmentProps {
    fragmentUrl: string;
    allowForms? : boolean;
    allowScripts? : boolean;
    allowPopups? : boolean;
    className: string;
    seamless: boolean;
    style: CSSProperties;
}

export interface ISliderProps extends SliderProps {

}

export interface ITextAreaProps extends TextAreaProps {

}

export interface ITextBlockProps {

}

export type IComponentProps = IRangePickerProps | ICheckboxProps|ICheckboxGroupProps|IDatePickerProps|IDateRangeProps|
                            INumberProps|IRadioGroupProps|ISelectProps|IInputProps|ICascaderProps|
                            IStarRatingProps|ISwitchProps|ITransferProps|ISliderProps|ITextAreaProps|
                            ITextBlockProps | IRadioProps;

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

export interface IFieldProps extends IFieldInternalProps {
    id: string;
    name: string;
    children?: any[];
    uuid?: string;
    type?: string;
    label?: string;
    value? : any;

    inputType : string;
    helpText? : string;
    placeholder?: string;
    condition?: ICondition;
    storage?: IFieldStorage;
    validation?: IValidationRule;
    componentProps: IComponentProps;
    fieldOptions: IFieldOptions;
}
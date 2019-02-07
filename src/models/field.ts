import {CheckboxOptionType} from "antd/lib/checkbox/Group"
import {Condition} from "./condition";
import {FieldOptions} from "./field.options";

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

export type RadioSelectCheckboxOption = CheckboxOptionType | { label: string, value: string, disabled?: boolean };
export interface IField {
    id: string;
    name: string;
    type: string;
    inputType?: string;
    icon?: string;
    width?: string;
    children?: RadioSelectCheckboxOption[];
    condition?: Condition
    storage?: IFieldStorage;
    showLegend?: boolean;
    showLabel?: boolean;
    label?: string;
    helpText?: string;
    helpPlacement?: string;
    placeholder: string;
    fieldOptions: FieldOptions;
    queryParam?: string;
    saveable?: boolean;
    value? : string;
    location: any;
}
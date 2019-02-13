import { FieldValidationRule } from "./field.validation";
export interface IFieldOptions {
    id: string;
    getValueFromEvent?: (...args: any[]) => any;
    initialValue?: any;
    normalize?: (value: any, prevValue: any, allValues: any) => any;
    rules?: FieldValidationRule[];
    trigger?: string;
    validateFirst?: boolean;
    validateTrigger?: string | string[];
    valuePropName?: string;
    hidden?: boolean;
}
export declare class FieldOptions implements IFieldOptions {
    id: string;
    getValueFromEvent?: (...args: any[]) => any;
    initialValue?: any;
    normalize?: (value: any, prevValue: any, allValues: any) => any;
    rules?: FieldValidationRule[];
    type: string;
    format?: string;
    trigger?: string;
    validateFirst?: boolean;
    validateTrigger?: string | string[];
    valuePropName?: string;
    hidden?: boolean;
    constructor(props: IFieldOptions);
}

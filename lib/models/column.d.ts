import { FormStoreType } from "../store/FormStore";
import { Field } from "./field";
import { IFieldProps } from "./field.properties";
import { IValidationError } from "./validation";
export interface IColumn {
    id: string;
    uuid?: string;
    _type?: string;
    name?: string;
    title?: string;
    span?: number;
    fields?: IFieldProps[];
}
export declare class Column implements IColumn {
    readonly _type: string;
    uuid: string;
    id: string;
    name: string;
    span: number;
    title: string;
    fields: Field[];
    store: FormStoreType;
    readonly errors: IValidationError[];
    readonly isValid: boolean;
    readonly idFieldMap: {
        [key: string]: Field;
    };
    readonly uuidFieldMap: {
        [key: string]: Field;
    };
    readonly numFields: number;
    addField(field: Field, index?: number): void;
    addFields(...fields: Field[]): void;
    removeField(index: number): void;
    swapFields(index1: number, index2: number): void;
    moveField(atIndex: number, toIndex: number): void;
    constructor(data: IColumn, store: any);
    initialize(data: IColumn, store: FormStoreType): void;
}

import { FormStoreType } from "../store/FormStore";
import { Column, IColumn } from "./column";
import { Field } from "./field";
import { IValidationError } from "./validation";
export interface ISection {
    id: string;
    uuid?: string;
    name: string;
    title?: string;
    gutter?: number;
    columns: IColumn[];
}
export declare class Section implements ISection {
    readonly _type: string;
    id: string;
    uuid: string;
    name: string;
    title: string;
    gutter: number;
    columns: Column[];
    store: FormStoreType;
    readonly errors: IValidationError[];
    readonly numFields: number;
    addColumn(column: Column, index?: number): void;
    removeColumn(index: number): void;
    swapColumns(index1: number, index2: number): void;
    moveColumn(atIndex: number, toIndex: number): void;
    readonly numColumns: number;
    readonly isValid: boolean;
    readonly idFieldMap: {
        [key: string]: Field;
    };
    readonly uuidFieldMap: {
        [key: string]: Field;
    };
    initialize(data: ISection, store: FormStoreType): void;
    constructor(data: ISection, store: FormStoreType);
}

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
    get errors(): IValidationError[];
    get numFields(): number;
    addColumn(column: Column, index?: number): void;
    removeColumn(index: number): void;
    swapColumns(index1: number, index2: number): void;
    moveColumn(atIndex: number, toIndex: number): void;
    get numColumns(): number;
    get isValid(): boolean;
    get idFieldMap(): {
        [key: string]: Field;
    };
    get uuidFieldMap(): {
        [key: string]: Field;
    };
    get asPlainObject(): ISection;
    initialize(data: ISection, store: FormStoreType): void;
    constructor(data: ISection, store: FormStoreType);
}

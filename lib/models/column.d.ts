import Field from "./field";
import FormStore from "../state/FormStore";
export interface IColumn {
    uuid?: string;
    id?: string;
    name?: string;
    title?: string;
    fields?: Field[];
}
declare class Column implements IColumn {
    readonly _type: string;
    uuid: string;
    id: string;
    name: string;
    title: string;
    fields: Field[];
    store: FormStore;
    readonly errors: any[];
    readonly isValid: boolean;
    readonly fieldMetadata: any;
    readonly numFields: number;
    addField(field: Field, index?: number): void;
    removeField(index: number): void;
    moveField(atIndex: number, toIndex: number): void;
    constructor(data: IColumn, store: any);
    initialize(data: IColumn, store: FormStore): void;
}
export default Column;

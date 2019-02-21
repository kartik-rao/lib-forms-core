import Column from "./column";
import FormStore from "../state/FormStore";
export interface ISection {
    id?: string;
    name?: string;
    title?: string;
    gutter?: number;
    columns?: Column[];
    store?: FormStore;
}
declare class Section implements ISection {
    readonly _type: string;
    id: string;
    name: string;
    title: string;
    gutter: number;
    columns: Column[];
    store: FormStore;
    readonly errors: any[];
    readonly numFields: number;
    addColumn(column: Column, index?: number): void;
    removeColumn(index: number): void;
    moveColumn(atIndex: number, toIndex: number): void;
    readonly numColumns: number;
    readonly isValid: boolean;
    initialize(data: ISection, store: FormStore): void;
    constructor(data: ISection, store: FormStore);
}
export default Section;

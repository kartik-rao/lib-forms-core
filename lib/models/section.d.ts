import Column from "./column";
import FormStore from "../state/FormStore";
export interface ISection {
    id?: number;
    name?: string;
    title?: string;
    gutter?: number;
    columns?: Column[];
    store: FormStore;
}
declare class Section implements ISection {
    readonly _type: string;
    id: number;
    name: string;
    title: string;
    gutter: number;
    columns: Column[];
    store: FormStore;
    readonly isValid: boolean;
    initialize(data: ISection, store: FormStore): void;
    constructor(data: ISection, store: FormStore);
}
export default Section;

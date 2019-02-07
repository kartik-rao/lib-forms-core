import { IColumn } from "./column";
export interface ISection {
    id?: number;
    name?: string;
    gutter?: number;
    columns?: IColumn[];
}
export declare class Section implements ISection {
    id: number;
    name: string;
    title: string;
    gutter: number;
    columns: IColumn[];
    constructor(id: number, name: string, title: string, gutter: number, columns: IColumn[]);
}

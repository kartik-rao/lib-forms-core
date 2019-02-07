import { IField } from "./field";
export interface IColumn {
    id?: number;
    name?: string;
    title?: string;
    fields?: IField[];
}
export declare class Column implements IColumn {
    id: number;
    name: string;
    title: string;
    fields: IField[];
    constructor(id: number, name: string, title: string, fields: IField[]);
}

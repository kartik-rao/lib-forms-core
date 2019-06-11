import Column, {IColumn} from "./column";
import {action, decorate, observable, computed} from "mobx";
import FormStore from "../store/FormStore";
import {valueOrDefault} from "./common";
import Field from "./field";
import { IValidationError } from "./validation";

export interface ISection {
    id: string;
    uuid:string;
    name: string;
    title?: string;
    gutter?:number;
    columns: IColumn[];
}

class Section implements ISection {
    readonly _type : string = "Section";
    id: string;
    uuid:string;
    name: string;
    title: string;
    gutter: number;
    columns: Column[];
    store: FormStore;

    @computed get errors() : IValidationError[] {
        return this.columns.reduce((all: any[], c: Column) => {
            return all.concat(c.errors);
        }, <any[]>[]);
    }

    @computed get numFields() : number {
        return this.columns.reduce((total: number, column: Column) => {
            total = total + column.numFields;
            return total;
        }, 0);
    }

    @action addColumn(column: Column, index?: number) : void {
        if (typeof index != 'undefined' && index != null && index > -1) {
            this.columns.splice(index, 0, column);
        } else {
            this.columns.push(column);
        }
    }

    @action removeColumn(index: number) {
        this.columns.splice(index, 1)
    }

    @action swapColumns(index1: number, index2: number): void {
        let { columns } = this;
        [columns[index1], columns[index2]] = [columns[index2], columns[index1]];
    }

    @action moveColumn(atIndex: number, toIndex: number) {
        this.columns.splice(toIndex, 0, this.columns.splice(atIndex, 1)[0]);
    }

    @computed get numColumns() : number {
        return this.columns.length;
    }

    @computed get isValid() : boolean {
        return this.columns.every((c) => {
            return c.isValid;
        });
    }

    @computed get idFieldMap() : { [key:string]: Field; } {
        return this.columns.reduce((all: {}, c: Column)=>{
            return {...all, ...c.idFieldMap}
        }, {});
    }

    @action initialize(data: ISection, store: FormStore) {
        this.id = data.id;
        this.uuid = data.uuid;
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.title = valueOrDefault(data.title, '');
        this.gutter = valueOrDefault(data.gutter, 0);
        this.columns = valueOrDefault(<Column[]>data.columns, <Column[]>[]);
        this.store = store;
    }

    constructor(data: ISection, store: FormStore) {
        this.initialize(data, store);
    }
}

decorate(Section, {
    id: observable,
    name: observable,
    uuid: observable,
    title: observable,
    gutter: observable,
    columns: observable
})

export default Section
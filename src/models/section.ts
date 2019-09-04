import { action, computed, observable } from "mobx";
import { FormStoreType } from "../store/FormStore";
import { Column, IColumn } from "./column";
import { valueOrDefault } from "./common";
import { Field } from "./field";
import { IValidationError } from "./validation";

export interface ISection {
    id: string;
    uuid?:string;
    name: string;
    title?: string;
    gutter?:number;
    columns: IColumn[];
}

export class Section implements ISection {
    readonly _type : string = "Section";
    @observable id: string;
    @observable uuid:string;
    @observable name: string;
    @observable title: string;
    @observable gutter: number;
    @observable columns: Column[];
    store: FormStoreType;

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
        if(!column.span) {
            column.span = 6;
        }
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

    @computed get uuidFieldMap() : { [key:string]: Field; } {
        return this.columns.reduce((all: {}, c: Column)=>{
            return {...all, ...c.uuidFieldMap}
        }, {});
    }

    @computed get asPlainObject() : ISection {
        return {
            id: this.id,
            uuid: this.uuid,
            name: this.name,
            title: this.title,
            gutter: this.gutter,
            columns: this.columns.map((c) => {
                return c.asPlainObject
            })
        }
    }

    @action initialize(data: ISection, store: FormStoreType) {
        this.id = data.id;
        this.uuid = data.uuid;
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.title = valueOrDefault(data.title, '');
        this.gutter = valueOrDefault(data.gutter, 16);
        this.columns = valueOrDefault(<Column[]>data.columns, <Column[]>[]);
        this.store = store;
    }

    constructor(data: ISection, store: FormStoreType) {
        this.initialize(data, store);
    }
}
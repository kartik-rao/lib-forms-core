import Column from "./column";
import {action, decorate, observable, computed} from "mobx";
import FormStore from "../state/FormStore";

export interface ISection {
    id?: string;
    name?: string;
    title?: string;
    gutter?:number;
    columns?: Column[];
    store?: FormStore;
}

class Section implements ISection {
    readonly _type : string = "Section";
    id: string;
    name: string;
    title: string;
    gutter: number;
    columns: Column[];
    store: FormStore;

    @computed get errors() : any[] {
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
        if (index) {
            this.columns.splice(index, 0, column);
        } else {
            this.columns.push(column);
        }
    }

    @action removeColumn(index: number) {
        this.columns.splice(index, 1)
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

    @action initialize(data: ISection, store: FormStore) {
        this.id = data.id;
        this.name = data.name || `section-${data.id}`;
        this.title = data.title || '';
        this.gutter = data.gutter;
        this.columns = data.columns || <Column[]>[];
        this.store = store;
    }

    constructor(data: ISection, store: FormStore) {
        this.initialize(data, store);
    }
}

decorate(Section, {
    name: observable,
    id: observable,
    title: observable,
    gutter: observable,
    columns: observable
})

export default Section
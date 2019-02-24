import Column from "./column";
import {action, decorate, observable, computed} from "mobx";
import FormStore from "../state/FormStore";
import {valueOrDefault, uuid} from "./common";

export interface ISection {
    id?: string;
    uuid?:string;
    name?: string;
    title?: string;
    gutter?:number;
    columns?: Column[];
    store?: FormStore;
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

    @computed get fieldMetadata() : any {
        return this.columns.reduce((all: {}, c: Column)=>{
            return {...all, ...c.fieldMetadata}
        }, {});
    }

    @action initialize(data: ISection, store: FormStore) {
        this.id = data.id;
        this.uuid = valueOrDefault(data.uuid, uuid());
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.title = valueOrDefault(data.title, '');
        this.gutter = valueOrDefault(data.gutter, 0);
        this.columns = valueOrDefault(data.columns, <Column[]>[]);
        this.store = store;
    }

    constructor(data: ISection, store: FormStore) {
        this.initialize(data, store);
    }
}

decorate(Section, {
    name: observable,
    id: observable,
    uuid: observable,
    title: observable,
    gutter: observable,
    columns: observable
})

export default Section
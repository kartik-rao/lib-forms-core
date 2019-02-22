import {action, decorate, observable, computed} from "mobx";
import Field from "./field";
import FormStore from "../state/FormStore";
import {valueOrDefault, uuid} from "./common";

export interface IColumn {
    uuid?:string;
    id?  :string;
    name?:string;
    title?:string;
    fields?: Field[]
}

class Column implements IColumn {
    readonly _type : string = "Column";
    uuid: string;
    id: string;
    name: string;
    title: string;
    fields: Field[];
    store: FormStore;

    @computed get errors() : any[] {
        return this.fields.reduce((all: any[], f: Field)=>{
            return all.concat(f.validationErrors);
        }, <any[]>[]);
    }

    @computed get isValid() : boolean {
        return this.fields.every((f, i) => {
            return f.isValid;
        });
    }

    @computed get numFields() : number {
        return this.fields.length;
    }

    @action addField(field: Field, index?: number) : void {
        if (index) {
            this.fields.splice(index, 0, field);
        } else {
            this.fields.push(field);
        }
    }

    @action removeField(index: number) {
        this.fields.splice(index, 1)
    }

    @action moveField(atIndex: number, toIndex: number) {
        this.fields.splice(toIndex, 0, this.fields.splice(atIndex, 1)[0]);
    }

    constructor(data: IColumn, store) {
        this.initialize(data, store);
    }

    @action initialize(data: IColumn, store: FormStore) {
        this.uuid = valueOrDefault(data.uuid, uuid());
        this.store = store;
        this.id = data.id;
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.title = valueOrDefault(data.title, '');
        this.fields = valueOrDefault(data.fields, <Field[]>[]);
    }
}

decorate(Column, {
    name: observable,
    uuid: observable,
    id: observable,
    title: observable,
    fields: observable
})

export default Column
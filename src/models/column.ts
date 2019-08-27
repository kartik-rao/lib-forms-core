import { action, computed, observable } from "mobx";
import { FormStoreType } from "../store/FormStore";
import { valueOrDefault } from "./common";
import { Field } from "./field";
import { IFieldProps } from "./field.properties";
import { IValidationError } from "./validation";

export interface IColumn {
    id  :string;
    uuid?:string;
    _type?: string;
    name?:string;
    title?:string;
    span?:number;
    fields?: IFieldProps[];
}

export class Column implements IColumn {
    readonly _type : string = "Column";
    @observable uuid: string;
    @observable id: string;
    @observable name: string;
    @observable span: number;
    @observable title: string;
    @observable fields: Field[];
    store: FormStoreType;

    @computed get errors() : IValidationError[] {
        return this.fields.reduce((all: any[], f: Field)=>{
            return all.concat(f.validator.errors);
        }, <any[]>[]);
    }

    @computed get isValid() : boolean {
        return this.fields.every((f, i) => {
            return f.isValid;
        });
    }

    @computed get idFieldMap() : { [key:string]:Field; } {
        return this.fields.reduce((all: {}, f: Field)=>{
            all[f.id] = f;
            return all;
        }, {});
    }

    @computed get numFields() : number {
        return this.fields.length;
    }

    @action addField(field: Field, index?: number) : void {
        if (typeof index != 'undefined' && index != null && index > -1) {
            this.fields.splice(index, 0, field);
        } else {
            this.fields.push(field);
        }
    }

    @action addFields(...fields: Field[]) {
        fields.forEach((f: Field) => this.addField(f));
    }

    @action removeField(index: number) {
        this.fields.splice(index, 1)
    }

    @action swapFields(index1: number, index2: number): void {
        let { fields } = this;
        [fields[index1], fields[index2]] = [fields[index2], fields[index1]];
    }

    @action moveField(atIndex: number, toIndex: number) {
        this.fields.splice(toIndex, 0, this.fields.splice(atIndex, 1)[0]);
    }

    constructor(data: IColumn, store) {
        this.initialize(data, store);
    }

    @action initialize(data: IColumn, store: FormStoreType) {
        this.uuid = data.uuid;
        this.store = store;
        this.id = data.id;
        this.span = data.span;
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.title = valueOrDefault(data.title, '');
        this.fields = valueOrDefault(<Field[]>data.fields, <Field[]>[]);
    }
}
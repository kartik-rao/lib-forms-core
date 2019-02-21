import {action, decorate, observable, computed} from "mobx";
import Field from "./field";
import FormStore from "../state/FormStore";

export interface IColumn {
    id?: number;
    name?: string;
    title?: string;
    fields?: Field[]
}

class Column implements IColumn {
    readonly _type : string = "Column";
    id: number;
    name: string;
    title: string;
    fields: Field[];
    store: FormStore;

    @computed get errors() : any {
        if (!this.fields || this.fields.length == 0) {
            return [];
        }
        let errors = []
        this.fields && this.fields.map((f: Field) => {
            errors = errors.concat(f.validationErrors)
        });
        return errors;
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
        this.store = store;
        this.id = data.id;
        this.name = name || `column-${data.id}`;
        this.title = data.title || '';
        this.fields = data.fields || [];
    }
}

decorate(Column, {
    name: observable,
    id: observable,
    title: observable,
    fields: observable
})

export default Column
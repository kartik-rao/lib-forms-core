import Field from "./field";

import {action, decorate, observable, computed} from "mobx";

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

    @computed isValid() : boolean {
        let result = true;
        this.fields.forEach((f) => {
            if (!f.isValid()) {
                return false;
            }
        });
        return true;
    }

    @computed numFields() : number {
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

    constructor(data: IColumn) {
        this.initialize(data);
    }

    @action initialize(data: IColumn) {
        this.id = data.id;
        this.name = name || `column-${data.id}`;
        this.title = data.title || '';
        this.fields = data.fields || [];
    }
}

decorate(Column, {
    name: observable,
    id: observable,
    title: observable.shallow,
    fields: observable.shallow
})

export default Column
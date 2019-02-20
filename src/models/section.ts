import Column from "./column";
import {action, decorate, observable, computed} from "mobx";
import FormStore from "../state/FormStore";

export interface ISection {
    id?: number;
    name?: string;
    title?: string;
    gutter?:number;
    columns?: Column[];
    store: FormStore;
}

class Section implements ISection {
    readonly _type : string = "Section";
    id: number;
    name: string;
    title: string;
    gutter: number;
    columns: Column[];
    store: FormStore;

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
    columns: observable.shallow
})

export default Section
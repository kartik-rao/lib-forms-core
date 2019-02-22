import Section from "./section";
import FormStore from "../state/FormStore";
import Column from "./column";
import Field from "./field";
import {action, decorate, observable, computed, observe} from "mobx";

export interface IPage {
    id: string;
    name?: string;
    icon?: string;
    sections?: Section[];
    title?: string;
    subtitle?: string;
    store?: FormStore;
}

class Page implements IPage {
    readonly _type : string = "Page";
    id: string;
    name: string;
    icon: string;
    sections: Section[];
    title: string;
    subtitle: string;
    store: FormStore;

    @computed get fieldNames() : string[] {
        let fieldNames: string[] = [];
        if (!this.sections || this.sections.length == 0) {
            return fieldNames;
        }
        this.sections.forEach((section: Section)=>{
            if (section.columns && section.columns.length > 0) {
                section.columns.forEach((column: Column) => {
                    if (column.fields) {
                        column.fields.forEach((field: Field)=> {
                            fieldNames.push(field.name);
                        });
                    }
                })
            }
        });
        return fieldNames;
    }

    @computed get errors() : any[] {
        return this.sections.reduce((all: any[], s: Section)=>{
            return all.concat(s.errors);
        }, <any[]>[]);
    }

    @computed get isValid() : boolean {
        return this.sections.every((s) => {
            return s.isValid;
        });
    }

    @computed get numSections() : number {
        return this.sections.length;
    }

    @computed get numFields() : number {
        return this.sections.reduce((total: number, s : Section) => {
            return total + s.numFields;
        }, 0);
    }

    @action addSection(section: Section, index?: number) : void {
        if (index) {
            this.sections.splice(index, 0, section);
        } else {
            this.sections.push(section);
        }
    }

    @action removeSection(index: number) {
        this.sections.splice(index, 1)
    }

    @action moveSection(atIndex: number, toIndex: number) {
        this.sections.splice(toIndex, 0, this.sections.splice(atIndex, 1)[0]);
    }

    @action private initialize(data: IPage, store: FormStore) {
        this.id = data.id;
        this.name = data.name || "";
        this.icon = data.icon || "";
        this.sections = data.sections || <Section[]>[];
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.store = store;
    }

    constructor (data: IPage, store: FormStore) {
        this.initialize(data, store);
    }
}

decorate(Page, {
    name: observable,
    icon: observable,
    sections: observable,
    title: observable,
    subtitle: observable
})

export default Page
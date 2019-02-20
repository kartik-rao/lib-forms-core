import Section from "./section";
import FormStore from "../state/FormStore";
import Column from "./column";
import Field from "./field";
import {action, decorate, observable, computed, observe} from "mobx";

export interface IPage {
    name?: string;
    icon?: string;
    sections?: Section[];
    title?: string;
    subtitle?: string;
    store: FormStore;
}

class Page implements IPage {
    readonly _type : string = "Page";
    name: string;
    icon: string;
    sections: Section[];
    title: string;
    subtitle: string;
    store: FormStore;

    @computed fieldNames() : string[] {
        let fieldNames: string[] = [];
        this.sections.forEach((section: Section)=>{
            section.columns.forEach((column: Column) => {
                column.fields.forEach((field: Field)=> {
                    fieldNames.push(field.name);
                })
            })
        });
        return fieldNames;
    }

    @computed isPageValid() : boolean {
        let result = true;
        this.sections.forEach((s) => {
            if (!s.isValid()) {
                return false;
            }
        })
        return result;
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
    sections: observable.shallow,
    title: observable,
    subtitle: observable
})

export default Page
import Section from "./section";
import {FormStore} from "../state/FormStore";
import {action, decorate, observable, computed} from "mobx";

export interface IPage {
    name?: string;
    icon?: string;
    sections?: Section[];
    type?: string;
    title?: string;
    subtitle?: string;
    wizard?: boolean;
    store: FormStore;
}

class Page implements IPage {
    readonly _type : string = "Page";
    name: string;
    icon: string;
    sections: Section[];
    title: string;
    subtitle: string;
    fieldNames: string[];
    store: FormStore;

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
    subtitle: observable,
    fieldNames: observable
})

export default Page
import Section, {ISection} from "./section";
import FormStore from "../store/FormStore";
import Column from "./column";
import Field from "./field";
import {action, decorate, observable, computed} from "mobx";
import {valueOrDefault, uuid} from "./common";
import { IValidationError } from "./validation";

export interface IPage {
    id: string;
    uuid?:string;
    name: string;
    icon?: string;
    sections: ISection[];
    title?: string;
    subtitle?: string;
}

class Page implements IPage {
    readonly _type : string = "Page";
    id: string;
    uuid: string;
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


    @computed get fieldIds() : string[] {
        let fieldIds: string[] = [];
        if (!this.sections || this.sections.length == 0) {
            return fieldIds;
        }
        this.sections.forEach((section: Section)=>{
            if (section.columns && section.columns.length > 0) {
                section.columns.forEach((column: Column) => {
                    if (column.fields) {
                        column.fields.forEach((field: Field)=> {
                            fieldIds.push(field.id);
                        });
                    }
                })
            }
        });
        return fieldIds;
    }

    @computed get idFieldMap() : { [key:string]:Field; }  {
        return this.sections.reduce((all: {}, s: Section)=>{
            return {...all, ...s.idFieldMap}
        }, {});
    }

    @computed get errors() : IValidationError[] {
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
        this.store = store;
        this.uuid = valueOrDefault(data.uuid, uuid());
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.icon = valueOrDefault(data.name, "");
        this.sections = valueOrDefault(<Section[]>data.sections, <Section[]>[]);
        this.title = valueOrDefault(data.title, "");
        this.subtitle = valueOrDefault(data.subtitle, "");
    }

    constructor (data: IPage, store: FormStore) {
        this.initialize(data, store);
    }
}

decorate(Page, {
    id: observable,
    name: observable,
    uuid: observable,
    icon: observable,
    sections: observable,
    title: observable,
    subtitle: observable
})

export default Page
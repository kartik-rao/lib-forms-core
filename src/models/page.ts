import { action, computed, observable } from "mobx";
import { FormStoreType } from "../store/FormStore";
import { Column } from "./column";
import { valueOrDefault } from "./common";
import { Field } from "./field";
import { ISection, Section } from "./section";
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

export class Page implements IPage {
    readonly _type : string = "Page";
    @observable id: string;
    @observable uuid: string;
    @observable name: string;
    @observable icon: string;
    @observable sections: Section[];
    @observable title: string;
    @observable subtitle: string;
    store: FormStoreType;

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

    @computed get uuidFieldMap() : { [key:string]:Field; }  {
        return this.sections.reduce((all: {}, s: Section)=>{
            return {...all, ...s.uuidFieldMap}
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
        if (typeof index != 'undefined' && index != null && index > -1) {
            this.sections.splice(index, 0, section);
        } else {
            this.sections.push(section);
        }
    }

    @action removeSection(index: number) {
        this.sections.splice(index, 1)
    }

    @action swapSections(index1: number, index2: number): void {
        let { sections } = this;
        [sections[index1], sections[index2]] = [sections[index2], sections[index1]];
    }

    @action moveSection(atIndex: number, toIndex: number) {
        this.sections.splice(toIndex, 0, this.sections.splice(atIndex, 1)[0]);
    }

    @action private initialize(data: IPage, store: FormStoreType) {
        this.id = data.id;
        this.store = store;
        this.uuid = data.uuid;
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.icon = valueOrDefault(data.name, "");
        this.sections = valueOrDefault(<Section[]>data.sections, <Section[]>[]);
        this.title = valueOrDefault(data.title, "");
        this.subtitle = valueOrDefault(data.subtitle, "");
    }

    constructor (data: IPage, store: FormStoreType) {
        this.initialize(data, store);
    }
}
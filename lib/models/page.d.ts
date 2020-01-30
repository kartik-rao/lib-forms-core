import { FormStoreType } from "../store/FormStore";
import { Field } from "./field";
import { ISection, Section } from "./section";
import { IValidationError } from "./validation";
export interface IPage {
    id: string;
    uuid?: string;
    name: string;
    icon?: string;
    sections: ISection[];
    title?: string;
    subtitle?: string;
}
export declare class Page implements IPage {
    readonly _type: string;
    id: string;
    uuid: string;
    name: string;
    icon: string;
    sections: Section[];
    title: string;
    subtitle: string;
    store: FormStoreType;
    get fieldNames(): string[];
    get fieldIds(): string[];
    get idFieldMap(): {
        [key: string]: Field;
    };
    get uuidFieldMap(): {
        [key: string]: Field;
    };
    get errors(): IValidationError[];
    get isValid(): boolean;
    get numSections(): number;
    get numFields(): number;
    addSection(section: Section, index?: number): void;
    removeSection(index: number): void;
    swapSections(index1: number, index2: number): void;
    moveSection(atIndex: number, toIndex: number): void;
    get asPlainObject(): IPage;
    private initialize;
    constructor(data: IPage, store: FormStoreType);
}

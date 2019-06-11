import Section, { ISection } from "./section";
import FormStore from "../store/FormStore";
import Field from "./field";
import { IValidationError } from "./validation";
export interface IPage {
    id: string;
    uuid: string;
    name: string;
    icon?: string;
    sections: ISection[];
    title?: string;
    subtitle?: string;
}
declare class Page implements IPage {
    readonly _type: string;
    id: string;
    uuid: string;
    name: string;
    icon: string;
    sections: Section[];
    title: string;
    subtitle: string;
    store: FormStore;
    readonly fieldNames: string[];
    readonly fieldIds: string[];
    readonly idFieldMap: {
        [key: string]: Field;
    };
    readonly errors: IValidationError[];
    readonly isValid: boolean;
    readonly numSections: number;
    readonly numFields: number;
    addSection(section: Section, index?: number): void;
    removeSection(index: number): void;
    swapSections(index1: number, index2: number): void;
    moveSection(atIndex: number, toIndex: number): void;
    private initialize;
    constructor(data: IPage, store: FormStore);
}
export default Page;

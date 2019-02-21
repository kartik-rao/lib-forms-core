import Section from "./section";
import FormStore from "../state/FormStore";
export interface IPage {
    id: string;
    name?: string;
    icon?: string;
    sections?: Section[];
    title?: string;
    subtitle?: string;
    store?: FormStore;
}
declare class Page implements IPage {
    readonly _type: string;
    id: string;
    name: string;
    icon: string;
    sections: Section[];
    title: string;
    subtitle: string;
    store: FormStore;
    readonly fieldNames: string[];
    readonly errors: any[];
    readonly isValid: boolean;
    readonly numSections: number;
    readonly numFields: number;
    addSection(section: Section, index?: number): void;
    removeSection(index: number): void;
    moveSection(atIndex: number, toIndex: number): void;
    private initialize;
    constructor(data: IPage, store: FormStore);
}
export default Page;

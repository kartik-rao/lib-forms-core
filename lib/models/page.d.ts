import Section from "./section";
import FormStore from "../state/FormStore";
export interface IPage {
    name?: string;
    icon?: string;
    sections?: Section[];
    title?: string;
    subtitle?: string;
    store: FormStore;
}
declare class Page implements IPage {
    readonly _type: string;
    name: string;
    icon: string;
    sections: Section[];
    title: string;
    subtitle: string;
    store: FormStore;
    readonly fieldNames: string[];
    readonly isPageValid: boolean;
    addSection(section: Section, index?: number): void;
    removeSection(index: number): void;
    moveSection(atIndex: number, toIndex: number): void;
    private initialize;
    constructor(data: IPage, store: FormStore);
}
export default Page;

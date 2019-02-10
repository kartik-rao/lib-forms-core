import { ISection } from "./section";
export interface IPage {
    name?: string;
    icon?: string;
    sections?: ISection[];
    type?: string;
    title?: string;
    subtitle?: string;
    wizard?: boolean;
}
export declare class Page implements IPage {
    name: string;
    icon: string;
    sections: ISection[];
    title: string;
    subtitle: string;
    fieldNames: string[];
    constructor(name: string, icon: string, sections: ISection[], title: string, subtitle: string);
}

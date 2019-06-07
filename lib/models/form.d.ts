import Page from "./page";
import FormStore from "../store/FormStore";
import { FormEvent } from "react";
import Field from "./field";
import { IFormProps, IFormTenant, IFormContent, IFormLayoutOptions, IFormStatus, IFormItemLayoutOptions } from "./form.properties";
import { IValidationError } from "./validation";
declare class Form implements IFormProps {
    id: string;
    uuid: string;
    exid: string;
    desc: string;
    name: string;
    tenant: IFormTenant;
    status: IFormStatus;
    content: IFormContent;
    layout: any;
    stopSubmit: boolean;
    submitTarget: string;
    formLayoutOptions: IFormLayoutOptions;
    itemLayoutOptions: IFormItemLayoutOptions;
    store: FormStore;
    submitError: string;
    successRedirect: string;
    errorRedirect: string;
    initialize(data: IFormProps, store: FormStore): void;
    constructor(data: IFormProps, store: FormStore);
    readonly isValid: boolean;
    readonly numPages: number;
    readonly numFields: number;
    addPage(p: Page, index?: number): void;
    removePage(index: number): void;
    swapPages(index1: number, index2: number): void;
    movePage(atIndex: number, toIndex: number): void;
    readonly isSubmittable: boolean;
    readonly idFieldMap: {
        [key: string]: Field;
    };
    readonly errors: IValidationError[];
    readonly values: {
        [key: string]: any;
    };
    handleSubmit(e: FormEvent): void;
}
export default Form;

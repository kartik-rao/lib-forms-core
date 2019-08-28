import { FormEvent } from "react";
import { FormStoreType } from "../store/FormStore";
import { Field } from "./field";
import { IFormContent, IFormProps, IFormStatus, IFormTenant } from "./form.properties";
import { FormLayoutOptions, ItemLayoutOptions } from './layout';
import { Page } from "./page";
import { IValidationError } from "./validation";
export declare class Form implements IFormProps {
    store: FormStoreType;
    uuid: string;
    id: string;
    exid: string;
    desc: string;
    name: string;
    tenant: IFormTenant;
    status: IFormStatus;
    content: IFormContent;
    layout: any;
    stopSubmit: boolean;
    submitTarget: string;
    submitError: string;
    formLayoutOptions: FormLayoutOptions;
    itemLayoutOptions: ItemLayoutOptions;
    successRedirect: string;
    errorRedirect: string;
    initialize(data: IFormProps, store: FormStoreType): void;
    constructor(data: IFormProps, store: FormStoreType);
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

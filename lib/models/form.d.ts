import { FormEvent } from "react";
import { FormStoreType } from "../store/FormStore";
import { Field } from "./field";
import { IFormContent, IFormProps, IFormStatus, IFormTenant } from "./form.properties";
import { FormLayoutOptions, ItemLayoutOptions } from './layout';
import { Page } from "./page";
import { IValidationError } from "./validation";
export declare enum SubmitState {
    NOT_SUBMITTED = "Not Submitted",
    SUBMITTING = "Submitting",
    SUCCESS = "Success",
    ERROR = "Error"
}
export declare enum SubmitResultType {
    AWAITING_SUBMIT = "Awaiting Submit",
    SUCCESS_REDIRECT = "Success Redirect",
    ERROR_REDIRECT = "Error Redirect",
    DEFAULT_SUCCESS_MESSAGE = "Default Success Message",
    DEFAULT_ERROR_MESSAGE = "Default Error Message",
    USER_SUCCESS_MESSAGE = "User Success Message",
    USER_ERROR_MESSAGE = "User Error Message"
}
export declare class Form implements IFormProps {
    store: FormStoreType;
    uuid: string;
    id: string;
    exid: string;
    description: string;
    name: string;
    tenant: IFormTenant;
    status: IFormStatus;
    content: IFormContent;
    layout: any;
    submitTarget: string;
    submitError: string;
    formLayoutOptions: FormLayoutOptions;
    itemLayoutOptions: ItemLayoutOptions;
    successRedirect: string;
    errorRedirect: string;
    submitSuccessMessage?: string;
    submitErrorMessage?: string;
    submitState: SubmitState;
    initialize(data: IFormProps, store: FormStoreType): void;
    constructor(data: IFormProps, store: FormStoreType);
    get isValid(): boolean;
    get numPages(): number;
    get numFields(): number;
    addPage(p: Page, index?: number): void;
    removePage(index: number): void;
    swapPages(index1: number, index2: number): void;
    movePage(atIndex: number, toIndex: number): void;
    get isSubmittable(): boolean;
    get idFieldMap(): {
        [key: string]: Field;
    };
    get uuidFieldMap(): {
        [key: string]: Field;
    };
    get errors(): IValidationError[];
    get values(): {
        [key: string]: any;
    };
    get asPlainObject(): IFormProps;
    get submitResultType(): SubmitResultType;
    handleSubmit(e: FormEvent): Promise<void>;
}

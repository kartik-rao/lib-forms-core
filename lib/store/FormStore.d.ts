import Form from "../models/form";
import Field from "../models/field";
export interface IFormStoreProps {
    values?: any;
    form?: Form;
    debug?: boolean;
}
declare class FormStore {
    errors: any;
    values: any;
    touched: any;
    currentPage: number;
    debug: boolean;
    form: Form;
    submitting: boolean;
    validationDisabled: boolean;
    conditionsDisabled: boolean;
    readonly idFieldMap: {
        [key: string]: Field;
    };
    readonly fieldNames: string[];
    readonly isValid: boolean;
    setSubmitting(value: boolean): void;
    readonly isSubmitting: boolean;
    readonly numPages: number;
    nextPage(): void;
    prevPage(): void;
    setForm(form: Form): void;
    setFieldValue(id: string, value: any): void;
    setFieldTouched(id: string): void;
    setFieldError(id: string, error: any): void;
    initialize(): void;
    constructor();
}
export default FormStore;

import Form from "../models/form";
declare class FormStore {
    errors: any;
    values: any;
    touched: any;
    currentPage: number;
    debug: boolean;
    form: Form;
    submitting: boolean;
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
    initialize(data: any): void;
    constructor(data: any);
}
export default FormStore;

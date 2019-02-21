import Form from "../models/form";
declare class FormStore {
    errors: any;
    values: any;
    touched: any;
    currentPage: number;
    debug: boolean;
    form: Form;
    addField(page: number, section: number, column: number): void;
    readonly isValid: boolean;
    setFieldValue(id: string, value: any): void;
    setFieldTouched(id: string): void;
    setFieldError(id: string, error: any): void;
    initialize(data: any): void;
    constructor(data: any);
}
export default FormStore;

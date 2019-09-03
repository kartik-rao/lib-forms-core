import { Field } from "../models/field";
import { Form } from "../models/form";
export declare const createFormStore: () => {
    errors: {};
    values: {};
    touched: {};
    currentPage: number;
    debug: boolean;
    form: Form;
    isReady: boolean;
    submitting: boolean;
    validationDisabled: boolean;
    conditionsDisabled: boolean;
    readonly idFieldMap: {
        [key: string]: Field;
    };
    readonly uuidFieldMap: {
        [key: string]: Field;
    };
    readonly fieldNames: string[];
    readonly isValid: boolean;
    setSubmitting(value: boolean): void;
    readonly isSubmitting: boolean;
    readonly numPages: number;
    readonly hasNextPage: boolean;
    readonly hasPrevPage: boolean;
    readonly isSubmittable: boolean;
    nextPage: () => void;
    prevPage: () => void;
    setForm: (form: Form) => void;
    setFieldValue: (id: string, value: any) => void;
    setFieldTouched: (id: string) => void;
    setFieldError: (id: string, error: any) => void;
} & import("mobx").IObservableObject;
export declare type FormStoreType = ReturnType<typeof createFormStore>;

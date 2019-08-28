import { IFormProps } from '..';
import { Field } from "../models/field";
import { Form } from "../models/form";
export declare const createFormStore: (formData?: IFormProps) => {
    errors: import("mobx").IObservableObject;
    values: import("mobx").IObservableObject;
    touched: import("mobx").IObservableObject;
    currentPage: import("mobx").IObservableValue<number>;
    debug: import("mobx").IObservableValue<boolean>;
    form: Form;
    isReady: import("mobx").IObservableValue<boolean>;
    submitting: import("mobx").IObservableValue<boolean>;
    validationDisabled: import("mobx").IObservableValue<boolean>;
    conditionsDisabled: import("mobx").IObservableValue<boolean>;
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
    nextPage: () => void;
    prevPage: () => void;
    setForm: (form: Form) => void;
    setFieldValue: (id: string, value: any) => void;
    setFieldTouched: (id: string) => void;
    setFieldError: (id: string, error: any) => void;
};
export declare type FormStoreType = ReturnType<typeof createFormStore>;

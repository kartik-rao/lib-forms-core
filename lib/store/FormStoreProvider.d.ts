import * as React from "react";
import { IFormProps } from '../models/form.properties';
export declare const formStoreContext: React.Context<{
    errors: import("mobx").IObservableObject;
    values: import("mobx").IObservableObject;
    touched: import("mobx").IObservableObject;
    currentPage: import("mobx").IObservableValue<number>;
    debug: import("mobx").IObservableValue<boolean>;
    form: import("..").Form;
    isReady: import("mobx").IObservableValue<boolean>;
    submitting: import("mobx").IObservableValue<boolean>;
    validationDisabled: import("mobx").IObservableValue<boolean>;
    conditionsDisabled: import("mobx").IObservableValue<boolean>;
    readonly idFieldMap: {
        [key: string]: import("..").Field;
    };
    readonly uuidFieldMap: {
        [key: string]: import("..").Field;
    };
    readonly fieldNames: string[];
    readonly isValid: boolean;
    setSubmitting(value: boolean): void;
    readonly isSubmitting: boolean;
    readonly numPages: number;
    nextPage: () => void;
    prevPage: () => void;
    setForm: (form: import("..").Form) => void;
    setFieldValue: (id: string, value: any) => void;
    setFieldTouched: (id: string) => void;
    setFieldError: (id: string, error: any) => void;
}>;
export declare const FormStoreProvider: React.FC<{
    initialState: IFormProps;
}>;

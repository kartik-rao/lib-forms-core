import * as React from "react";
import { FormStoreType } from "./FormStore";
import { IFormProps } from '../models/form.properties';
export declare const formStoreContext: React.Context<{
    env: string;
    debug: number | true;
    version: string;
    apiHost: string;
    errors: {};
    values: {};
    touched: {};
    currentPage: number;
    showDebug: boolean;
    form: import("..").Form;
    isReady: boolean;
    submitting: boolean;
    validationDisabled: boolean;
    conditionsDisabled: boolean;
    preventRedirects: boolean;
    preventSubmit: boolean;
    toggleShowDebug: () => void;
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
    readonly hasNextPage: boolean;
    readonly hasPrevPage: boolean;
    readonly isSubmittable: boolean;
    nextPage: () => void;
    prevPage: () => void;
    setForm: (form: import("..").Form) => void;
    setFieldValue: (id: string, value: any) => void;
    setFieldTouched: (id: string) => void;
    setFieldError: (id: string, error: any) => void;
} & import("mobx").IObservableObject>;
export interface FormStoreProviderProps {
    initialState?: IFormProps;
    formStore?: FormStoreType;
}
export declare const FormStoreProvider: React.FC<FormStoreProviderProps>;

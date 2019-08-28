import { FormStoreType } from "../store/FormStore";
import { Field } from "./field";
import { ValidationRule, IValidationError, IValidationRule } from "./validation";
export interface IValidationProps {
    store: FormStoreType;
    field: Field;
    rule: IValidationRule;
}
export declare class Validator {
    store: FormStoreType;
    field: Field;
    rule: ValidationRule;
    validationErrors: IValidationError[];
    readonly isValid: boolean;
    readonly errors: IValidationError[];
    formatError(errors: any): IValidationError;
    readonly isValidateable: boolean;
    validate(): void;
    readonly isRequired: boolean;
    initialize(data: IValidationProps): void;
    constructor(data: IValidationProps);
}

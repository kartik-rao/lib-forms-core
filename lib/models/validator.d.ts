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
    get isValid(): boolean;
    get errors(): IValidationError[];
    formatError(errors: any): IValidationError;
    get isValidateable(): boolean;
    validate(): void;
    get isRequired(): boolean;
    initialize(data: IValidationProps): void;
    constructor(data: IValidationProps);
}

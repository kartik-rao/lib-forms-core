import * as React from "react";
import { Field } from "../models/field";
export declare type ValidateStatus = "success" | "warning" | "error" | "validating" | "";
export declare const FieldView: React.FC<{
    field: Field;
    key: string;
}>;

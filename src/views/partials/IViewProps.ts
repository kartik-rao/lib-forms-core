import {IFieldProps} from "../../models/field.properties";

export interface IViewProps {
    field: IFieldProps;
    onChange:(e: any) => void;
    onBlur?: (e: any) => void;
}
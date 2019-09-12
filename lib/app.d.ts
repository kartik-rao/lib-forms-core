import "./forms.core.m.css";
export interface IFormRenderProps {
    formId: string;
    initialState?: any;
}
export declare function renderForm(selector: string, formId: string, initialState?: any): Promise<void>;

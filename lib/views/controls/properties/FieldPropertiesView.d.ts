import * as React from "react";
import { IFieldEditorView } from "./IFieldEditorView";
import { ChoiceOption } from "../../../models/field.properties";
import { FormComponentProps } from "antd/lib/form";
export interface IFieldPropertiesViewProps extends FormComponentProps, IFieldEditorView {
}
declare class FieldPropertiesView extends React.Component<IFieldPropertiesViewProps, any> {
    constructor(props: IFieldPropertiesViewProps);
    handleSubmit: (e: any) => void;
    updateOptions(options: ChoiceOption[]): void;
    render(): JSX.Element;
}
declare const WrappedFieldPropertiesView: import("antd/lib/form/interface").ConnectedComponentClass<typeof FieldPropertiesView, Pick<IFieldPropertiesViewProps, "editorStore" | "wrappedComponentRef">>;
export default WrappedFieldPropertiesView;

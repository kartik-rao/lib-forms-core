import * as React from "react";
import { IFieldEditorView } from "./IFieldEditorView";
import { FormComponentProps } from "antd/lib/form";
declare const WrappedFieldPropertiesView: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<FormComponentProps & IFieldEditorView, "editorStore">, any>;
export default WrappedFieldPropertiesView;

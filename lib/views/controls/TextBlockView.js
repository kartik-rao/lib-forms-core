import { useObserver } from "mobx-react";
import * as React from "react";
export const TextBlockView = (props) => {
    let { field } = props;
    let { defaultValue } = field.componentProps;
    return useObserver(() => {
        return React.createElement("p", { id: props.field.id, "data-uuid": props.field.uuid }, defaultValue);
    });
};

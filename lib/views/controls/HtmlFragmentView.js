import { __rest } from "tslib";
import * as React from "react";
import { useObserver } from "mobx-react";
export const HtmlFragmentView = (props) => {
    let { field } = props;
    let _a = field.componentProps, { allowForms, allowPopups, allowScripts, fragmentUrl, seamless } = _a, rest = __rest(_a, ["allowForms", "allowPopups", "allowScripts", "fragmentUrl", "seamless"]);
    let sandboxProps = [];
    if (allowForms) {
        sandboxProps.push("allow-forms");
    }
    if (allowPopups) {
        sandboxProps.push("allow-popups");
    }
    if (allowScripts) {
        sandboxProps.push("allow-scripts");
    }
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement("iframe", Object.assign({}, rest, { src: fragmentUrl, id: field.id, "data-uuid": field.uuid, sandbox: sandboxProps.join(" "), seamless: seamless })));
    });
};

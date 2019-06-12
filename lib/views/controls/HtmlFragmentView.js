import * as tslib_1 from "tslib";
import * as React from "react";
export class HTMLFragmentView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field } = this.props;
        let _a = field.componentProps, { allowForms, allowPopups, allowScripts, fragmentUrl, seamless } = _a, rest = tslib_1.__rest(_a, ["allowForms", "allowPopups", "allowScripts", "fragmentUrl", "seamless"]);
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
        return React.createElement("iframe", Object.assign({}, rest, { src: fragmentUrl, id: field.id, "data-uuid": field.uuid, sandbox: sandboxProps.join(" "), seamless: seamless }));
    }
}

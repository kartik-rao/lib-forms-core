import * as tslib_1 from "tslib";
import { observer } from "mobx-react";
import * as React from "react";
let TextBlockView = class TextBlockView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field } = this.props;
        return React.createElement("p", { id: field.id, "data-uuid": field.uuid }, field.value);
    }
};
TextBlockView = tslib_1.__decorate([
    observer
], TextBlockView);
export { TextBlockView };

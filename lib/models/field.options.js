import { FieldValidation } from "./field.validation";
import { valueOrDefault } from "./common";
export class FieldOptions {
    constructor(props) {
        // id: string = null;
        this.getValueFromEvent = null;
        this.initialValue = null;
        this.normalize = null;
        // this.id = props.id;
        this.getValueFromEvent = props.getValueFromEvent;
        this.initialValue = props.initialValue;
        this.normalize = props.normalize;
        this.type = props.type;
        this.format = props.format;
        this.rules = new FieldValidation().addRules(props.rules).rules;
        this.trigger = valueOrDefault(props.trigger, "onChange");
        this.validateFirst = valueOrDefault(props.validateFirst, false);
        this.validateTrigger = valueOrDefault(props.validateTrigger, ["onChange", "onBlur"]);
        this.valuePropName = valueOrDefault(props.valuePropName, 'value');
        this.hidden = props.hidden || false;
    }
}

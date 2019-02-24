const uuidv1 = require('uuid/v1');
export function valueOrDefault(value, defaultValue) {
    return (typeof (value) !== 'undefined' && value !== null ? value : defaultValue);
}
export function uuid() {
    return uuidv1();
}

const uuidv1 = require('uuid/v1');

export function valueOrDefault<T>(value: T, defaultValue: T|null): T {
    return (typeof(value) !== 'undefined' && value !== null ? value : defaultValue);
}

export function uuid() {
    return uuidv1();
}
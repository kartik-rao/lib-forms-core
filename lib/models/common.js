export function valueOrDefault(value, defaultValue) {
    return (typeof (value) !== 'undefined' && value !== null ? value : defaultValue);
}

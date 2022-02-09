import { Feature, Flag } from "..";

export function isOn(value: Feature | Flag | undefined): boolean {
    const _value = value instanceof Object ? (value as Feature).value : value;
    if (_value !== null && _value !== undefined) {
        return ['true', 't', 'yes', 'y', 'on', '1'].includes(_value.toString().trim().toLowerCase());
    }
    return false;
};

export function isOff(value: Feature | Flag | undefined): boolean {
    return !isOn(value);
};
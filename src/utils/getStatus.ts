import { DataModel, DataType } from "..";

export function isOn(value: DataModel | DataType | undefined): boolean {
    const _value = value instanceof Object ? (value as DataModel).value : value;
    if (_value !== null && _value !== undefined) {
        return ['true', 't', 'yes', 'y', 'on', '1'].includes(_value.toString().trim().toLowerCase());
    }
    return false;
};

export function isOff(value: DataModel | DataType | undefined): boolean {
    return !isOn(value);
};
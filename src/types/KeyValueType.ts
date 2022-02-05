import { ValueType } from '.';

export type KeyValueType = {
    [x: string]: ValueType | KeyValueType
} 
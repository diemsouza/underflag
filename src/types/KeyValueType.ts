import { ValueType } from '.';

export type KeyValueType = {
    [x: string]: ValueType | ValueType[] | KeyValueType | KeyValueType[] | undefined
} 
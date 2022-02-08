export type ValueType = boolean | number | string | null;

export type JSONObject = {
    [x: string]: ValueType | ValueType[] | JSONObject | JSONObject[] | undefined
}

export type JSONData = JSONObject | JSONObject[];

export type DataType = ValueType | JSONObject;

export enum ProviderEnum {
    Data = 'data',
    Cache = 'cache',
    Memory = 'memory'
};

export interface DataModel {
    key: string;
    value: DataType;
    description?: string;
    expireAt?: number;
    readonly origin?: ProviderEnum;
}
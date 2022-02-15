export type Primitive = string | number | boolean | null;

export type JSONObject = {
    [x: string]: Primitive | Primitive[] | JSONObject | JSONObject[] | undefined
}

export type JSONData = JSONObject | JSONObject[];

export type Flag = Primitive | JSONObject;

export enum Origin {
    Data = 'data',
    Cache = 'cache',
    Memory = 'memory'
};

export interface BaseFeature {
    key: string;
    value?: Flag;
    description?: string;
    expireAt?: number;
    readonly origin?: Origin;
}

export interface Feature extends BaseFeature {
    isOn: () => boolean;
}
import { ValueType } from '.';

export type JSONObject = {
    [x: string]: ValueType | ValueType[] | JSONObject | JSONObject[] | undefined
}

export type JSONData = JSONObject | JSONObject[];
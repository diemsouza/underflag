import { IDataProvider, BaseFeature, JSONObject, JSONData } from '..';

export interface JsonDataProviderOptions {
    /** Accept a json object or an array of json object */
    data: JSONData
};

export class JsonDataProvider implements IDataProvider {
    private data: BaseFeature[] = [];

    constructor(options: JsonDataProviderOptions) {
        if (options.data instanceof Array) {
            this.data = (options.data as JSONObject[])
                .filter(a => a.key)
                .map(a => ({
                    key: a.key,
                    value: a.value,
                    description: a.description
                })) as BaseFeature[];
        } else {
            const keys = Object.keys(options.data);
            this.data = keys.map(key => ({
                key,
                value: (options.data as JSONObject)[key]
            })) as BaseFeature[];
        }
    }

    async getAll(): Promise<BaseFeature[]> {
        return this.data;
    }

    async get(key: string): Promise<BaseFeature | undefined> {
        return this.data.find(a => a.key === key);
    }
}
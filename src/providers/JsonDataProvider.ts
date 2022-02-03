import { IDataProvider } from '../providers';
import { DataModel } from '../models';

interface KeyValue {
    [key: string]: any;
};

interface Options {
    /** Accept a object json data like key: value or a array with DataModel item */
    data: KeyValue | DataModel[]
};

export class JsonDataProvider implements IDataProvider {
    private data: KeyValue | DataModel[] = {};

    constructor(options: Options) {
        this.data = options.data;
    }

    async getAll(): Promise<DataModel[]> {
        if (this.data) {
            if (this.data instanceof Array) {
                return this.data;
            } else {
                const keys = Object.keys(this.data);
                return keys.map(key => ({ key, value: (this.data as KeyValue)[key] }))
            }
        }
        return [];
    }

    async get(key: string): Promise<DataModel | undefined> {
        if (this.data) {
            if (this.data instanceof Array) {
                const data = (this.data as DataModel[]).find(a => a.key === key);
                if (data) {
                    return data;
                }
            } else {
                const objValue = (this.data as KeyValue)[key];
                if (objValue !== undefined) {
                    return { key, value: objValue };
                }
            }
        }
        return undefined;
    }
}
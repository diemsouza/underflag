import { DataModel } from "..";

export function isDataProvider(object: unknown): object is IDataProvider {
    const _object = object as IDataProvider
    return _object.get !== undefined
        && _object.get instanceof Function
        && _object.getAll !== undefined
        && _object.getAll instanceof Function
}

export interface IDataProvider {
    /**
     * Get a feature by key or undefined if not found
     */
    get(key: string): Promise<DataModel | undefined>

    /**
     * Get all features
     */
    getAll(): Promise<DataModel[]>
}
import { DataModel } from "../models/DataModel";

export function isDataProvider(object: unknown): object is IDataProvider {
    const _object = object as IDataProvider
    return _object.get !== undefined
        && _object.get instanceof Function
        && _object.getAll !== undefined
        && _object.getAll instanceof Function
}

export interface IDataProvider {
    /**
     * Get a feature data
     * @param key Unique feature identifier
     * @returns A model with valid value (including null) or undefined if key not found
     */
    get(key: string): Promise<DataModel | undefined>

    /**
     * Get all feature data
     * @returns A list of model with valid value (including null)
     */
    getAll(): Promise<DataModel[]>
}
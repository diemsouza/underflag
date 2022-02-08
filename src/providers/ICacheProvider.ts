import { DataModel } from "..";

export function isCacheProvider(object: unknown): object is ICacheProvider {
    const _object = object as ICacheProvider
    return _object.get !== undefined
        && _object.get instanceof Function
        && _object.set !== undefined
        && _object.set instanceof Function
}

export interface ICacheProvider {
    /**
     * Get a feature by key or undefined if not found
     */
    get(key: string): Promise<DataModel | undefined>

    /**
     * Add a new feature or update if the key already exists
     */
    set(data: DataModel): Promise<void>
}
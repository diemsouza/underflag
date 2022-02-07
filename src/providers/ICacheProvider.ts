import { CacheModel } from "../models";

export function isCacheProvider(object: unknown): object is ICacheProvider {
    const _object = object as ICacheProvider
    return _object.get !== undefined
        && _object.get instanceof Function
        && _object.set !== undefined
        && _object.set instanceof Function
}

export interface ICacheProvider {
    /**
     * Get a feature data
     * @param key Unique feature identifier
     * @returns A CacheModel with value or a undefined value if not found
     */
    get(key: string): Promise<CacheModel | undefined>

    /**
     * Set a new value to cache
     * @param data CacheModel with a unique feature identifier and value
     */
    set(data: CacheModel): Promise<void>
}
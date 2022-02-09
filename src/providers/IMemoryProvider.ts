import { Feature } from "..";

export function isMemoryProvider(object: unknown): object is IMemoryProvider {
    const _object = object as IMemoryProvider
    return _object.get !== undefined
        && _object.get instanceof Function
        && _object.set !== undefined
        && _object.set instanceof Function
        && _object.getAll !== undefined
        && _object.getAll instanceof Function
        && _object.flushAll !== undefined
        && _object.flushAll instanceof Function
}

export interface IMemoryProvider {
    /**
     * Get feature by key or undefined if not found
     */
    get(key: string): Promise<Feature | undefined>

    /**
     * Add new feature or update if key already exists
     */
    set(data: Feature): Promise<void>

    /**
     * Get all features
     */
    getAll(): Promise<Feature[]>

    /**
     * Add a list of features or update if the keys already exists
     */
    setAll(data: Feature[]): Promise<void>

    /**
     * Delete all features
     */
    flushAll(): Promise<void>
}
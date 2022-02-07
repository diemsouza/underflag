import { MemoryModel } from "../models";

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
     * Get a feature data
     * @param key Unique feature identifier
     * @returns A MemoryModel with value or a undefined value if not found
     */
    get(key: string): Promise<MemoryModel | undefined>

    /**
     * Set a new value to memory
     * @param data MemoryModel with a unique feature identifier and value
     */
    set(data: MemoryModel): Promise<void>

    /**
     * Get all feature data
     * @returns A list of MemoryModel
     */
    getAll(): Promise<MemoryModel[]>

    /**
     * Set a list to memory
     * @param data List of MemoryModel with a unique feature identifier and value
     */
    setAll(data: MemoryModel[]): Promise<void>

    /**
     * Delete all features from memory
     */
    flushAll(): Promise<void>
}
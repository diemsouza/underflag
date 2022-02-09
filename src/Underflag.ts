import {
    IDataProvider, ICacheProvider, IMemoryProvider,
    JsonDataProvider, JSONData, Feature,
    isOn, isOff, Origin, isDataProvider, Flag
} from ".";

export interface UnderflagOptions {
    dataProvider: IDataProvider | JSONData
    cacheProvider?: ICacheProvider
    memoryProvider?: IMemoryProvider
}

interface GetOptions {
    noCache: boolean,
    noMemory: boolean
}

type UnFeature = Feature | undefined

type UnFlag = Flag | undefined

export class Underflag {
    private dataProvider: IDataProvider;
    private cacheProvider?: ICacheProvider;
    private memoryProvider?: IMemoryProvider;

    constructor(options: UnderflagOptions) {
        if (isDataProvider(options.dataProvider)) {
            this.dataProvider = options.dataProvider;
        } else {
            this.dataProvider = new JsonDataProvider({
                data: options.dataProvider as JSONData
            });
        }
        this.cacheProvider = options.cacheProvider;
        this.memoryProvider = options.memoryProvider;
    }

    private async getFromMemory(key: string): Promise<Feature | undefined> {
        if (!this.memoryProvider) return undefined;
        return await this.memoryProvider.get(key);
    }

    private async getFromCache(key: string): Promise<Feature | undefined> {
        if (!this.cacheProvider) return undefined;
        return await this.cacheProvider.get(key);
    }

    private async getFromData(key: string): Promise<Feature | undefined> {
        return await this.dataProvider.get(key);
    }

    private async setCache(data: Feature): Promise<void> {
        if (this.cacheProvider) {
            await this.cacheProvider.set(data);
        }
    }

    private async setMemory(data: Feature): Promise<void> {
        if (this.memoryProvider) {
            await this.memoryProvider.set(data);
        }
    }

    /**
     * Load all features from data provider to memory provider
     */
    async loadMemory(): Promise<void> {
        if (!this.memoryProvider) {
            throw new Error("Memory provider not found");
        }
        const data = await this.dataProvider.getAll();
        this.memoryProvider.setAll(data.map(a => ({
            key: a.key,
            value: a.value,
            description: a.description
        })));
    }

    /**
     * Clear memory provider
     */
    async flushMemory(): Promise<void> {
        if (!this.memoryProvider) {
            throw new Error("Memory provider not found");
        }
        return this.memoryProvider.flushAll();
    }

    /**
     * Get a feature by key
     */
    async getFeature(key: string, options?: GetOptions): Promise<Feature | undefined> {
        if (!options?.noMemory) {
            const memoryResult = await this.getFromMemory(key);
            if (memoryResult !== undefined) {
                return {
                    key,
                    value: memoryResult.value,
                    description: memoryResult.description,
                    origin: Origin.Memory
                };
            }
        }

        if (!options?.noCache) {
            const cacheResult = await this.getFromCache(key);
            if (cacheResult !== undefined) {
                await this.setMemory({ key, value: cacheResult.value })
                return {
                    key,
                    value: cacheResult.value,
                    description: cacheResult.description,
                    origin: Origin.Cache
                };
            }
        }

        const dataResult = await this.getFromData(key);
        if (dataResult !== undefined) {
            await this.setCache({ key, value: dataResult.value });
            await this.setMemory({
                key,
                value: dataResult.value,
                description: dataResult.description
            });
            return {
                key,
                value: dataResult.value,
                description: dataResult.description,
                origin: Origin.Data
            };
        }
        return undefined;
    }

    /**
     * Get a list of features by keys
     */
    async getFeatures(keys: string[], options?: GetOptions): Promise<UnFeature[]> {
        const list: UnFeature[] = [];
        for (const key of keys as string[]) {
            const result = await this.getFeature(key, options);
            list.push(result);
        }
        return list;
    }

    /**
     * Get all features from data provider
     */
    async getAllFeatures(): Promise<Feature[]> {
        return await this.dataProvider.getAll();
    }

    /**
     * Get a feature flag by key
     */
    async getFlag(key: string, options?: GetOptions): Promise<Flag | undefined> {
        const feature = await this.getFeature(key, options);
        return feature && feature.value;
    }

    /**
     * Get a list of feature flag by keys
     */
    async getFlags(keys: string[], options?: GetOptions): Promise<UnFlag[]> {
        const results = await this.getFeatures(keys, options);
        return results.map(a => a?.value);
    }

    /**
     * Return true if feature is on
     */
    async isOn(key: string, options?: GetOptions): Promise<boolean> {
        const result = await this.getFeature(key, options);
        return isOn(result as Feature);
    }

    /**
     * Return true if feature is off
     */
    async isOff(key: string, options?: GetOptions): Promise<boolean> {
        const result = await this.getFeature(key, options);
        return isOff(result as Feature);
    }

};

export default Underflag;

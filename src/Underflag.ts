import {
    IDataProvider, ICacheProvider, IMemoryProvider,
    JsonDataProvider, JSONData, BaseFeature, Feature,
    isOn, isOff, Origin, isDataProvider, Flag
} from ".";
import Debug from "debug";
const debug = Debug("underflag");

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
        debug("data provider defined");
        this.cacheProvider = options.cacheProvider;
        if (this.cacheProvider) {
            debug("cache provider defined");
        }
        this.memoryProvider = options.memoryProvider;
        if (this.memoryProvider) {
            debug("memory provider defined");
        }
    }

    private async getFromMemory(key: string): Promise<BaseFeature | undefined> {
        if (!this.memoryProvider) return undefined;
        debug(`getting feature ${key} from memory`);
        return await this.memoryProvider.get(key);
    }

    private async getFromCache(key: string): Promise<BaseFeature | undefined> {
        if (!this.cacheProvider) return undefined;
        debug(`getting feature ${key} from cache`);
        return await this.cacheProvider.get(key);
    }

    private async getFromData(key: string): Promise<BaseFeature | undefined> {
        debug(`getting feature ${key} from data`);
        return await this.dataProvider.get(key);
    }

    private async setCache(data: BaseFeature): Promise<void> {
        if (this.cacheProvider) {
            debug(`setting feature ${data.key} to cache`);
            await this.cacheProvider.set(data);
        }
    }

    private async setMemory(data: BaseFeature): Promise<void> {
        if (this.memoryProvider) {
            debug(`setting feature ${data.key} to memory`);
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
        debug(`loading all features (${data.length}) from data to memory`);
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
        debug("flusing memory");
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
                    origin: Origin.Memory,
                    isOn: () => isOn(memoryResult)
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
                    origin: Origin.Cache,
                    isOn: () => isOn(cacheResult)
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
                origin: Origin.Data,
                isOn: () => isOn(dataResult)
            };
        }
        return undefined;
    }

    /**
     * Get a list of features by keys
     */
    async getFeatures(keys: string[], options?: GetOptions): Promise<UnFeature[]> {
        const list: UnFeature[] = [];
        debug(`getting features ${keys.join(", ")}`);
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
        debug('getting all features from data');
        const features = await this.dataProvider.getAll();
        return features.map(a => ({
            key: a.key,
            value: a.value,
            description: a.description,
            origin: Origin.Data,
            isOn: () => isOn(a)
        }))
    }

    /**
     * Get a feature flag by key
     */
    async getFlag(key: string, options?: GetOptions): Promise<Flag | undefined> {
        debug(`getting feature flag ${key}`);
        const feature = await this.getFeature(key, options);
        return feature && feature.value;
    }

    /**
     * Get a list of feature flag by keys
     */
    async getFlags(keys: string[], options?: GetOptions): Promise<UnFlag[]> {
        debug(`getting features flags ${keys.join(", ")}`);
        const results = await this.getFeatures(keys, options);
        return results.map(a => a?.value);
    }

    /**
     * Return true if feature is on
     */
    async isOn(key: string, options?: GetOptions): Promise<boolean> {
        debug(`checking if feature ${key} is on`);
        const result = await this.getFeature(key, options);
        return isOn(result);
    }

    /**
     * Return true if feature is off
     */
    async isOff(key: string, options?: GetOptions): Promise<boolean> {
        debug(`checking if feature ${key} is off`);
        const result = await this.getFeature(key, options);
        return isOff(result);
    }

};

export default Underflag;

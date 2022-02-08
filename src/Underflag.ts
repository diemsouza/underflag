import {
    IDataProvider, ICacheProvider, IMemoryProvider,
    JsonDataProvider, JSONData, DataModel,
    isOn, isOff, ProviderEnum, isDataProvider, DataType
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

type UnDataModel = DataModel | undefined

type UnDataType = DataType | undefined

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

    private async getFromMemory(key: string): Promise<DataModel | undefined> {
        if (!this.memoryProvider) return undefined;
        return await this.memoryProvider.get(key);
    }

    private async getFromCache(key: string): Promise<DataModel | undefined> {
        if (!this.cacheProvider) return undefined;
        return await this.cacheProvider.get(key);
    }

    private async getFromData(key: string): Promise<DataModel | undefined> {
        return await this.dataProvider.get(key);
    }

    private async setCache(data: DataModel): Promise<void> {
        if (this.cacheProvider) {
            await this.cacheProvider.set(data);
        }
    }

    private async setMemory(data: DataModel): Promise<void> {
        if (this.memoryProvider) {
            await this.memoryProvider.set(data);
        }
    }

    /**
     * Load all features from data provider to memory provider
     */
    async loadMemory(): Promise<DataModel[]> {
        if (!this.memoryProvider) {
            throw new Error("Memory provider is not defined");
        }
        const data = await this.dataProvider.getAll();
        this.memoryProvider.setAll(data.map(a => ({
            key: a.key,
            value: a.value,
            description: a.description
        })));
        return data;
    }

    /**
     * Clear memory provider
     */
    async flushMemory(): Promise<void> {
        if (!this.memoryProvider) {
            throw new Error("Memory provider is not defined");
        }
        return this.memoryProvider.flushAll();
    }

    /**
     * Get a feature by key
     */
    async get(key: string, options?: GetOptions): Promise<DataModel | undefined> {
        if (!options?.noMemory) {
            const memoryResult = await this.getFromMemory(key);
            if (memoryResult !== undefined) {
                return {
                    key,
                    value: memoryResult.value,
                    description: memoryResult.description,
                    origin: ProviderEnum.Memory
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
                    origin: ProviderEnum.Cache
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
                origin: ProviderEnum.Data
            };
        }
        return undefined;
    }

    /**
     * Get a list of features by keys
     */
    async getMany(keys: string[], options?: GetOptions): Promise<UnDataModel[]> {
        const list: UnDataModel[] = [];
        for (const key of keys as string[]) {
            const result = await this.get(key);
            list.push(result);
        }
        return list;
    }

    /**
     * Get all features from data provider
     */
    async getAll(): Promise<DataModel[]> {
        const data = await this.dataProvider.getAll();
        return data;
    }

    /**
     * Get a feature value by key
     */
    async getValue(key: string, options?: GetOptions): Promise<DataType | undefined> {
        const result = await this.get(key, options);
        return result && result.value;
    }

    /**
     * Get a list of features by keys
     */
    async getValues(keys: string[], options?: GetOptions): Promise<UnDataType[]> {
        const results = await this.getMany(keys);
        return results.map(a => a?.value);
    }

    /**
     * Return true if feature is on
     */
    async isOn(key: string, options?: GetOptions): Promise<boolean> {
        const result = await this.get(key, options);
        return isOn(result as DataModel);
    }

    /**
     * Return true if feature is off
     */
    async isOff(key: string, options?: GetOptions): Promise<boolean> {
        const result = await this.get(key, options);
        return isOff(result as DataModel);
    }

};

export default Underflag;

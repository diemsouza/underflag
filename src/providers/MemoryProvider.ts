import { IMemoryProvider, BaseFeature } from '..'

export interface MemoryProviderOptions {
    /** Lifetime (in seconds) of each feature in memory */
    lifetime: number
    /** If provided, when hit the limit of features, it'll add the next in the end and remove the first. Default: 0 (unlimited) */
    limit?: number
}

export class MemoryProvider implements IMemoryProvider {
    private data: BaseFeature[] = [];
    private lifetime: number;
    private limit?: number;

    constructor(options: MemoryProviderOptions) {
        this.lifetime = options.lifetime;
        this.limit = options.limit;
    }

    private expire(): void {
        if (this.data.length) {
            const now = Date.now();
            this.data = this.data.filter(a => a.expireAt! >= now);
        }
    }

    async get(key: string): Promise<BaseFeature | undefined> {
        if (!this.data.length) return undefined;
        this.expire();
        const item = this.data.find(a => a.key === key);
        return item ? item : undefined;
    }

    async set(data: BaseFeature): Promise<void> {
        if (!this.lifetime) return;
        data.expireAt = Date.now() + this.lifetime * 1000;
        this.data.push(data);
        if (this.limit && this.data.length > this.limit) {
            this.data.shift();
        }
    }

    async getAll(): Promise<BaseFeature[]> {
        this.expire();
        return this.data;
    }

    async setAll(data: BaseFeature[]): Promise<void> {
        if (!this.lifetime) return;
        const expireAt = Date.now() + this.lifetime * 1000;
        this.data = (this.limit && data.length > this.limit
            ? data.slice(0, this.limit)
            : data).map(a => {
                a.expireAt = expireAt;
                return a;
            });
    }

    async flushAll(): Promise<void> {
        this.data = [];
    }
}
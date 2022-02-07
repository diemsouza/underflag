import { ICacheProvider, JsonDataProvider, MemoryProvider } from '.';
import Underflag from './Underflag';
import { ProviderEnum } from './enums'
import { CacheModel } from './models';

describe('Underflag', () => {

    describe('Get feature status', () => {

        test('should return flag on for feature true', async () => {
            const dataProvider = { test: true };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOn('test')).resolves.toBeTruthy();
        });

        test('should return flag off for feature false', async () => {
            const dataProvider = { test: false };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOff('test')).resolves.toBeTruthy();
        });

        test('should return flag on for feature 1', async () => {
            const dataProvider = { test: 1 };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOn('test')).resolves.toBeTruthy();
        });

        test('should return flag off for feature 0', async () => {
            const dataProvider = { test: 0 };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOff('test')).resolves.toBeTruthy();
        });

        test('should return flag on for feature "1"', async () => {
            const dataProvider = { test: "1" };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOn('test')).resolves.toBeTruthy();
        });

        test('should return flag off for feature "0"', async () => {
            const dataProvider = { test: "0" };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOff('test')).resolves.toBeTruthy();
        });

        test('should return flag on for feature "on"', async () => {
            const dataProvider = { test: 'on' };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOn('test')).resolves.toBeTruthy();
        });

        test('should return flag off for feature "off"', async () => {
            const dataProvider = { test: 'off' };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOff('test')).resolves.toBeTruthy();
        });

        test('should return flag on for feature "t"', async () => {
            const dataProvider = { test: "t" };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOn('test')).resolves.toBeTruthy();
        });

        test('should return flag off for feature "f"', async () => {
            const dataProvider = { test: "f" };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOff('test')).resolves.toBeTruthy();
        });

        test('should return flag on for feature "y"', async () => {
            const dataProvider = { test: "y" };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOn('test')).resolves.toBeTruthy();
        });

        test('should return flag off for feature "n"', async () => {
            const dataProvider = { test: "n" };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOff('test')).resolves.toBeTruthy();
        });

        test('should return flag on for feature "yes"', async () => {
            const dataProvider = { test: "yes" };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOn('test')).resolves.toBeTruthy();
        });

        test('should return flag off for feature "no"', async () => {
            const dataProvider = { test: "no" };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOff('test')).resolves.toBeTruthy();
        });

        test('should return flag off for feature null', async () => {
            const dataProvider = { test: null };
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOff('test')).resolves.toBeTruthy();
        });

        test('should return flag off for feature undefined', async () => {
            const dataProvider = {};
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOff('test')).resolves.toBeTruthy();
        });
    });

    describe('Get feature value', () => {

        test('should return boolean true for feature true', async () => {
            const dataProvider = { test: true };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe(true);
        });

        test('should return boolean false for feature false', async () => {
            const dataProvider = { test: false };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe(false);
        });

        test('should return number 1 for feature 1', async () => {
            const dataProvider = { test: 1 };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe(1);
        });

        test('should return number 0 for feature 0', async () => {
            const dataProvider = { test: 0 };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe(0);
        });

        test('should return string "1" for feature "1"', async () => {
            const dataProvider = { test: "1" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("1");
        });

        test('should return string "0" for feature "0"', async () => {
            const dataProvider = { test: "0" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("0");
        });

        test('should return string "on" for feature "on"', async () => {
            const dataProvider = { test: "on" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("on");
        });

        test('should return string "off" for feature "off"', async () => {
            const dataProvider = { test: "off" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("off");
        });

        test('should return string "t" for feature "t"', async () => {
            const dataProvider = { test: "t" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("t");
        });

        test('should return string "f" for feature "f"', async () => {
            const dataProvider = { test: "f" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("f");
        });

        test('should return string "y" for feature "y"', async () => {
            const dataProvider = { test: "y" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("y");
        });

        test('should return string "n" for feature "n"', async () => {
            const dataProvider = { test: "n" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("n");
        });

        test('should return string "yes" for feature "yes"', async () => {
            const dataProvider = { test: "yes" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("yes");
        });

        test('should return string "no" for feature "no"', async () => {
            const dataProvider = { test: "no" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("no");
        });

        test('should return object null for feature null', async () => {
            const dataProvider = { test: null };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe(null);
        });

        test('should return undefined for feature undefined', async () => {
            const dataProvider = {};
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).toBeUndefined();
        });
    });

    describe('Get from provider', () => {

        test('should return from data with implicit json data provider', async () => {
            const dataProvider = { test: true };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.origin).toBe(ProviderEnum.Data)
        });

        test('should return from data with explicit json data provider', async () => {
            const dataProvider = new JsonDataProvider({ data: { test: true } });
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.origin).toBe(ProviderEnum.Data)
        });

        test('should return from cache', async () => {
            const dataProvider = { test: true };
            class CacheTestProvider implements ICacheProvider {
                async get(key: string): Promise<CacheModel | undefined> {
                    return { key, value: JSON.stringify(key === 'test') };
                }
                async set(data: CacheModel): Promise<void> {
                }
            }
            const cacheProvider = new CacheTestProvider();
            const underflag = new Underflag({ dataProvider, cacheProvider });
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.origin).toBe(ProviderEnum.Cache)
        });

        test('should return from memory', async () => {
            const dataProvider = { test: true };
            const memoryProvider = new MemoryProvider({ lifetime: 3 });
            const underflag = new Underflag({ dataProvider, memoryProvider });
            await underflag.loadMemory();
            const feature = await underflag.get('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.origin).toBe(ProviderEnum.Memory)
        });
    });

});
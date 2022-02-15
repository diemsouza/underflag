import { Underflag, ICacheProvider, JsonDataProvider, MemoryProvider, Origin, BaseFeature, Feature } from '..';

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

        test('should return one', async () => {
            const dataProvider = { test: true };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFlag('test');
            expect(feature).not.toBeUndefined();
        });

        test('should return many', async () => {
            const dataProvider = { test_a: true, test_b: false };
            const underflag = new Underflag({ dataProvider });
            const features = await underflag.getFlags(['test_a', 'test_b']);
            expect(features.length).toEqual(2);
        });

        test('should return boolean true for feature true', async () => {
            const dataProvider = { test: true };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe(true);
        });

        test('should return boolean false for feature false', async () => {
            const dataProvider = { test: false };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe(false);
        });

        test('should return number 1 for feature 1', async () => {
            const dataProvider = { test: 1 };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe(1);
        });

        test('should return number 0 for feature 0', async () => {
            const dataProvider = { test: 0 };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe(0);
        });

        test('should return string "1" for feature "1"', async () => {
            const dataProvider = { test: "1" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("1");
        });

        test('should return string "0" for feature "0"', async () => {
            const dataProvider = { test: "0" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("0");
        });

        test('should return string "on" for feature "on"', async () => {
            const dataProvider = { test: "on" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("on");
        });

        test('should return string "off" for feature "off"', async () => {
            const dataProvider = { test: "off" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("off");
        });

        test('should return string "t" for feature "t"', async () => {
            const dataProvider = { test: "t" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("t");
        });

        test('should return string "f" for feature "f"', async () => {
            const dataProvider = { test: "f" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("f");
        });

        test('should return string "y" for feature "y"', async () => {
            const dataProvider = { test: "y" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("y");
        });

        test('should return string "n" for feature "n"', async () => {
            const dataProvider = { test: "n" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("n");
        });

        test('should return string "yes" for feature "yes"', async () => {
            const dataProvider = { test: "yes" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("yes");
        });

        test('should return string "no" for feature "no"', async () => {
            const dataProvider = { test: "no" };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe("no");
        });

        test('should return object null for feature null', async () => {
            const dataProvider = { test: null };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.value).toBe(null);
        });

        test('should return undefined for feature undefined', async () => {
            const dataProvider = {};
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).toBeUndefined();
        });
    });

    describe('Get from provider', () => {

        test('should return from data with implicit json data provider', async () => {
            const dataProvider = { test: true };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.origin).toBe(Origin.Data)
        });

        test('should return from data with explicit json data provider', async () => {
            const dataProvider = new JsonDataProvider({ data: { test: true } });
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.origin).toBe(Origin.Data)
        });

        test('should return from cache', async () => {
            const dataProvider = { test: true };
            class CacheTestProvider implements ICacheProvider {
                async get(key: string): Promise<BaseFeature | undefined> {
                    return { key, value: JSON.stringify(key === 'test') };
                }
                async set(data: Feature): Promise<void> {
                }
            }
            const cacheProvider = new CacheTestProvider();
            const underflag = new Underflag({ dataProvider, cacheProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.origin).toBe(Origin.Cache)
        });

        test('should return from memory', async () => {
            const dataProvider = { test: true };
            const memoryProvider = new MemoryProvider({ lifetime: 3 });
            const underflag = new Underflag({ dataProvider, memoryProvider });
            await underflag.loadMemory();
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.origin).toBe(Origin.Memory)
        });
    });

    describe('Get feature', () => {

        test('should return one', async () => {
            const dataProvider = { test: true };
            const underflag = new Underflag({ dataProvider });
            const feature = await underflag.getFeature('test');
            expect(feature).not.toBeUndefined();
            expect(feature?.key).toBe('test');
            expect(feature?.isOn()).toBeTruthy();
        });

        test('should return many', async () => {
            const dataProvider = new JsonDataProvider({ data: { test_a: true, test_b: false } });
            const underflag = new Underflag({ dataProvider });
            const features = await underflag.getFeatures(['test_a', 'test_b']);
            expect(features?.length).toBe(2);
            expect(features[0]?.key).toBe('test_a');
            expect(features[1]?.key).toBe('test_b');
            expect(features[0]?.isOn()).toBeTruthy();
            expect(features[1]?.isOn()).toBeFalsy();
        });

    });

});
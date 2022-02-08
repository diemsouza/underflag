import { Underflag, JsonDataProvider, MemoryProvider, ProviderEnum } from '..';

describe('Data Provider', () => {
    describe('Memory', () => {

        const dataProvider = new JsonDataProvider({ data: { "test_a": true, "test_b": false } });
        const memoryProvider = new MemoryProvider({ lifetime: 3 });

        test('should return from memory', async () => {
            const underflag = new Underflag({ dataProvider, memoryProvider });
            await underflag.loadMemory();
            const feature = await underflag.get('test_a');
            expect(feature).not.toBeUndefined();
            expect(feature?.origin).toBe(ProviderEnum.Memory)
        });

        test('should return feature test_a on', async () => {
            const underflag = new Underflag({ dataProvider, memoryProvider });
            await underflag.loadMemory();
            await expect(underflag.isOn('test_a')).resolves.toBeTruthy();
        });

        test('should return feature test_b off', async () => {
            const underflag = new Underflag({ dataProvider, memoryProvider });
            await underflag.loadMemory();
            await expect(underflag.isOff('test_b')).resolves.toBeTruthy();
        });

        test('should return two features', async () => {
            const underflag = new Underflag({ dataProvider, memoryProvider });
            await underflag.loadMemory();
            const res = await underflag.getAll();
            expect(res).toBeInstanceOf(Array);
            expect(res.length).toEqual(2);
        });
    });
});
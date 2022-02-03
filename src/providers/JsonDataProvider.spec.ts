import { Underflag, JsonDataProvider } from '../';

describe('Data Provider', () => {
    describe('Json', () => {

        test('should return feature test_a on', async () => {
            const dataProvider = new JsonDataProvider({ data: { "test_a": true } });
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOn('test_a')).resolves.toBeTruthy();
        });

        test('should return feature test_b off', async () => {
            const dataProvider = new JsonDataProvider({ data: { "test_b": false } });
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOff('test_b')).resolves.toBeTruthy();
        });

        test('should return two features', async () => {
            const dataProvider = new JsonDataProvider({ data: { "test_a": true, "test_b": false } });
            const underflag = new Underflag({ dataProvider });
            const res = await underflag.getAll();
            expect(res).toBeInstanceOf(Array);
            expect(res.length).toEqual(2);
        });
    });
});
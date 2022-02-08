import { Underflag, JsonDataProvider } from '..';

describe('Data Provider', () => {
    describe('Json', () => {

        const jsonData = {
            test_a: true,
            test_b: false
        }

        const arrData = [
            { key: "test_a", value: true },
            { key: "test_b", value: false }
        ]

        test('should return feature test_a on with implicit json data provider', async () => {
            const underflag = new Underflag({ dataProvider: jsonData });
            await expect(underflag.isOn('test_a')).resolves.toBeTruthy();
        });

        test('should return feature test_a on with explicit json data provider', async () => {
            const dataProvider = new JsonDataProvider({ data: jsonData });
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOn('test_a')).resolves.toBeTruthy();
        });

        test('should return feature test_a on with implicit json data provider', async () => {
            const underflag = new Underflag({ dataProvider: jsonData });
            await expect(underflag.isOn('test_a')).resolves.toBeTruthy();
        });

        test('should return feature test_a on', async () => {
            const underflag = new Underflag({ dataProvider: jsonData });
            await expect(underflag.isOn('test_a')).resolves.toBeTruthy();
        });

        test('should return feature test_b off', async () => {
            const underflag = new Underflag({ dataProvider: jsonData });
            await expect(underflag.isOff('test_b')).resolves.toBeTruthy();
        });

        test('should return two features', async () => {
            const underflag = new Underflag({ dataProvider: jsonData });
            const res = await underflag.getAll();
            expect(res).toBeInstanceOf(Array);
            expect(res.length).toEqual(2);
        });

        test('should return two features when array of json object', async () => {
            const underflag = new Underflag({ dataProvider: arrData });
            const res = await underflag.getAll();
            expect(res).toBeInstanceOf(Array);
            expect(res.length).toEqual(2);
        });
    });
});
import { Underflag, isOn } from '../../src';
import { JsonDataProvider } from '../../src/providers';
import objData from './object.json';
import arrData from './array.json';

const print = async (underflag: Underflag, key: string) => {
    const data = await underflag.get(key);
    return {
        key,
        status: isOn(data) ? 'on' : 'off',
        value: data && data.value,
        origin: data && data.origin
    };
};

(async () => {
    // load json from file
    // const file = `${__dirname}${path.sep}array.json`;

    // use data provider
    const dataProvider = new JsonDataProvider({ data: arrData });
    const underflag = new Underflag({ dataProvider });

    // check flags
    const list: any[] = [];
    for (const key in objData) {
        list.push(await print(underflag, key));
    }
    list.push(await print(underflag, 'other'));
    console.table(list);

})();
import { Underflag, isOn } from '../../src';
import objData from './object.json';
import arrData from './array.json';

const print = async (underflag: Underflag, key: string) => {
    const data = await underflag.getFeature(key);
    return {
        key,
        status: isOn(data) ? 'on' : 'off',
        value: data?.value,
        origin: data?.origin
    };
};

(async () => {
    // use data provider
    const underflag = new Underflag({ dataProvider: arrData });

    // check flags
    const list: any[] = [];
    for (const key in objData) {
        list.push(await print(underflag, key));
    }
    list.push(await print(underflag, 'other'));
    console.table(list);

})();
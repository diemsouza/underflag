import { Underflag, isOn } from '../../src';
import { JsonDataProvider, MemoryProvider } from '../../src/providers';
import objData from '../json/object.json';

const print = async (underflag: Underflag, key: string) => {
    const data = await underflag.getFeature(key);
    return {
        key,
        status: isOn(data) ? 'on' : 'off',
        value: data && data.value,
        origin: data && data.origin
    };
}

const printAll = async (underflag: Underflag) => {
    // check feature flags
    const list: any[] = [];
    for (const key of Object.keys(objData).slice(0, 6)) {
        list.push(await print(underflag, key));
    }
    list.push(await print(underflag, 'other'));
    console.table(list);
}

(async () => {
    // use memory provider
    const underflag = new Underflag({
        dataProvider: new JsonDataProvider({ data: objData }),
        memoryProvider: new MemoryProvider({ lifetime: 3 })
    });

    // check feature flags
    console.log('from data...');
    await printAll(underflag);
    console.log('from memory after 2seg ...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await printAll(underflag);
    console.log('from memory after 3seg (expired) ...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    await printAll(underflag);
})();
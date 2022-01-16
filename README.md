
# underflag

This is a node **Feature Flag (Feature Toggle)** module with common data/cache providers like json, mongodb, mysql, redis and others.

If you need more flexibility in your apps, like enable/disable features in production without change environments to deploy manualy or rerun the pipeline, this module is pretty good for you and your team.

It's not only used to turn on or turn off features or test A/B, you can use it to config your app in realtime, getting values from anywere (file, memory, databases, cache, api, realy anywere) to inject in your business logic to change it when you want.

## Why should I use this one instead of create my own or use another?

- Because it's easy to use, small size and you don't need to spend more time to code again.

- Moreover, you can implement your own provider, just extending or implementing some provider or interface.

- With this module, you can using your own infrastructure, like local or cloud databases, very important when your product or company is not so flexibility to explore other services.

## Install

Using npm:

```bash
npm install underflag
```

Using yarn:

```bash
yarn add underflag
```

## How to use

Import the underflag and prepare to load data from some provider

```js
import { Underflag, JsonDataProvider } from "underflag";

const dataProvider = new JsonDataProvider({ "feature": true });
const underflag = new Underflag({ dataProvider });

if (await underflag.isOn("feature")) {
    // ...
}

```

## Others providers

- [MongoDB] (https://www.npmjs.com/package/underflag-mongodb)
- [Mongoose] (https://www.npmjs.com/package/underflag-mongoose)
- [Redis] (https://www.npmjs.com/package/underflag-redis)
- [Memcached] (https://www.npmjs.com/package/underflag-memcached)
- [MySQL] (https://www.npmjs.com/package/underflag-mysql)
- [PostgreSQL] (https://www.npmjs.com/package/underflag-postgresql)
- [DynamoDB] (https://www.npmjs.com/package/underflag-dynamodb)

## The possible flow using memory + cache + data providers

<p align="center" width="100%">
    <img src="assets/underflag-flow.jpg">
</p>

## Examples

### Using data provider with **Memory** provider

```js
import { Underflag, JsonDataProvider, MemoryProvider } from "underflag"; 

(async() => {
    // json data provider
    const data = {
        "sign_in": true,
        "sign_in_notification": true,
        "min_age": 18 
    };
    const dataProvider = new JsonDataProvider();
    // memory provider
    const memoryProvider = new MemoryProvider({ lifetime: 5 });

    const underflag = new Underflag({ dataProvider, memoryProvider });
    
    await underflag.isOn('feature'); // get from data provider and load memory
    await underflag.isOn('feature'); // get from memory provider
    // after 5seg
    await underflag.isOn('feature'); // get from data provider and load memory again
})();
```

If you prefer, you can load all features from data provider to memory.

```js
await underflag.loadMemory();
await underflag.isOn("feature"); // from memory
await underflag.flushMemory(); // reset memory
```

Check the feature status:

```js
const isOn = await underflag.isOn("feature"); // return true or false
const isOff = await underflag.isOff("feature"); // return true or false
```

Get the feature data with key, value and origin (memory, cache or data):

```js
const data = await underflag.get("feature");
console.log(data); // return undefined or feature object
```

Get the feature value:

```js
const value = await underflag.getValue("feature");
console.log(data); // return null or feature value
```

## Using your own data, cache or memory provider implementation

Just create your own class than implements IDataProvider, ICacheProvider or IMemoryProvider and pass to Underflag. 

### Feel free to contribute

- If you find a bug or have a good idea, share with us.

- And if you create a new module to data or cache provider, let us know to add here to help community.

### License

[MIT](LICENSE)
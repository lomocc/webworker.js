# worker.js
用更简单的方式来创建 `Worker`

## Install 安装

`npm install worker.js`

`yarn add worker.js`

## Usage 使用方法

```js
import worker from "worker-js";

let sleepEcho = worker((username)=>{
  let start = Date.now();
  while(Date.now() - start < 3000){}
  return `hello ${username}!`;
});
sleepEcho('worker').then(console.log, console.error); // Echo: hello worker!

let thrownError = worker(()=>{
  let start = Date.now();
  while(Date.now() - start < 3000){}
  willThrownError();
});
thrownError().then(console.log, console.error); // Error: "willThrownError is not defined"
```

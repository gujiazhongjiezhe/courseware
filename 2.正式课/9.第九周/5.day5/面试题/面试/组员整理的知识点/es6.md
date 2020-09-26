[toc]
#ES6,7,8新特性
#ES6

## 1. 类 ( class )
 @[ES6 引入了class（类）用来声明一个类，让JavaS
``` javascript
 
  //ES6声明类
class Teacher {
    constructor (name, age, subject, from) {
        let x = 100;
        this.name = name;
        this.age = age;
        this.subject = subject;
        this.from = from;
    }

//添加公有属性
teach () {
    console.log(`${this.name} 教 ${this.subject}`);
}

gety () {
    console.log('hello');
}

//添加静态属性方法,用static声明静态的属性和方法;静态属性和方法只能类自身访问,和实例,原型都没有关系;
static motto = '传道受业解惑';
static getx () {
    console.log('四十米大刀');
}
}

//没有兼容问题添加静态属性和方法
//Teacher,motto = 'xxx';
//Teacher.getx = function () {};

console.log(Teacher.motto); // 传道受业解惑
Teacher.getx(); // 四十米大刀

let n = new Teacher('sun', 19,  'js', 'zf');
console.log(n);
n.teach();

let m = new Teacher('马宾', 18, 'JS', 'zf');
console.log(m);// Teacher {name: "马宾", age: 18, subject: "JS", from: "zf"}
m.teach(); // 马宾 教 JS

console.log(n.teach === m.teach); // true

```
## 2. 模块化 ( Module )
 @[ES5不支持原生的模块化，在ES6中模块作为重要的组成部分被添加进来。模块的功能主要由 export 和 import 组成。每一个模块都有自己单独的作用域，模块之间的相互调用关系是通过 export 来规定模块对外暴露的接口，通过import来引用其它模块提供的接口。同时还为模块创造了命名空间，防止函数的命名冲突。]
### 2.1 导出
@[ES6允许在一个模块中使用export来导出多个变量或函数。]
``` javascript
 // 1. 单个导出 
export var job = 'FE';
export let x = 1;
export const y = 2;

export function sum(a, b) {
    return a + b
};

 // 2. 批量导出
var name = 'mabin';
var age = 'age';
var job = 'FE';

let x = 1;
const y = 2;

function sum(a, b) {
    return a + b
};
class Teacher {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
}

// 批量导出 : export { 要导出的变量 }
// 推荐使用批量导出 样可以很清晰的这个模块导出了哪些东西
export{ // 不是对象
    name, 
    age,
    job,
    x,
    y,
    sum,
    Teacher
}
```

### 2.2 导入
@[定义好模块的输出以后就可以在另外一个模块通过import引用。]

**导入注意事项**
 1. import {变量} from '带路径名的模块文件'
 2. 模块没有导出的变量不能导入  会报错
 3. html在引入模块化的js文件时, script 便签上要写 type="module"
``` javascript
// 1. 导入
import {name, age, job, x, y, sum} from "./4-export导出.js";

// 2. 在导入的时候给导出的变量重命名: as关键字
// import {原名 as 新名字} from 模块
import {Teacher as T } from "./5-export批量.js";

// 3. 全部导入: 把木块中导出的内容全部导入进来
import * as obj from './5-export批量.js';

// 4. eESModule: 提供了一个默认导出,其他模块在导入的时候可以不关心导出的名字是什么
export default function sum(a, b) {
    return a + b;
}
// 一个模块只能有一个export default，如果有多个就会报错；
// 如果模块是默认导出的,导入的时候不要写花括号,导入时的名字随意
```
### 2.3 动态导入
   async / await 是 ES6 新增的关键字，用于把异步处理程序变为同步；
   真实项目中我们经常将 async、Promise 和 ajax 结合起来一起使用
``` javascript
// import 只能是同步的,模块导入是静态的,发生在js代码执行之前,而且只能写在顶层作用域中,

// 但是有些场景需要动态导入模块
// 此时我们需要用 import() 方法
// import () 支持动态导入,返回一个promise实例,可以直接 .then ,在then的第一个回调收到的参数就是模块中的内容

// 动态导入就是想在什么地方导入就在什么地方导入,想什么时候导入就什么时候导入

// 3秒后 导入
setTimeout(() =>{
    import("./5-export批量.js").then((res) => {
        console.log(res);
    }, 3000);
})

// 动态导入模块的场景:
// 按需加载，如在点击的时候或者滑动的时候再去加载某个模块
// 条件加载，如果条件为true加载a模块，否则加载b模块
// 模块的路径是动态的，例如通过ajax从服务端获取的

// 动态加载多个加载: Promise.all([])
Promise.all([
    import('./4-export导出.js'),
    import('./5-export批量.js')
]).then((arr) => {
    console.log(arr);
})

// import() 和 async / await
// import() 会返回promise对象
async function getM() {
    let A = await import ('./a.js');
    let B = await import ('./b.js');
    return [A, B]
}
getModule().then((res) => {
    console.log('L51');
    console.log(res);
})
```

## 3. 箭头函数
**箭头函数可以替换函数表达式，但是不能替换函数声明, 箭头函数中，没有this。如果你在箭头函数中使用了this，那么该this一定就是外层的this。**

## 4. 函数参数默认值
**ES6支持在定义函数的时候为其设置默认值**
``` javascript
function add(x = 20, y = 30) { return x + y; }
```
## 5. 模板字符串
``` javascript
不使用模板字符串：
var name = 'Your name is ' + first + ' ' + last + '.'

使用模板字符串：
var name = `Your name is ${first} ${last}.`

在ES6中通过${}就可以完成字符串的拼接，只需要将变量放在大括号之中。
```
## 6. 解构赋值
@[解构赋值语法是JavaScript的一种表达式; 可以方便的从数组或者对象中快速提取值赋给定义的变量。]
### 1. 数组解构赋值
等号左边的变量的位置和等号右边的数组中值位置相同时，变量可以取得数组中该位置的值；
#### 1.1 顺序结构
``` javascript
let ary = [10, 50, 100, 200];
let [a, b, c] = ary; 
```
#### 1.2 数组中取某一个
```javascript
let [,, d] = ary; // 如果只想得到第三个，前面两个空着，但是需要写两个 ,
console.log(d);
```
#### 1.3 取出某一项
```javascript
// 第一项和第二项，剩余的统一放到一个数组中；
let [e, f, ...arr] = ary;
console.log(e); // 10
console.log(f); // 50
console.log(arr); // [100, 200]
```
#### 1.4  进一步解构
``` javascript
let ary2 = [10, ['a', 'b']];
let [g, [h, i]] = ary2;
```
#### 1.5 数组解构默认值
只有解构出来的值是 undefined 时默认值才会生效

### 2. 对象的结构解构
通常情况下获取一个对象的属性值是通过对象.属性名 或者 对象['属性名']
而对象的解构赋值就是通过变量和对象的属性对应时，就可以取得对象的改属性名的值
#### 2.1 解构赋值
``` javascript
let { name, age } = obj;
console.log(name);
console.log(age);
```
#### 2.2  如果只想要对象的某一个属性值
``` javascript
let obj2 = {
  name: '珠峰',
  age: 10,
  courses: ['js前端', '珠峰架构', 'UI设计师']
};
let {courses} = obj2;
```
#### 2.3 进一步解构
``` javascript 
let obj3 = {
  name: 'zhufeng',
  teacher: {
    js: ['马宾', '牛晓鑫', '....'],
    architect: ['']
  }
};
let { teacher: { js } } = obj3;
console.log(js); // 获取 obj3.teacher.js 的值
```
#### 2.4 重命名：为了避免重复声明
``` javascript 
let obj4 = {
  title: '高级前端工程师'
};
let title = 100;
let { title: title2 } = obj4;
```
#### 2.5 解构赋值的默认值
只有解构出来的值是 undefined 时默认值是才会生效
##7. 对象的属性简写
``` javascript 
let config = '110.156.23.24';
let pwd = '4323445';

let obj7 = {
  config,
  pwd,
};
```
## 8. Promise 对象
### 1. Promise实例对象有三种状态；
pending: 已经初始化，正在处理异步
fulfilled: 异步处理成功
rejected: 异步处理失败
**值得注意的是，Promise 的状态一旦发生变更，就会凝固，不会在发生变化；**
### 2. 基本用法
@[ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。]
``` javascript 
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
1. 在创建Promise示例时传递的回调函数中，存放的是异步执行的任务；
2. resolve 当异步处理成功后执行的，执行的是一个事件池，收集了后面所有的 then 方法的第一个参数；
3. reject 当异步处理失败后执行的，执行的也是一个事件池，收集了后面所有的 then 方法的第二个参数；

### 3.  Promise.prototype.then()
1. promise 实例对象的第一个 then 方法的回调函数会根据 new Promise() 时异步处理的情况来决定
2. 如果是 resolve 状态，就会执行第一个 then 方法的第一个回调函数，resolve 时传递的实参会传递给第一函数；
3. 如果是 reject 就会执行第二个，reject 时传递的实参会传给第二个函数
4. 但是后面的 then 方法里面的回调函数执行哪一个取决于执行前面的 then 方法中函数执行的情况；
5. 如果前一个 then 中回调没有返回 promise 实例，无论是第一个还是第二个执行成功了，都会执行后面的 then 的第一个回调函数。但是前一个 then 方法中报错了，就会执行第二个；
6. 如果前一个 then 方法中返回的是一个 promise 实例，后面的 then 方法中执行哪个取决于上一个 then 中返回的 promise 实例的状态，如果是 resolve 了，就会执行后面的第一个函数，如果是 reject 了，就会执行第二个函数；
### 4.  Promise.prototype.catch()
Promise.prototype.catch方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
### 5. Promise.prototype.finlly()
finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
``` javascript 
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
// 上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。
```
### 6. Promise.all()
Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
``` javascript 
const p = Promise.all([p1, p2, p3]);
```
上面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。``

### 7. Promise.race()
Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
``` javascript 
const p = Promise.all([p1, p2, p3]);
```
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

Promise.race()方法的参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。
### 8. Promise.allSteeled()
Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。该方法由 ES2020 引入。
``` javascript 
const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fetch('/api-3'),
];

await Promise.allSettled(promises);
removeLoadingIndicator();
// 上面代码对服务器发出三个请求，等到三个请求都结束，不管请求成功还是失败，加载的滚动图标就会消失。
```
该方法返回的新的 Promise 实例，一旦结束，状态总是fulfilled，不会变成rejected。状态变成fulfilled后，Promise 的监听函数接收到的参数是一个数组，每个成员对应一个传入Promise.allSettled()的 Promise 实例。
### 9. Promise.any()
Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态
Promise.any()跟Promise.race()方法很像，只有一点不同，就是不会因为某个 Promise 变成rejected状态而结束。
### 10. Promise.resolve()
将现有对象转为 Promise 对象
### 11.Promise.reject()
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
## 9. Let与Const
ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
Let   Const不能重复定义
Let有暂时性死区
const声明一个只读的常量。一旦声明，常量的值就不能改变。

## 10.扩展操作符(...)
### 扩展运算符的应用
1. 复制数组
数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
2. 合并数组
扩展运算符提供了数组合并的新写法。
3. 与解构赋值结合
扩展运算符可以与解构赋值结合起来，用于生成数组。
##11.函数的扩展
###1. 箭头函数
ES6 允许使用“箭头”（=>）定义函数。
**箭头函数有几个使用注意点: **
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
## 12.数组的扩展
### 1.Array.from()
Array.from方法用于将两类对象转为真正的数组
### 2. Array.of()
Array.of方法用于将一组值，转换为数组。
### 3.数组实例的 copyWithin()
数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)
```
它接受三个参数。
target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
这三个参数都应该是数值，如果不是，会自动转为数值。
### 4.数组实例的 find() 和 findIndex()
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
### 5.数组实例的 fill()
fill方法使用给定值，填充一个数组。
### 6.数组实例的 entries()，keys() 和 values()
ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

### 7.数组实例的 includes()
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。
### 8.数组实例的 flat()，flatMap()
数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
### 9.数组的空位
数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。
### 10.Array.prototype.sort() 的排序稳定性
排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变。

## 13.对象的新增方法

### 1. Object.is()
用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
### 2. Object.assign()
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。

注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
### 3. Object.getOwnPropertyDescriptors()
返回指定对象所有自身属性（非继承属性）的描述对象。
### 4. __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
1. __proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。目前，所有浏览器（包括 IE11）都部署了这个属性。
2. Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
3. 该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。
### 5. Object.keys()，Object.values()，Object.entries()
1. 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
2. Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
3. Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
### 6. Object.fromEntries()
1. Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。

## 14. Proxy
### 1. 概述
Proxy 用于修改某些操作的默认行为，Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
### 2. get()
get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
### 3. set()
set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，那么可以使用Proxy保证age的属性值符合要求。
### 4. apply()
apply方法拦截函数的调用、call和apply操作。
apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
### 5. has()
has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
has方法可以接受两个参数，分别是目标对象、需查询的属性名。
### 6. construct()
construct方法用于拦截new命令，下面是拦截对象的写法
construct方法可以接受两个参数。
· target：目标对象
· args：构造函数的参数对象
· newTarget：创造实例对象时，new命令作用的构造函数
### 7. deleteProperty()
deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
### 8. defineProperty()
defineProperty方法拦截了Object.defineProperty操作。
### 9. getOwnPropertyDescriptor()
getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
### 10. getPrototypeOf()
getPrototypeOf方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
· Object.prototype.__proto__
· Object.prototype.isPrototypeOf()
· Object.getPrototypeOf()
· Reflect.getPrototypeOf()
· instanceof
### 11. ownKeys()
ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
· Object.getOwnPropertyNames()
· Object.getOwnPropertySymbols()
· Object.keys()
· for...in循环
### 12.preventExtensions()
preventExtensions方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。
### 13.setPrototypeOf()
setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法。
### 14. Proxy.revocable()
Proxy.revocable方法返回一个可取消的 Proxy 实例。
### 15.this 问题
虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。

## 15.async 函数
### 1. 含义
ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
async 函数是什么？一句话，它就是 Generator 函数的语法糖。
前文有一个 Generator 函数，依次读取两个文件。

（1）内置执行器。
Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。
（2）更好的语义。
async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
（3）更广的适用性。
co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
（4）返回值是 Promise。
async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。

进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。
### 2. 基本用法
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
### 3. 语法
async函数的语法规则总体上比较简单，难点是错误处理机制。
#### 3.1. 返回 Promise 对象
async函数返回一个 Promise 对象。
async函数内部return语句返回的值，会成为then方法回调函数的参数。
#### 3.2. Promise 对象的状态变化
async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
#### 3.3. await 命令
正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
#### 3.4 错误处理
如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。
#### 3.5. 使用注意点
第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
### 4. async 函数的实现原理
async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
### 5. 与其他异步处理方法的比较
我们通过一个例子，来看 async 函数与 Promise、Generator 函数的比较。
假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。
### 6. 实例：按顺序完成异步操作
实际开发中，经常遇到一组异步操作，需要按照顺序完成。比如，依次远程读取一组 URL，然后按照读取的顺序输出结果。
### 7. 顶层 await
根据语法规格，await命令只能出现在 async 函数内部，否则都会报错。

## 16.class的继承
1. Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
2. 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
### 1. Object.getPrototypeof
Object.getPrototypeOf方法可以用来从子类上获取父类。
因此，可以使用这个方法判断，一个类是否继承了另一个类。
### 2. super 关键字
super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
### 3. 类的 prototype 属性和__proto__属性
Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

（1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
（2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
####实例的__proto__属性
子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。

## 17.Module 的加载实现
### 1. 浏览器加载
**加载规则**
1. 浏览器加载 ES6 模块，也使用script标签，但是要加入type="module"属性。
2. 你浏览器对于带有type="module"的script，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了script标签的defer属性。
3. 如果网页有多个script type="module"，它们会按照在页面出现的顺序依次执行。
4. script标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。
5. 一旦使用了async属性，script type="module"就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。
6. ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
### 2. ES6 模块与 CommonJS 模块的差异
**有两个重大差异**
1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
   CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
2. 因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
## #3.Node 加载
1. Node 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。反过来，.mjs文件里面也不能使用require命令，必须使用import。

## 18.字符串的新增方法
### 1. String.fromCodePoint()
用于从 Unicode 码点返回对应字符
### 2. String.raw()
ES6 还为原生的 String 对象，提供了一个raw()方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
### 3. 实例方法：codePointAt()
ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
codePointAt()方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString()方法转换一下。
### 4. 实例方法：normalize()
ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
### 5. 实例方法：includes(), startsWith(), endsWith()
1. includes()：返回布尔值，表示是否找到了参数字符串。
2. startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
3. endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
### 6. 实例方法：repeat()
repeat方法返回一个新字符串，表示将原字符串重复n次。
### 7. 实例方法：padStart()，padEnd()
ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
### 8. 实例方法：trimStart()，trimEnd()
ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。
### 9. 实例方法：matchAll()
matchAll()方法返回一个正则表达式在当前字符串的所有匹配

# ES7
### 1.  Array.prototype.includes()
includes() 函数用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回false。
### 2. 指数操作符
在ES7中引入了指数运算符**，**具有与Math.pow(..)等效的计算结果。
使用指数运算符**，就像+、-等操作符一样：

# ES8
### 1. async/await
ES8引入async函数，是为了使异步操作更加方便，其实它就是Generator函数的语法糖。
async函数使用起来，只要把Generator函数的（*）号换成async，yield换成await即可。对比如下：
### 2. Object.values()
Object.values()是一个与Object.keys()类似的新函数，但返回的是Object自身属性的所有值，不包括继承的值。
### 3. Object.entries()
Object.entries()函数返回一个给定对象自身可枚举属性的键值对的数组。
### 4. String padding
在ES8中String新增了两个实例函数String.prototype.padStart和String.prototype.padEnd，允许将空字符串或其他字符串添加到原始字符串的开头或结尾。
```javascript
String.padStart(targetLength,[padString])
```
1. targetLength:当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
2. padString:(可选)填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 " "。

### 5. 函数参数列表结尾允许逗号
该特性允许我们在定义或者调用函数时添加尾部逗号而不报错
### 6. Object.getOwnPropertyDescriptors()
Object.getOwnPropertyDescriptors()函数用来获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。

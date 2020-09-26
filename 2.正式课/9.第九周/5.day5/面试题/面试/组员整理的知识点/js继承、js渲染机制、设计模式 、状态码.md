# js继承

 ### 1面向对象继承（类和实例）
表现为 子类继承父类  主要是为实例和原型增加方法的
多态（重写，重载）
 ### 1.1 原型链继承
将子类 B 的原型对象 重写成父类 	A  的一个实例
```
function A() {
}
A.prototype.age = 19;
A.prototype.say = function () {
   console.log('来自A类原型的say方法')
};
function B() {}
B.prototype = new A();  把B类的原型改写成一个A类的实例；
let b = new B();
```

把B的原型改写成A类的一个实例，此时通过 b.age 访问b的age属性，首先在私有属性中查找，私有属性中没有age属性，接着去b所属类的原型（B.prototype）上查找，此时原型对象是A的实例对象，在原型对象也没有age属性，然后通过原型对象的proto就找到了A.prototype上，A的prototype上有age属性

原型继承是把子类公有的属性和私有的属性都变成了子类私有的属性；

==缺点==：改写子类的原型对象，会导致子类原型对象上的constructor属性被改写，需要重新指定继承后的constructor；

### 1.2 借用构造函数继承
```
function A() {
   this.a = 'aa';
   this.say = function () {
      console.log('A say');
   }
}
A.prototype.public = 'public';
function B() {
   A.call(this);  this是B类的一个实例，A.call(this) 的意思是把A中的this就该成B的实例（而在B的构造函数中this就是B的实例）这样在A中通过this.xxx = xxx 的方式添加的属性都会添加到B的实例身上。
}
let b = new B();
console.log(b);  {a: 'aa', say: fun.....}
let b2 = new B();
console.log(b2.say === b.say);  false;
```

##### 借用构造函数继承：

把父类当做普通函数，在子类的函数体里面，通过call方法执行 A.call(this)
call方法是用来修改this指向的，这样一来就把A中的this修改成了b的实例；在函数A中通过this.xxx = xxx 添加的属性都添加到了B的实例身上；

==特点==:只能把父类的私有属性和方法继承为子类的私有属性和方法；

### 1.3组合继承
组合继承：原型链继承 + 借用构造函数继承

原型链继承：把父类私有的和共有的继承为子类公有的；
借用构造函数继承：把父类私有的继承为子类私有的
```
function A() {
   this.a = '私有的'
}
A.prototype.text = '公有';
A.prototype.say = function () {
   console.log('A公有的say方法')
};
function B() {
   A.call(this);  借用构造函数继承，继承父类私有的
}
B.prototype = new A();  原型链继承，继承父类私有和公有的属性；
B.prototype.constructor = B;
let b = new B();
console.log(b.text);  公有的
console.log(b.a);  私有的
```

==缺点：==
组合继承也并非没有缺点，组合继承会父类的私有继承两次，一份在借用构造函数继承时成为私有的，而另一份是在原型继承时成为公有的；

### 1.4 原型式继承
   原型式继承：把父类的公有属性继承为子类的公有属性；
  创建一个新的对象，并且新对象的proto指向A.prototype，最后把这个新对象作为B类的原型；
```
function A() {
   this.private = 'private私有';
}
A.prototype.public = 'public公有';
function B() {}
B.prototype = Object.create(A.prototype);  创建一个指定原型的对象 创建一个对象，并且这个对象的__proto__ 指向A.prototype
B.prototype.constructor = B;  原型式继承同样是修改B类原型的指向，所以需要重新指定构造函数
let b = new B();
console.log(b.public);
```

### 1.5 寄生组合继承
寄生组合式继承：原型式继承 + 借用构造函数继承
```
function A() {
   this.private = '私有属性';
}
A.prototype.public = '公有属性';
function B() {
   A.call(this);  借用构造函数继承
   this.name = 'b私有的';
}
 原型式继承：把父类公有的 继承为子类实例公有的
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
let b = new B();  {name: '私有的', private: '私有属性'}
console.log(b.private);  继承过来的私有属性
console.log(b.public);  继承过来到的公有属性

```

### 1.6 冒充对象继承
冒充对象继承：在子类的构造函数中生成一个父类的实例，把父类的这个实例进行遍历，把属性都添加子类的实例上；
```
function A() {
   this.private = '私有属性';
}
A.prototype.public = '公有属性';
function B() {
   this.name = 'B私有的属性';
   let tmp = new A();
   for (let key in tmp) {
      this[key] = tmp[key];
   }
}
let b = new B();
console.log(b);

```

### 1.7  Es6 继承（extends 关键字）
原理：寄生组合式继承
```
class A {
   constructor (name, age) {
      this.name = name;
      this.age = age;
   }
    公有方法（添加到原型上）
   say () {
      console.log(`${this.name} say`);
   }
}
 ES6继承时使用 extends 关键字实现继承
class B extends A {  B继承A类
   constructor (x, y, forName, forAge) {
       注意：在使用ES6的extends关键字之前，必须使用super(); super表示父类的构造函数
      super(forName, forAge);  注意：
      this.x = x;
      this.y = y;
   }
}
let b = new B('x', 'y', 'mabin', 18);
console.log(b);
b.say();
```

---
# js设计模式

### 1、普通单例：
```
var stu1 = {
  name: 'zhangsan',
  age: 18,
  sex: 'boy'
};

var stu2 = {
  name: '李四',
  age: 19,
  sex: 'girl'
};
```


像上面这样，把描述一个事物的属性放到一个对象内这种封装方式称为单例模式。
单例模式的优点是解决了全局变量互相覆盖的问题。而 stu1 和 stu2 两个变量名又称为命名空间

### 2、 高级单例
高级单例：高级单例模式不再是直接将一个对象赋值给命名空间，而是先执行一个自执行函数，在函数执行结束时返回一个对象；
```
var person = (function () {
  function eat(food) {
    console.log(`I like eating ${food}`)
  }
  function hobby(h) {
    console.log(`I like playing ${h}`)
  }
  var account = '$10000000';
  var name = '王老五';
  var age = 40;
  return {
    name: name,
    age: age,
    eat: eat,
    hobby: hobby
  }
})();
```


 这样写，有一个优势，我们可以在自执行函数的作用域中声明变量和函数，这个作用域不会销毁，我们可以在最后返回对象里面选择导出哪些变量和方法给外界使用，不导出的，外界拿不到；

单例模式虽然好用，但是有一个问题，有一个对象，我们就需要写一个这个对象，很繁琐。

### 3、工厂模式
```
function reg(name, age, sex) {
  var obj = {}; // 原材料
  obj.name = name; // 加工
  obj.age = age; // 加工
  obj.sex = sex; // 加工
  return obj; // 出厂
}

let s1 = reg('阿三', 19, 'boy');
let s2 = reg('李四', 18, 'girl');

console.log(s1 === s2); // false
```

工厂模式：像上面这样，把实现相同供的函数封装成一个函数，当我们需要创建一个实例的时候，我们就执行这个函数即可，并且每个对象都是单例；
==优势==：高内聚，低耦合 提高了代码的复用度

#### 3.1什么是高内聚低耦合
高内聚就是说相关度比较高的部分尽可能的集中，不要分散

低耦合就是说两个相关的模块尽可以能把依赖的部分降低到最小，不要让两个系统产生强依赖

 高内聚低耦合是软件设计的一个基本原则，说的是在程序的各个模块中，尽量让每个模块独立，相关的处理尽量在单个模块中完成，就是俗话说的：该干嘛干嘛去！优点：能提降低各模块的之间的联系，减少“牵一发而动全身”的几率，提高开发效率，降低升级维护成本，也便于进行单元测试，提高软件质量。
 
 # 构造函数
 
   ###  构造函数模式：
通过 new 调用一个函数，此时这个函数不再是普通函数，而是成为一个类，函数名称为类名，而通过 new 调用，自动返回这个类的一个实例。在构造函数中，我们需要抽象这个类型的属性和功能；    
```
function Teacher(name, age, subject, from) {
  this.name = name;
  this.mission = '传道受业解惑';
  this.age = age;
  this.subject = subject;
  this.from = from;
  this.teach = function () {
    console.log(`${name} 老师教 ${subject} 学科`);
  }
} // Teacher 是一个类，这里类型抽象了老师的属性，一个老师有的属性有姓名，年龄，教授学科，哪个学校的老师，以及老师会讲课的功能。

// 创建一个实例：
let mrMa = new Teacher('马宾', 18, 'js', '珠峰培训');
console.log(mrMa);

let mrJiang = new Teacher('姜文', 19, 'Architect-架构师', '珠峰培训');
console.log(mrJiang);
console.log(typeof mrJiang); // object
console.log(typeof mrMa); // object

// 通过浏览器控制台查看，这两个实例（对象）的前面出现了 Teacher，此时说明 mrMa 和 mrJiang 都属于 Teacher 类的实例。
```
---
# 发布订阅
####  发布订阅模式：
   是模拟DOM2级事件的事件池思想，在某一个时刻到来时，我们要做很多的事情（很多函数）。我们准备一个数组当做一个事件池，并且提供向事件池中加入函数的方法以及移除的方法，当时刻来临时，我们把事件池中的方法取出来挨个执行；
   
 >  订阅：订阅该时刻到来，把想做的事情加入事件池,  
   发布：时刻真的到来了，把事件池中的方法都执行了
   
   ```
   // 准备事件池：
let ary = [];

function addListener(fn) {
  if (ary.includes(fn)) return;
  ary.push(fn)
}
function removeListener(fn) {
  // 数组.filter 方法，把数组中满足条件的（回调函数返回true的项）组成一个新数组，原数组不变；
  ary = ary.filter(item => item !== fn);
}
function fire() {
  ary.forEach(item => item())
}

function fn1(_this) {
  console.log(1)
}
function fn2() {
  console.log(3)
}
function fn3() {
  console.log(3)
}

// 订阅5s后的这个时刻
add(fn1);
add(fn2);
add(fn3);

// 取消订阅
removeListener(fn3);

setTimeout(function () {
  // 5s后时刻来临，就把事件池中的方法都执行了
  fire(this);
}, 5000);
   ```
   ***
 ## DOM2  
    >** 以为同一事件绑定多个事件函数；

    可以指定绑定的在捕获阶段还是绑定再冒泡阶**
   DOM2事件绑定
   ```
   元素.addEventListener('事件名称', 事件函数, false冒泡 | true捕获)
box.addEventListener('click', function () {
  console.log(1)
}, true);
box.addEventListener('click', function () {
  console.log(2)
}, false);

box.addEventListener('click', function () {
  console.log(3);
}, false);
   ```
   移除DOM2
   ```
   元素.removeEventListener('事件名称', 事件函数, false|true);
   ```
   DOM0级事件和DOM2级事件绑定的区别
    DOM2级事件给绑定的时候是给每个元素 的每个事件准备了一个事件池，类似于一个数组每次addEventListener()就是把事件函数放到事件池中，然后等事件触发的时候，再一个一个的把事件函数从事件池中拿出来执行一次；
*** 
    
# async
    > async / await 是 ES6 新增的关键字，用于把异步处理程序变为同步；
- async 在函数定义时使用，用 async 函数声明的函数默认返回一个 promise 实例，返回值可以直接 .then
- await 右边如果是 Promise 就等着 Promise 状态发生变更，如果是同步代码直接执行；如果 await 执行的方法返回的 promise 对象，我们可以直接在对象使用 then 方法；此外，await 下面的代码都会变成微任务

在项目中我们经常将  async  Promise 和 ajax一起使用：
```
function getAside() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'aside.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText))
      }
    };
    xhr.send();
  })
}

function getBanner() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'banner.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText))
      }
    };
    xhr.send();
  })
}

async function bindHTML() {
  let aside = await getAside(); // await 会返回 promise resolve 后的值
  let [,,third] = aside;
  let banner = await getBanner(third);
  console.log(aside);
  console.log(banner);
}
bindHTML();
```

# 代码执行顺序（js的执行机制）

* 1.js代码执行之前，浏览器会为其开辟全局作用域，然后对全局中的变量进行提升操作，对带var和带function进行提前的声明或者定义；
* 2.变量提升结束后，js代码开始从上到下执行；执行的过程中对带var的变量进行赋值：
    * 2.1 如果是赋值一个基本数据类型的值，那么直接把基本类型的值存在作用域中，并且把变量和值关联起来；
    * 2.3 如果是赋值一个引用数据类型，浏览器会开辟一个堆内存，存储这个引用数类型的值，然后把这个堆内存的地址赋值给变量（这个时候这个内存地址是存在作用域中的）
* 3.如果执行过程遇到函数执行会经历以下几步：
    * 1.浏览器会函数代码执行再开辟一个新的作用域（一块新的栈内存）（这解释函数每次执行都是互相独立的，因为每次执行的环境不同）
    * 2.形参赋值，形参也是变量，把函数执行时实参赋值给形参。
    * 3.私有作用域中的变量提升，对私有作用域中的带var和带function的提前处理（在当前作用域中变量提升）
* 4从上到下执行函数代码
    * 4.1如果再遇到函数执行重复第三步
*** 
# 渲染机制 
#### http 请求阶段

- 浏览器得到地址栏中的地址，发送给DNS服务器
- DNS服务器进行域名解析，找到域名对应的IP地址
- 把客户端的请求发送给上一步查出来的服务器地址
- 
 #### http 响应阶段

- 服务器接收到请求后，根据请求的信息，进行资源的整理，并且把响应的资源通过http返回给客户端（数据或者html、js、css文件等）
- 根据资源的类型不同，浏览器会进行不同的操作，如 html 和 css 进行解析渲染，js进行解析并执行

#### 浏览器的渲染阶段

- 解析 html 文件形成 DOM 树根据节点间关系组织树的节点关系；
- 解析 CSS 形成 CSS 树
- 把 DOM 树和 CSS 树组合形成 render 树
- 接下来交给显卡，绘制成页面

# http 状态码
 |状态码|含义|
 |--|--|
 |200|请求成功|
 |201|已创建。成功请求并创建了新的资源|
 |202|已接受。已经接受请求，但未处理完成|
 |203|服务器已成功处理了请求，但返回的实体头部元信息不是在原始服务器上有效的确定集合，而是来自本地或者第三方的拷贝|
 |204|服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档|
 |205|服务器处理成功，用户终端(例如：浏览器)应重置文档视图。可通过此返回码清除浏览器的表单域|
 |206|服务器已经成功处理了部分 GET 请求。|
 |300|。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端(例如：浏览器)选择|
 |301|重定向|
 |302|临时重定向|
 |303|查看其它地址。与301类似。使用GET和POST请求查看|
|304|所请求的资源未修改，服务器返回此状态码时，不会返回任何资源|
|305|使用代理。所请求的资源必须通过代理访问|
|306|已经被废弃的HTTP状态码|
|307|临时重定向。与302类似。使用GET请求重定向|
|400|客户端请求的语法错误，服务器无法理解|
|401|请求要求用户的身份认证|
|402|保留，将来使用|
|403|服务器理解请求客户端的请求，但是拒绝执行此请求|
|404|服务器无法根据客户端的请求找到资源(网页)。通过此代码，网站设计人员可设置”您所请求的资源无法找到”的个性页面|
|405|客户端请求中的方法被禁止|
|406|服务器无法根据客户端请求的内容特性完成请求|
|407|请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权|
|408|服务器等待客户端发送的请求时间过长，超时|
|409|服务器完成客户端的PUT请求是可能返回此代码，服务器处理请求时发生了冲突|
|410|通知用户该资源已经不再可用，并且服务器拥有者希望所有指向这个资源的远端连接也被删除|
|411|服务器拒绝在没有定义 Content-Length 头的情况下接受请求|
|412|服务器在验证在请求的头字段中给出先决条件时，没能满足其中的一个或多个|
|413|服务器拒绝处理当前请求，因为该请求提交的实体数据大小超过了服务器愿意或者能够处理的范围|
|414|请求的URI 长度超过了服务器能够解释的长度，因此服务器拒绝对该请求提供服务|
|415|对于当前请求的方法和所请求的资源，请求中提交的实体并不是服务器中所支持的格式，因此请求被拒绝|
|421|从当前客户端所在的IP地址到服务器的连接数超过了服务器许可的最大范围|
|422|请求格式正确，但是由于含有语义错误，无法响应|
|500|服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理|
|501|服务器错误|
|502|作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应
|503|由于临时的服务器维护或者过载，服务器当前无法处理请求|
|504|作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器(URI标识出的服务器，例如HTTP、FTP、LDAP)或者辅助服务器(例如DNS)收到响应。|
|505|服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本|
|506|由《透明内容协商协议》(RFC 2295)扩展，代表服务器存在内部配置错误：被请求的协商变元资源被配置为在透明内容协商中使用自己，因此在一个协商处理中不是一个合适的重点|
|507|服务器无法存储完成请求所必须的内容|
|509|服务器达到带宽限制==这不是一个官方的状态码，====但是仍被广泛使用======|
|510|获取资源所需要的策略并没有没满足|
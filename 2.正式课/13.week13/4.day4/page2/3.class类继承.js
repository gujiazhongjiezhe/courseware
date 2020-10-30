class A {
  constructor(age){
    // 当你new A的时候此函数会立马执行，而且函数里的this是当前正在new的实例
    this.props = age; // 给当前实例增加私有属性
    this.name="erYA"
  }
  getX(){ // 给当前A的原型增加方法

  }

  static a = 100; // 把当前类A当做普通对象，给他增加私有属性
  getY = ()=>{ // 这种写法是给当前实例增加私有属性

  }
}


 let a = new A(100);
 console.log(a);

 class B extends A { // 创建一个类B并且继承类A的私有和共有属性
  // 公共属性的继承：先让类B的实例__proto__指向自己的原型，然后原型的__proto__在指向类A的原型
  constructor(ss){
    super(ss);
    this.ss = 800;
  }
 }

 let  b = new B(400);
 console.log(b);
 // 这种继承方式就是react中用类创建组件的方式




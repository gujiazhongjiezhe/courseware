// import React from 'react';
// import ReactDOM from 'react-dom';
Object.prototype.ss = 100;
class Element { // 这是专门生成虚拟dom的类
  constructor(type,attr,children){
    // this-->当前的实例(虚拟对象)
      this.type = type;
      this.props = {...attr,children}
  }
  translateRealDom(){
    // this-->ele当前的虚拟dom
    // 把虚拟的dom转化成真实的dom
    let dom = document.createElement(this.type); // 创建一个真实dom对象

    // 给当前dom增加行间属性,去for in循环props，把不等于children的属性增加到dom的行间
    for(let key in this.props) {
      // for in能够把自己的和原型上的所有可枚举的属性遍历出来(遍历的顺序是先遍历自己私有的，然后在遍历原型上共有的，但是利用hasOwnProperty检测，如果返回false，说明已经把私有的遍历完了，正在遍历原型上的共有属性，这时候让for in停止遍历就好了)
      
      if(!this.props.hasOwnProperty(key)) break; // 为了避免for in去遍历原型上的属性
      if(key !== 'children'){
        if(key === 'className'){
          dom.setAttribute('class',this.props[key])
        }
        else {
          dom.setAttribute(key,this.props[key])
        }
        
      }
     
      
    };

    // 给当前dom元素增加子节点
    this.props.children.forEach(item=>{
      let res
      if(item instanceof Element){
        // 如果当前判断成立，说明item就是一个虚拟的dom
        res = item.translateRealDom();
      }
      else {
        // 如果走else那就说明item就是一个字符串，我们把它当做一个文本节点来处理
        res = document.createTextNode(item);
      }
       dom.appendChild(res);
    })

    return dom;
  }
}

let myReact = {
  createElement(type,attr,...children) {
    // children就是一个数组，里边包含的就是从第三个实参开始的值
    return new Element(type,attr,children); // 这块会返回一个Element的实例，这个实例就是当前需要生成的虚拟的dom对象
    
   } // 他所做的是是生成虚拟的dom元素对象
}

let myReactDOM = {
  render(ele,container) { // 第一个形参就是虚拟的dom，第二个形参就是页面上真实的dom
    // ele做二次处理
    container.innerHTML = '';
    container.appendChild(ele.translateRealDom()); // 此时的ele是虚拟的dom，咱们得把虚拟的dom转化成真实的dom之后在放到页面的root中
  }
}

// let b = <div a="1" b="2">
//   我是内容
//   <span>111</span>
// </div>;
let a = myReact.createElement(
  'div',
  {a:'1',b:"2",className:'ww'},
  '我是内容',
  myReact.createElement('span',null, myReact.createElement('em',null,'我是em'))
  );
  console.log(a); // a就是虚拟的dom元素

  myReactDOM.render(a,document.getElementById('root'))
let utils = (function () {
  function screen(attr, value) {
    // 判断用户到底想干什么，如果用户只是传递了一个参数，那就是想获取，如果传递；两个参数，那就是想设置
    if (value === undefined) {
      // 这是获取值
      return document.documentElement[attr] || document.body[attr];
    }
    else {
      // 设置
      document.documentElement[attr] = value;
      document.body[attr] = value;
    }

  }
  function offset(ele){
      let left = ele.offsetLeft; // 获取当前盒子的做偏移量
      let top =  ele.offsetTop;
      let parent = ele.offsetParent; // 获取当前盒子的父级参照物
      while(parent !==document.body){
        // 在原来的基础之上累加父级参照物的左border的宽度和父级参照物的左偏移量
        left += parent.clientLeft + parent.offsetLeft;
        top += parent.clientTop + parent.offsetTop;
        // 继续获父级参照物的父级参照物
        parent = parent.offsetParent;
      }
      return {
        left,
        top
      }
    }
  return {
    screen,
    offset
  }

})()
let utils = (function(){
  function toArray(likeAry){
    return Array.prototype.slice.call(likeAry);
  };
  return {
    toArray // 如果属性名和属性值一样，可以省略冒号和后面的属性名
  }
})();



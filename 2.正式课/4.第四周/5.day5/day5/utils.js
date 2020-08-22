let utils = (function () {

  function linear(t, c, d, b) {
    // t:已经运动过的时间
    // c:需要运动的总距离
    // d:总时间
    return t / d * c + b;
  }


  function move(curEle, target, duration, callBack) {
    let begin = {}; // 变化的起始位置
    let change = {}; // 需要移动的总距离
    for (var key in target) {
      begin[key] = parseFloat(getComputedStyle(curEle)[key]);// 变化的起始位置
      change[key] = target[key] - begin[key]; // 需要移动的总距离
    }

    let time = 0; // 用来记录已经走过的时间
    let timer = setInterval(() => {
      time += 17;
      if (time >= duration) {
        clearInterval(timer);
        for (var key in change) {
          curEle.style[key] = target[key] + 'px';
          timer = null;
        }
        // callBack && callBack();
        typeof callBack === 'function' ? callBack() : null;
        return;
      }
      for (var key in change) {
        let cur = linear(time, change[key], duration, begin[key]);
        curEle.style[key] = cur + 'px'
      }

    }, 17)
  }
  return {
    move
  }
})()
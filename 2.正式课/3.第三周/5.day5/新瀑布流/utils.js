let utils = (function () {
    function offset(curEle) {
        let l = curEle.offsetLeft;
        let t = curEle.offsetTop;
        let parent = curEle.offsetParent;

        while (parent !== document.body) {
            l += parent.clientLeft + parent.offsetLeft;
            t += parent.clientTop + parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            left: l,
            top: t
        }
    }

    function getCss(curEle, attr) {
        let val = null;
        if ('getComputedStyle' in window) {
            val = getComputedStyle(curEle)[attr];
        } else {
            val = curEle.currentStyle[attr];
        }
        let reg = /^(width|height|padding|margin|left|right|top|bottom|fontSize|opacity)$/;
        if (reg.test(attr)) {
            val = parseFloat(val);
        }
        return val;
    }

    function setCss(curEle, attr, value) {

        let reg = /^(width|height|padding|margin|left|right|top|bottom|fontSize)$/;
        if (reg.test(attr)) {
            if (typeof value === 'number') {
                value = value + 'px';
            }
        }
        curEle.style[attr] = value;
    }

    function setGroupCss(curEle, obj) {
        // 对象有几个键值对就调用几次setCss方法，
        for (var key in obj) {
            setCss(curEle, key, obj[key])
        }
    }
    function css(){
        let [curEle,attr,value] = arguments;
        // 如果传参的个数是2，那就说明不是获取样式就是批量设置样式
        if(arguments.length === 2){
            // 如果第二个参的数据类型是字符串，那就是获取样式
            if(typeof attr === 'string'){
                return getCss(curEle,attr)
            }
            else {
                setGroupCss(curEle,attr)
            }
        }
        // 如果传递的参数是3个，那就是单个设置样式
        else if(arguments.length === 3){
            setCss(curEle,attr,value)
        }

    }
    function win(attr,value){
        if(value === undefined){
          return  document.documentElement[attr] || document.body[attr]
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
   }
   function toArray(likeAry){
        let ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry);
        }catch(e){
            for (var i = 0; i < likeAry.length; i++) {
               ary.push(likeAry[i])
            }
        }
        return ary
   }
    return {
        offset,
        getCss,
        setCss,
        setGroupCss,
        css,
        win,
        toArray
    }
})()
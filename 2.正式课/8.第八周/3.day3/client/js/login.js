$(function () {
  // 他会等到页面的结构加载完成之后在执行
  let $userName = $('.userName'),
    $userPass = $('.userPass'),
    $submit = $('.submit');
  // 当用户点击submit的时候才会进行登录
  $submit.click(function () {

    // 进行表单验证
    let username = $userName.val().trim();
    let password = $userPass.val().trim();
    if (!username || !password) {
      alert('输入的用户名或者密码不能为空');
      return;
    }

    // 这里才是正常的登录
    console.log('可以正常登录')
    password = md5(password); // 给密码进行加密

    // 发送ajax登录请求
    axios.post('/user/login',{
      account:username,
      password:password
    }).then(result=>{
      console.log(result);
      let  {
        code,
        codeText,
        power
      } = result;

      if(parseFloat(code) === 0){
        alert('恭喜您登录成功',{
            handled:()=>{
              // 当前回调函数会在弹框消失之后执行
              // 跳转到首页

              // 把权限信息保存到本地存储
              window.localStorage.setItem('power',power);
              window.location.href = 'index.html';
              // console.log(100);
            }
        });

        return;
      }
      alert('当前的密码和用户名不匹配，请重新登录');
    })
   })
})

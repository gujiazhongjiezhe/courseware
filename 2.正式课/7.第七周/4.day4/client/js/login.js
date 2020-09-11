$(function () {
	let $userName = $('.userName'),
		$userPass = $('.userPass'),
		$submit = $('.submit');
	$submit.click(function () {
		let userName = $userName.val().trim(),
			userPass = $userPass.val().trim();
		//=>表单校验
		if (userName === '' || userPass === '') {
			alert('用户名密码不能为空，请您输入~');
			return;
		}

		//=>密码需要MD5加密：32位字符串
		userPass = md5(userPass);

		//=>发送AJAX请求
		axios.post('/user/login', {
			account: userName,
			password: userPass
		}).then(result => {
			let {
				code,
				codeText,
				power
			} = result;
			if (parseFloat(code) === 0) {
				//=>登录成功
				alert('恭喜您登录成功~', {
					handled: function () {
						//=>把用户的权限校验码存储在本地
						localStorage.setItem('power', encodeURIComponent(power));
						//=>跳转到首页即可
						window.location.href = 'index.html';
					}
				});
				return;
			}
			//=>登录失败
			alert('当前用户名和密码不匹配，请重试~');
		});
	});
});
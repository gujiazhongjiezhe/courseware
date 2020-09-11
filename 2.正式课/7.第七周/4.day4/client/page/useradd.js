let useraddModule = (function () {
	let $username = $('.username'),
		$spanusername = $('.spanusername'),
		$man = $('#man'),
		$woman = $('#woman'),
		
		$useremail = $('.useremail'),
		$spanuseremail = $('.spanuseremail'),
		$userphone = $('.userphone'),
		$spanuserphone = $('.spanuserphone'),
		$userdepartment = $('.userdepartment'),
		$userjob = $('.userjob'),
		$userdesc = $('.userdesc'),
		$submit = $('.submit');
	let userId = null,
		isUpdate = false;

	//=>下拉框内容的绑定
	let selectBind = function () {
		let promise1 = axios.get('/department/list'),
			promise2 = axios.get('/job/list');
		return axios.all([promise1, promise2]).then(results => {
			let [departmentResult, jobResult] = results;
			//=>部门信息的绑定
			if (parseInt(departmentResult.code) === 0) {
				let str = ``;
				departmentResult.data.forEach(item => {
					str += `<option value="${item.id}">${item.name}</option>`;
				});
				$userdepartment.html(str);
			}
			//=>职务信息的绑定
			if (parseInt(jobResult.code) === 0) {
				let str = ``;
				jobResult.data.forEach(item => {
					str += `<option value="${item.id}">${item.name}</option>`;
				});
				$userjob.html(str);
			}
		});
	};

	//=>点击按钮提交信息
	let submitHandle = function () {
		$submit.click(function () {
			//=>表单验证
			if (!checkUserName() || !checkUserEmail() || !checkUserPhone()) return;

			//=>判断是修改还是增加
			let URL = isUpdate ? '/user/update' : '/user/add';
			axios.post(URL, {
				userId: isUpdate ? userId : null,
				name: $username.val().trim(),
				sex: $woman.prop('checked') ? 1 : 0,
				email: $useremail.val().trim(),
				phone: $userphone.val().trim(),
				departmentId: $userdepartment.val(),
				jobId: $userjob.val(),
				desc: $userdesc.val().trim()
			}).then(result => {
				if (parseInt(result.code) === 0) {
					alert('当前操作成功，即将返回列表页面~', {
						handled: () => {
							window.location.href = 'userlist.html';
						}
					});
					return;
				}
				return Promise.reject();
			}).catch(reason => {
				alert('很遗憾，当前操作失败了，请您稍后重试~');
			});
		});
	};

	//=>表单验证
	let checkUserName = function () {
		let usernameVal = $username.val().trim();
		if (usernameVal.length === 0) {
			$spanusername.html('用户名为必填项，不能为空！');
			return false; //=>验证失败要返回FALSE
		}
		$spanusername.html('');
		return true; //=>验证成功要返回TRUE
	};
	let checkUserEmail = function () {
		let useremialVal = $useremail.val().trim(),
			reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		if (useremialVal.length === 0) {
			$spanuseremail.html('邮箱为必填项，不能为空！');
			return false;
		}
		if (!reg.test(useremialVal)) {
			$spanuseremail.html('邮箱格式不正确！');
			return false;
		}
		$spanuseremail.html('');
		return true;
	};
	let checkUserPhone = function () {
		let userphoneVal = $userphone.val().trim(),
			reg = /^1\d{10}$/;
		if (userphoneVal.length === 0) {
			$spanuserphone.html('电话为必填项，不能为空！');
			return false;
		}
		if (!reg.test(userphoneVal)) {
			$spanuserphone.html('电话格式不正确！');
			return false;
		}
		$spanuserphone.html('');
		return true;
	};

	//=>从服务器获取基本信息，显示在表单中
	let queryBaseInfo = function () {
		return axios.get('/user/info', {
			params: {
				userId
			}
		}).then(result => {
			if (parseInt(result.code) === 0) {
				let {
					name,
					sex,
					email,
					phone,
					departmentId,
					jobId,
					desc
				} = result.data;
				$username.val(name);
				if (parseInt(sex) === 1) {
					$woman.prop('checked', true);
				}
				$useremail.val(email);
				$userphone.val(phone);
				$userdesc.val(desc);
				$userdepartment.val(departmentId);
				$userjob.val(jobId);
				return;
			}
			return Promise.reject();
		});
	};

	return {
		init() {
			//=>获取地址栏中问号传参信息：有就是修改，没有就是新增
			let paramsObj = window.location.href.queryURLParams();
			if ('userId' in paramsObj) {
				userId = paramsObj.userId;
				isUpdate = true;
			}

			//=>表单验证
			$username.on('blur', checkUserName);
			$useremail.on('blur', checkUserEmail);
			$userphone.on('blur', checkUserPhone);

			//=>数据处理
			selectBind().then(() => {
				if (isUpdate) {
					return queryBaseInfo();
				}
			}).then(() => {
				submitHandle();
			}).catch(() => {
				alert('当前页面获取相关信息出现问题，请稍后重试~~', {
					handled: () => {
						window.location.href = 'userlist.html';
					}
				});
			});
		}
	}
})();
useraddModule.init();
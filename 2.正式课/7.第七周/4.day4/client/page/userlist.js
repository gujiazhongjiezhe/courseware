let userListModel = (function () {
	let $selectBox = $('.selectBox'),
		$searchInp = $('.searchInp'),
		$tableBox = $('.tableBox'),
		$tbody = $tableBox.children('tbody'),
		$thead = $tableBox.children('thead'),
		$theadTH = $thead.find('th'),
		$deleteAll = $('.deleteAll');

	let power = localStorage.getItem('power') || '';
	power = decodeURIComponent(power);

	//=>权限校验
	let checkPower = function () {
		if (!power.includes('userhandle')) {
			$deleteAll.remove();
			$theadTH.eq(0).remove();
			$theadTH.eq($theadTH.length - 1).remove();
		}
	};

	//=>从服务器获取数据，实现数据的绑定
	let render = function () {
		let departmentId = $selectBox.val(),
			search = $searchInp.val().trim();
		//=>获取数据
		return axios.get('/user/list', {
			params: {
				departmentId, //=>departmentId:departmentId
				search
			}
		}).then(result => {
			//=>数据处理
			let {
				code,
				data
			} = result;
			if (parseFloat(code) === 0) {
				return data;
			}
			return Promise.reject();
		}).then(data => {
			//=>数据渲染
			let str = ``;
			data.forEach(item => {
				let {
					id,
					name = '--',
					sex = 0,
					department = '--',
					job = '--',
					email = '--',
					phone = '--',
					desc = '--'
				} = item;
				str += `<tr data-id='${id}' data-name='${name}'>
					${power.includes('userhandle')?`<td class="w3"><input type="checkbox"></td>`:``}
					<td class="w10">${name}</td>
					<td class="w5">${parseInt(sex)===0?'男':'女'}</td>
					<td class="w10">${department}</td>
					<td class="w10">${job}</td>
					<td class="w15">${email}</td>
					<td class="w15">${phone}</td>
					<td class="w20">${desc}</td>
					${power.includes('userhandle')?`<td class="w12">
						<a href="useradd.html?userId=${id}">编辑</a>
						<a href="javascript:;">删除</a>
						${power.includes('resetpassword')?`<a href="javascript:;">重置密码</a>`:``}
					</td>`:``}
				</tr>`;
			});
			$tbody.html(str);
		}).catch(() => {
			//=>没数据列表清空
			$tbody.html('');
		}).then(() => {
			handleCheckbox();
		});
	};

	//=>从服务器获取部门信息：把其设置在下拉列表中
	let selectBind = function () {
		return axios.get('/department/list').then(result => {
			if (parseInt(result.code) === 0) {
				let str = `<option value="0">全部</option>`;
				result.data.forEach(item => {
					str += `<option value="${item.id}">${item.name}</option>`;
				});
				$selectBox.html(str);
			}
		});
	};

	//=>筛选数据的事件处理
	let handleFilter = function () {
		$selectBox.on('change', render);
		$searchInp.on('keydown', function (ev) {
			if (ev.keyCode === 13) {
				//=>按下的是ENTER键
				render();
			}
		});
	};

	//=>基于事件委托处理员工的相关操作
	let handleDelegate = function () {
		$tbody.click(function (ev) {
			let target = ev.target,
				tarTag = target.tagName,
				tarVal = target.innerText,
				$target = $(target);
			//=>重置密码
			if (tarTag === 'A' && tarVal === "重置密码") {
				let $grandpa = $target.parent().parent(), //=>TR
					userId = $grandpa.attr('data-id'),
					userName = $grandpa.attr('data-name');
				alert(`确定要把${userName}的密码重置吗？`, {
					title: '警告！警告！当前操作很重要！',
					confirm: true,
					handled: msg => {
						if (msg === 'CONFIRM') {
							//=>用户点击的是确定：发请求给服务器
							axios.post('/user/resetpassword', {
								userId
							}).then(result => {
								if (parseInt(result.code) === 0) {
									alert('恭喜您，当前操作成功！')
									return;
								}
								alert('当前操作失败，请稍后重试！')
							});
						}
					}
				});
				return;
			}

			//=>删除
			if (tarTag === 'A' && tarVal === "删除") {
				let $grandpa = $target.parent().parent(),
					userId = $grandpa.attr('data-id'),
					userName = $grandpa.attr('data-name');
				alert(`确定要删除${userName}吗？`, {
					title: '警告！警告！当前操作很重要！',
					confirm: true,
					handled: msg => {
						if (msg !== 'CONFIRM') return;
						axios.get('/user/delete', {
							params: {
								userId
							}
						}).then(result => {
							if (parseInt(result.code) === 0) {
								render();
								return;
							}
							alert('当前操作失败，请稍后重试！');
						});
					}
				});
				return;
			}

		});
	};

	//=>全选和非全选
	let handleCheckbox = function () {
		let $checkHead = $thead.find('input[type="checkbox"]'),
			$checks = $tbody.find('input[type="checkbox"]');
		//=>点击实现全选或者非全选：JQ中设置属性有两种方式 attr / prop，prop一把能应用于表单元素的内置属性操作
		$checkHead.click(function () {
			//=>JQ控制单选或者复选框的选中，只需要让checked变为true/false
			//=>$(this).prop('checked')：基于这种方式可以获取单选或者复选框的选中状态，结果也是true/false
			$checks.prop('checked', $(this).prop('checked'));
		});
		$checks.click(function () {
			let flag = true;
			$checks.each((index, item) => {
				if ($(item).prop('checked') === false) {
					flag = false;
					return false; //=>结束EACH循环
				}
			});
			$checkHead.prop('checked', flag);
		});
	};

	//=>批量删除
	let batchDelete = function () {
		function deleteX(index, $selects) {
			if (index > ($selects.length - 1)) {
				//=>都删除完成了：重新渲染列表
				render();
				return;
			}
			let $item = $selects.eq(index),
				userId = $item.parent().parent().attr('data-id');
			axios.get('/user/delete', {
				params: {
					userId
				}
			}).then(result => {
				if (parseInt(result.code) === 0) {
					deleteX(index + 1, $selects);
				}
			});
		}

		$deleteAll.click(function () {
			let $selects = $tbody.find('input[type="checkbox"]')
				.filter((index, item) => {
					//=>JQ：FILTER支持回调函数，和数组中的FILTER一样，返回的结果是TRUE，则当前ITEM会被筛选到
					return $(item).prop('checked') === true;
				});
			if ($selects.length === 0) {
				alert('请您先选中要删除的内容~~');
				return;
			}
			//=>$SELECTS包含所有被选中的复选框
			alert(`您确定要删除这${$selects.length}项信息吗？`, {
				title: '警告！警告！当前操作很重要！',
				confirm: true,
				handled: function (msg) {
					if (msg !== 'CONFIRM') return;
					//=>递归从第一个开始删
					deleteX(0, $selects);
				}
			});
		});
	};

	return {
		init() {
			checkPower();
			selectBind().then(() => {
				render();
			});
			handleFilter();
			handleDelegate();
			batchDelete();
		}
	}
})();
userListModel.init();
let customerlistModule = (function () {
	let $selectBox = $('.selectBox'),
		$searchInp = $('.searchInp'),
		$tableBox = $('.tableBox'),
		$tbody = $tableBox.find('tbody'),
		$pageBox = $('.pageBox'),
		$pageNum = $pageBox.find('.pageNum');
	let lx = '',
		limit = 10,
		page = 1;

	//=>RENDER：实现数据渲染
	let render = function () {
		return axios.get('/customer/list', {
			params: {
				lx,
				type: $selectBox.val(),
				search: $searchInp.val().trim(),
				limit,
				page
			}
		}).then(result => {
			let {
				code,
				total,
				totalPage,
				data
			} = result;
			if (parseInt(code) !== 0) return Promise.reject();
			$pageBox.css('display', 'block');

			//=>渲染列表数据
			let str = ``;
			data.forEach(item => {
				let {
					id,
					name,
					sex,
					email,
					phone,
					QQ,
					weixin,
					type,
					address,
					userName
				} = item;
				str += `<tr data-id="${id}" data-name="${name}">
					<td class="w8">${name}</td>
					<td class="w5">${parseInt(sex)==1?'女':'男'}</td>
					<td class="w10">${email}</td>
					<td class="w10">${phone}</td>
					<td class="w10">${weixin}</td>
					<td class="w10">${QQ}</td>
					<td class="w5">${type}</td>
					<td class="w8">${userName}</td>
					<td class="w20">${address}</td>
					<td class="w14">
						<a href="customeradd.html?customerId=${id}">编辑</a>
						<a href="javascript:;">删除</a>
						<a href="visit.html?customerId=${id}">回访记录</a>
					</td>
				</tr>`;
			});
			$tbody.html(str);

			//=>渲染分页的数据
			str = ``;
			page > 1 ? str += `<a href="javascript:;">上一页</a>` : null;
			str += `<ul class="pageNum">`;
			for (let i = 1; i <= totalPage; i++) {
				str += `<li class="${i===page?'active':''}">${i}</li>`;
			}
			str += `</ul>`;
			page < totalPage ? str += `<a href="javascript:;">下一页</a>` : null;
			$pageBox.html(str);
		}).catch(reason => {
			$tbody.html('');
			$pageBox.css('display', 'none');
		});
	};

	//=>HANDLE
	let handle = function () {
		$selectBox.on('change', function () {
			page = 1;
			render();
		});
		$searchInp.on('keydown', function (ev) {
			if (ev.keyCode === 13) {
				page = 1; //=>每一次搜索结束都是从第一页开始显示
				render();
			}
		});
		$pageBox.click(function (ev) {
			let target = ev.target,
				tarTag = target.tagName,
				tarVal = target.innerHTML;
			if (tarTag === 'A') {
				if (tarVal === '上一页') page--;
				if (tarVal === '下一页') page++;
				render();
				return;
			}
			if (tarTag === 'LI') {
				page = parseInt(tarVal);
				render();
				return;
			}
		});
	};

	return {
		init() {
			//=>获取传递参数的信息
			lx = window.location.href.queryURLParams().lx || '';
			render();
			handle();
		}
	}
})();
customerlistModule.init();
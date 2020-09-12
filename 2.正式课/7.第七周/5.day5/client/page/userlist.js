let userList = (function () {
  let $selectBox = $('.selectBox');
  let $searchInp = $('.searchInp');
  let $tbody = $('.tableBox tbody');
  let $thead = $('.tableBox thead'); // 获取头部
  let $theadTh = $('.tableBox thead tr th'); // 获取头部的每一项th
  let $delateAll = $('.deleteAll');
  let $checkHead = $thead.find('input[type=checkbox]'); // 获取头部的单选框
  console.log($delateAll);


  let power = window.localStorage.getItem('power'); // 获取权限信息

  // 权限校验
  let checkpower = () => {
    // 通过权限控制批量删除按钮和表头的开头和结尾的元素的有无
    if (!power.includes('userhandle')) {
      $delateAll.remove(); // 把当前元素从页面中删除
      $theadTh.eq(0).remove();
      $theadTh.eq($theadTh.length - 1).remove();
    }
  }

  // 从服务器获取数据，进行数据绑定
  let render = () => {
    $checkHead.prop('checked', false);
    let departmentId = $selectBox.val();
    let search = $searchInp.val().trim();
    // 发送请求
    return axios.get('user/list', {
      params: {
        departmentId, // departmentId:departmentId
        search
      }
    }).then(result => {
      let { code, data } = result;
      if (parseFloat(code) === 0) {
        return data;
      }
      return Promise.reject(); // 如果上面返回的code不是0，那就做错误的处理，走catch
    }).then(data => {
      console.log(data);
      // 做给页面选染数据
      let str = ``;
      data.forEach(item => {
        let {
          id,
          name = '',
          sex = 0,
          email = '',
          phone = '',
          departmentId = '',
          department = '',
          jobId = '',
          job = '',
          desc = ''
        } = item;
        str += `
        <tr data-name="${name}" data-id="${id}">
        ${power.includes('userhandle') ? `<td class="w3"><input type="checkbox"></td>` : ''}
            <td class="w10">${name}</td>
            <td class="w5">${sex === 0 ? '男' : '女'}</td>
            <td class="w10">${department}</td>
            <td class="w10">${job}</td>
            <td class="w15">${email}</td>
            <td class="w15">${phone}</td>
            <td class="w20">${desc}</td>
            ${power.includes('userhandle') ? `
            <td class="w12">
                <a href="useradd.html?userId=${id}" >编辑</a>
                <a href="javascript:;">删除</a>
                <a href="javascript:;">重置密码</a>
            </td>`: ''
          }
            
			</tr> 
        `
      });
      $tbody.html(str);
    }).catch(() => {
      $tbody.html('');
    }).then(handled).then(handleCheck);

  };

  // 获取下拉部门列表的数据，然后渲染到页面
  let selectBind = () => {
    return axios.get('/department/list').then(result => {
      let { code, data } = result;
      if (parseFloat(code) === 0) {
        let str = `<option value="0">全部</option>`;
        data.forEach(item => {
          let { name, id } = item;
          str += `<option value="${id}">${name}</option>`
        });
        $selectBox.html(str);
      }
    });
  }

  // 绑定搜索功能
  let handleFilter = () => {
    // 绑定下拉框的搜索
    $selectBox.on('change', function () { // 
      // console.log($selectBox.val());
      render();
    });
    // 绑定input框的搜索
    $searchInp.on('keydown', function (e) { // 按下enter键之后去发送请求
      // console.log(e);
      if (e.keyCode === 13) {
        render();
      }
    });
    $searchInp.on('blur', render); // 失去焦点之后去发送请求

  };

  // 基于事件委托完成员工操作的绑定
  let handled = () => {
    $tbody.click(function (e) {

      let target = e.target;
      let tarVal = target.innerText;
      let tagName = target.tagName;
      let $grandP = $(target).parent().parent(); // tr
      let userId = $grandP.attr('data-id');
      let userName = $grandP.attr('data-name');
      if (tagName === 'A' && tarVal === '重置密码') {
        alert(`您确定要把${userName}的密码重置吗?`, {
          title: '重置操作',
          confirm: true,
          handled: (msg) => {
            console.log(msg);
            if (msg === 'CONFIRM') {
              // 如果msg是CONFIRM说明用户点击的是确定，从而进行下面的逻辑
              axios.post('/user/resetpassword', {
                userId
              }).then(result => {
                let { code } = result;
                if (parseFloat(code) === 0) {
                  alert('当前操作成功！');
                  return;
                }
                alert('当前操作失败，请重试');
              })
            }
          }
        })
      };

      if (tagName === 'A' && tarVal === '删除') {
        alert(`您确定要把${userName}删除吗?`, {
          title: '删除操作',
          confirm: true,
          handled: (msg) => {
            console.log(msg);
            if (msg === 'CONFIRM') {
              // 如果msg是CONFIRM说明用户点击的是确定，从而进行下面的逻辑
              axios.get('/user/delete', {
                params: {
                  userId
                }
              }).then(result => {
                let { code } = result;
                if (parseFloat(code) === 0) {
                  alert('当前操作成功！');

                  render();
                  return;
                }
                alert('当前操作失败，请重试');
              })
            }
          }
        })
      };
    })
  }

  // 全选和非全选
  let handleCheck = () => {
    let $checks = $tbody.find('input[type=checkbox]');// 获取每一行的单选框
    // checked 如果当前的单选框是选中状态(人家内置的)，如果是选中的，他的值就是true，如果没有选中，那他的值就是false，(当然这个checked的值也可以手动改)

    // 在jq方法中，获取或者设置行间属性是attr，但是表单也可以使用prop来控制人家内部的属性

    $checkHead.click(function () {
      // 1.先获取到当前头部框的状态，然后赋值给全部下面的全部的小框
      let headStatus = $checkHead.prop('checked'); // 获取当前头部框的状态
      // console.log($checkHead.prop('checked'));
      $checks.prop('checked', headStatus); // 把头部框的状态设置给
    });
    $checks.click(function () {
      let flag = true;
      // 循环所有的小框，判断他们的checked的抓状态，如果有一个是false，那就说明页面有没有选中的框，这时候头部的框应该是false
      // 如果他们的checked全部是true，说明页面的小框是全部选中的状态，那头部的框应该是true
      $checks.each((index, item) => {
        if ($(item).prop('checked') === false) {
          flag = false;
        }
      });
      $checkHead.prop('checked', flag);
    })
  };

  // 批量删除
  let batchDelete = () => {

    function deleteX(index, $checks) {
      if (index > $checks.length - 1) {
        // 如果当前条件成立，说明全部被信息已经删除完了，停止递归，让页面从新渲染
        render();
        alert('当前信息已经全部删除成功');
        return;
      }
      let $item = $checks.eq(index); // 当前的index是0，所以此时在获取第一个小框
      let $grandP = $item.parent().parent(); // 获取当前小框对应的tr
      let userId = $grandP.attr('data-id');
      axios.get('user/delete', {
        params: {
          userId
        }
      }).then(result => {
        let { code } = result;
        if (parseFloat(code) === 0) {
          deleteX(index + 1, $checks);
        }
      })
    };
    $delateAll.click(function () {
      let $checks = $tbody.find('input[type=checkbox]'); // 获取所有的小框
      $checks = $checks.filter((index, item) => {
        // if($(item).prop('checked') === true){
        //   return true
        // }
        return $(item).prop('checked');
      });


      alert(`您确定要删除这${$checks.length}条信息吗`, {
        title: '批量删除',
        confirm: true,
        handled: msg => {
          if (msg === 'CONFIRM') {
            // 在这里发送删除的请求
            // 写一个函数专门用来发送删除请求
            // 因为后台没有批量删除的接口，所以咱们只能一个一个删除来模拟批量删除的效果，用递归的形式
            deleteX(0, $checks);
          }
        }
      })
    })
  };



  return {
    init: () => {

      checkpower();
      selectBind().then(() => {
        // ajax的串行
        render()
      });
      handleFilter();
      batchDelete();
    }
  }
})();

userList.init();
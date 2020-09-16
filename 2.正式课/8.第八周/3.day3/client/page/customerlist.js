

let customerList = (function () {
  let $selectBox = $('.selectBox');
  let $searchInp = $('.searchInp');
  let $tableBox = $('.tableBox');
  let $tbody = $tableBox.find('tbody');
  let $pageBox = $('.pageBox');
  let $pageNum = $pageBox.find('.pageNum');
  let lx = ''; // 请求的类型，如果是all就是请求全部客户，如果是my就是请求我的客户
  let limit = 10; //这是每一页请求的数据的条数
  let page = 1; // 当前请求的页码

  let render = () => {
    axios.get('/customer/list', {
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
        total, // 一共有多少条数据
        totalPage, // 一共有多少页
        data
      } = result;
      // console.log(totalPage);
      if (parseFloat(code) === 0) {
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
            userId,
            userName
          } = item
          str += `
          <tr data-id="${id}" data-name="${name}">
            <td class="w8">${name}</td>
            <td class="w5">${sex == 1 ? '女' : '男'}</td>
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
        </tr>
          `
        });
        $tbody.html(str);
        // 重新渲染分页
        let str1 = ``;
        page>1 ? str1+=`<a href="javascript:;">上一页</a>`:null;
        str1+=`<ul class="pageNum">`;
      
        for(let i = 0;i<totalPage;i++){
          str1+=`<li class="${page == i+1?'active':''}">${i+1}</li>`
        };
        str1+=`</ul>`
        page<totalPage ? str1+=`<a href="javascript:;">下一页</a>`: null;

        $pageBox.html(str1);



        // <a href="javascript:;">上一页</a>
        //   <ul class="pageNum">
        //     <li class="active">1</li>
        //     <li>2</li>
        //     <li>3</li>
        //     <li>4</li>
        //     <li>5</li>
        //   </ul>
        //   <a href="javascript:;">下一页</a>
      }
    })
  };
  let handle = ()=>{
    $selectBox.on('change',function(e){
        render();
    });
    $searchInp.on('blur',function(e){
      render();
    });
    $pageBox.click(function(e){
      console.log(111111);
        let target = e.target;
        let tagName = target.tagName;
        let tagVal = target.innerText;
        if(tagName === 'A'){
          if(tagVal === '上一页') page--;
          if(tagVal === '下一页') page++;
          render();
        }
        if(tagName === 'LI'){
          page = parseFloat(tagVal);
          render()
        }
    })

  }

  return {
    init: () => {
      lx = window.location.href.queryURLParams()['lx'] || '';
      render();
      handle();
    }
  }
})();
customerList.init();
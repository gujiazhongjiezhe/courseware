let visit = (function () {
  let $tableBox = $('.tableBox');
  let $tbody = $tableBox.find('tbody');
  let $visitTime = $('.visitTime');
  let $visitText = $('.visitText');
  let $submit = $('.submit');
  let customerId = null;

  let render = () => {
    axios.get('/visit/list', {
      params: {
        customerId
      }
    }).then(result => {
      let {
        code,
        data
      } = result;
      if (parseFloat(code) == 0) {
        let str = ``;
        data.forEach(item => {
          let {
            id,
            customerId,
            customerName,
            visitText,
            visitTime
          } = item;
          str += `
          <tr data-id="${id}">
              <td class="w5">${id}</td>
              <td class="w15">${visitTime}</td>
              <td class="w70 wrap">${visitText}</td>
              <td class="w10">
                <a href="javascript:;">删除</a>
              </td>
				</tr>
          `
        });

        $tbody.html(str);
        return;
      }
      return Promise.reject();
    }).catch(()=>{
      alert('暂无数据');
      $tbody.html('');
    })
  };

  let submitHandle = ()=>{
   
    $submit.click(function(){

      axios.post('/visit/add',{
        customerId,
        visitText:$visitText.val().trim(),
        visitTime:$visitTime.val().trim()
      }).then(result=>{
        let  {code} = result;
        if(parseFloat(code) ===0){
          alert('新增成功');
          $visitText.val('')
          render();
        }
      })
    })
  } 

  return {
    init: () => {
      customerId = window.location.href.queryURLParams()['customerId'] || 0;
      render();
      submitHandle();
    }
  }
})();
visit.init();
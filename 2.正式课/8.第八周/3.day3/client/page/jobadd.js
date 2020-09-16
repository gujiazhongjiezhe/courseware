let $inputs = $('.form').eq(2).find('input');
let $submit = $('.submit');

console.log($inputs,$submit);

$submit.click(function(){
  let str = '';
  $inputs.each((index,item)=>{
      if($(item).prop('checked')){
        str+=`|${item.id}`
      }
  });
  str = str.substring(1);
  console.log(str);
})
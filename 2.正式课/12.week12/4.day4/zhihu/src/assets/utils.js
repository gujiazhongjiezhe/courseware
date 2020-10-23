export function formatTime(time){
  time = time.toLocaleDateString(); // '2020/10/23';
  let str = '';
  time.replace(/\d+/g,function(val){
      val = val.length<2 ? '0'+val:val; // 不足是为补零
      str+=val;
  });
  return str;
  // '20201023'

};


export function delay(interval = 3000) {
	return new Promise(rsolve => {
		setTimeout(() => {
			rsolve();
		}, interval);
	});
}
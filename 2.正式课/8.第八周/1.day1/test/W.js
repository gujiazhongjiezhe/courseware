// let a = 100;
// function fn(){
//   console.log(200);
// }

// // while(1){}

// module.exports = {
//   fn:fn,
//   a
// }

function sum(...arg){
    return eval(arg.join('+'))
};

module.exports = {
  sum
}
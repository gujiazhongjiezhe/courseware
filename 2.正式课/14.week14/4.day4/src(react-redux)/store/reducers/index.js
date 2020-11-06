import {combineReducers} from 'redux';
import count from './count'

let reducer = combineReducers({
  count // 当前的count属性名就是state合并之后的属性名
});
export default reducer;
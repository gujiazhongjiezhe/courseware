// 这是创建store仓库的
import {createStore} from 'redux';
import reducer from './reducers/index'
let store = createStore(reducer);
export default store;
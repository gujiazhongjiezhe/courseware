import { ADD_NUM, MIN_NUM } from '../action-types';
let initState = {
  num: 0
}

function count(state = initState, action) {
  switch (action.type) {
    case ADD_NUM:
      return { ...state, num: state.num + action.payload }
    case MIN_NUM:
      return { ...state, num: state.num - action.payload }
  }
  return state
}

export default count; // 建立count组件的reducer
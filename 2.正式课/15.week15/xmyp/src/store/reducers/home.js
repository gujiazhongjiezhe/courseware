import {INIT} from '../action-types';
const CLEAR = 'CLEAR'
let initState = {
  sliders:null,
  activity:null
};

function home (state = initState,action){
  state = JSON.parse(JSON.stringify(state));
  console.log(action);
  switch(action.type){
    case INIT:
      let {sliders,activity} = action.payload;
      state.sliders = sliders;
      state.activity = activity;
      break;
      case CLEAR:
        state.sliders = null;
        break;

  }
  return state; // 这个return每一次执行都走
}

export default home;
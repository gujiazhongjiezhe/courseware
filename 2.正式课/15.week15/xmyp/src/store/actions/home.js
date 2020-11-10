import { INIT } from '../action-types';
import api from '../../api';

export default {
  init() {
    return async (dispatch, getState) => {
      let data = await api.home.queryInit();
      dispatch({
        type:INIT,
        payload:data
      })
    //  api.home.queryInit().then((res) => {
    //     dispatch({
    //       type: INIT,
    //       payload: res
    //     })
    //   })

    }
  }
}
function createStore(reducer){
  let listener = [];
  let state; 
  let getState = ()=>JSON.parse(JSON.stringify(state));
  let dispatch = (action)=>{

     state = reducer(state,action);
     listener.forEach(item=>{
        if(typeof item ==='function'){
          item()
        }
     });
  }
  dispatch({});
  let subscribe = (fn)=>{
    listener.push(fn);
    return ()=>{
      listener = listener.filter(item=>{
        if(item === fn){
          return false
        }
        return true;
      }) 
    }
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}
import React,{Component} from 'react';
import PropTypes from 'prop-types';
// Provider的作用是把当前的store传递给里边里的每一个子组件进行使用(利用的是上下文传参)
export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  static childContextTypes = { // 定义上下文里的数据的格式
    store:PropTypes.object
  }
  getChildContext(){ // 设置当前上下文里的数据的值
    store:this.props.store
  }
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

// let mapStateToProps = (state)=>{
//   return {
//     ...state.count
//   }
// }

// let mapDispatchToProps = (dispatch)=>{
//   return {
//     add:(value)=>{dispatch(action.add(value))},
//     min:(value)=>{dispatch(action.add(value))}
//   }
// }
// export default connect(mpaStateToProps,mapDispatchToProps)(Count)


export const connect = (mapStateToProps,mapDispatchToProps)=>(Component)=>{
    return class A extends Component {
      constructor(props){
        super(props)
        this.state = mapStateToProps(this.context.store.getState())
      }
      static contextType = { // 解说上下文中的数据，并且定义数据的类型
        store:PropTypes.object
      }
      componentDidMount(){
       this.res = this.context.store.subscribe(()=>{
          let res = mapStateToProps(this.context.store.getState()); // 对象
          this.setState(res)
        })
      }
      componentWillUnMount(){
        this.res(); // 当当前组件卸载的话就取消订阅该方法
      }
      bindActionsCreator = (action, dispatch) => {
        // 当前这个函数会返回一个和61行一样的对象
        let obj = {};
        for (let key in action) {
            obj[key] = (value) => { dispatch(action[key](value)) }
        }
        return obj;
    }

      render(){
        let h = null;
        if(typeof mapDispatchToProps ==='function'){
          h = mapDispatchToProps(this.context.store.dispatch)
        }
        else {
          h = this.bindActionsCreator(mapDispatchToProps,this.context.store.dispatch)
        }
       
        return (<div>
          <Component {...this.state} {...h}></Component>
        </div>)
      }
    }
}





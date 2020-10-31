import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './Vote.less'
class Vote extends Component {
  constructor(props) {
    super(props);
    let {sup,opp} = this.props
    this.state = {
      sup, // 支持人数
      opp // 反对人数
    };
  }


  render() {
    let {sup,opp} = this.state
    return (<div className="voteBox">
          <header className="headerBox">
            <h3>板牙拖车</h3>
            <span>总人数:{sup + opp}</span>
          </header>
          <main className="mainBox">
            <p>支持人数：{sup}</p>
            <p>反对人数：{opp}</p>
            <p>支持率：{this.rate()}</p>
          </main>
          <footer>
            <button onClick={this.fn.bind(null,'sup')}>支持</button>
            <button onClick={this.fn.bind(null,'opp')}>反对</button>
          </footer>
    </div>);
  }
  rate = ()=>{
    //return (支持人数/总人数 *100).toFixed(2) + '%'
    let {sup,opp} = this.state;
    let total = sup === 0 ? 0 : (sup/(sup+opp)*100).toFixed(2)
    return total +'%'
  }
  fn = (type)=>{
    let {sup,opp} = this.state;
    let obj = {};
    if(type ==='sup'){
      obj = {sup:sup+1}
    }
    else {
      obj = {opp:opp+1}
    }
    this.setState(obj)
  }
}

ReactDOM.render(<Vote  sup={0} opp={0}/>,document.getElementById('root'))


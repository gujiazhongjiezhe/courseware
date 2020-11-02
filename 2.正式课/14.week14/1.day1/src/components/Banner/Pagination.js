import React,{Component} from 'react';
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    let {activeIndex,data} = this.props; // 0 1 2 3 4   0 1 2 3
    activeIndex = activeIndex === 4 ? 0 : activeIndex;
    // this.props.activeIndex = 0
      // data.push(0) 这样写是会把外层的值的堆内存里的东西改变的
    return (
      <div className="pagination">
      {data.map((item,index)=>{
        return <span key={item.id} className={activeIndex === index? 'active':null} onClick={this.props.changeIndex.bind(null,index)}></span>
      })}
    </div>
    );
  }
}

export default Pagination;
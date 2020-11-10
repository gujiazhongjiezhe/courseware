import React,{Component} from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import './index.less';
  
  class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
        {this.props.data.map(item=>{
          return <div className="swiper-slide" key={item.url}>
              <img src={item.url}/>
            </div>
        })}
            
        </div>
        <div className="swiper-pagination"></div>
      </div>
    );
  }
  componentDidMount(){
    this.MySwiper = new Swiper('.swiper-container',{
      loop:true,
      autoplay:{
        delay:2000
      },
      pagination:{
        el:'.swiper-pagination'
      }
    })
  }
}

export default Banner;
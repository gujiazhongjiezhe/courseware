import axios from './axios';

// 1.获取今日新闻
export function latest(){
  return axios.get('/api/4/news/latest')
}

// 2.获取过往新闻
export function before(date){
  return axios.get(`/api/4/news/before/${date}`)
}

// 3.获取新闻详情
export function detail(id){
  return axios.get(`/api/4/news/${id}`)
}
import axios from 'axios'

var ccapi = axios.create({
  baseURL: 'https://ccapi.csslcloud.net',
  timeout: 10000,
  headers: {'Token': 'foobar'}
});
// console.log(getCookie('token_presenter'))

/**
 * 方法说明 获取token
 *  登录页面 
 * @method 
 * @forviews/login
 * @param 
 * {
    roomid,
    userid,
    name,
    password,
    client:0,
    role
  }
 * @return {promise} 返回请求结果
 */
export function loginByToken(data) {
    return ccapi({
        method: 'get',
        url: 'https://ccapi.csslcloud.net/api/v1/serve/room/token/create',
        params: data
    })
   
};

/**
 * 方法说明 获取图片上传服务器 token
 * 聊天子组件 发送图片 
 * @method 
 * @for components/chat/dialogImg
 * @param 
 *  {
      'userid',
      'roomid',
      'type': 'chatimg'
    }
 * @return {promise} 返回请求结果
 */
export function ossDirname(data) {
  return ccapi({
      method: 'get',
      url: 'https://ccapi.csslcloud.net/api/oss/token',
      params: data
  })
};

/**
 * 方法说明 上传图片
 * 聊天子组件 上传图片 
 * @method 
 * @for components/chat/dialogImg
 * @param 
 *  
 * @return {promise} 返回请求结果
 */
export function uploadPictures(url,data) {
  return ccapi({
      method: 'post',
      url: url,
      data: data
  })
};

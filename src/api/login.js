import {getCookie,setCookie} from '@/assets/js/utils'
import axios from 'axios'

var ccapi = axios.create({
  baseURL: 'https://ccapi.csslcloud.net',
  timeout: 1000,
  headers: {'Token': 'foobar'}
});

function loginByToken(data) {
    return ccapi({
        method: 'get',
        url: 'https://ccapi.csslcloud.net/api/v1/serve/room/token/create',
        params: data
    })
    
}
export default {
    loginByToken,
}
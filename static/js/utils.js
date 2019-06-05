/**
 * 存储复用token
 */

// 设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; path=/";
}

// 读取cookies
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

/*格式化时间
 *@param{Number or string} 如 400 或 '400'
 *@return {string} 06:40 
*/
function timeFormat(time) {
    var t = parseInt(time),
        h,i,s;
    h = Math.floor(t/3600);
    h = h ? (h + ':') : '';
    i = h? Math.floor(t%3600/60) : Math.floor(t/60);
    s = Math.floor(t%60);
    i = i > 9 ? i : '0'+i;
    s = s > 9 ? s : '0'+s;

    var result = h + i + ':' + s;
    return (h + i + ':' + s);

}
// export default {
//     getCookie,
//     setCookie
// }
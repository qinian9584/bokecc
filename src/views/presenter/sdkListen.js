
/**
 * 讲师页面专用
 *用于监听sdk 回调函数
 * @author tangjin
 * @module @views/presenter/sdkListen.js
 */

/*订阅 sdk事件
 *@param{vue} vue实例对象
 *@return {undefined}  
*/
function sdkListen(vue) {
    // 监听登陆成功
    rtc.on('login_success', function (data) {
        // 登录成功
        console.log(data,data.live.status,'登录成功------------------');
        
        let time = (data.live.status)?(data.live.last):0;//已经直播时长
        // vue.$store.dispatch('setLiveStatus',data.live.status,time);//修改直播状态
        
  

        rtc.createLocalStream({
            streamName: 'main',
            success: function(stream){
                // 将本地流显示在id 为 'my'的盒子里
                // stream.show('my');
                vue.addVideo(stream,'my')
                
            },
            fail: function(err){
                console.log(err);
            }
        });
    });
    
    // 监听登陆失败
    rtc.on('login_failed', function (err) {
        // 登录失败
        console.error('登录失败',err);
    });

    // 直播开始
    rtc.on('publish_stream', function (data) {
        console.log(data,'开启直播成功------------------');
        vue.$store.dispatch('setLiveStatus',1);//修改直播状态;
    })

    // 直播已关闭
    rtc.on('end_stream', function(str){
        console.log('直播已关闭-----------------------------------');
        vue.$store.dispatch('setLiveStatus',0);//修改直播状态;
    });
} 


export {
    sdkListen,
}
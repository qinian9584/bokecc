
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
        console.log(data,data.live.states,'登录成功------------------');
        
        vue.$store.state.room.liveStatus = data.live.status;
        if(data.live.status){
            vue.$store.dispatch('setLiveStartData',data.live.last);//修改直播时间
        }


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
        console.log(data,'正在直播中------------------');
    })
} 


export {
    sdkListen,
}
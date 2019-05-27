
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
        vue.$store.dispatch('setLiveStatus',{'status':data.live.status,'time':time});//修改直播状态
        rtc.createLocalStream({
            streamName: 'main',
            success: function(stream){
                // 将本地流显示在id 为 'my'的盒子里
                vue.addVideo(stream,'presentervideo','my')
                if(data.live.status){
                    // 推送本地流
                    rtc.publish({
                        streamName: 'main',
                        success: function(stream){
                            console.log('本地流推送成功', stream.id());
                            rtc.updateMcResult({pid:1});
                        }
                    });
                }
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
        
        // 推送本地流
        rtc.publish({
            streamName: 'main',
            success: function(stream){
                console.log('本地流推送成功', stream.id());
                rtc.updateMcResult({pid:1});
            }
        });
    })

    // 直播已关闭
    rtc.on('end_stream', function(str){
        console.log('直播已关闭-----------------------------------');
        vue.$store.dispatch('setLiveStatus',0);//修改直播状态;
    });

    //监听到 学生举手   id为举手用户用户的id
    rtc.on("user_hand",   function(id){
        console.log(id,'000000000000000000000000');
        rtc.certain({
            uid:id,
            success: function(str){
                console.log('同意上麦成功', str);
            },
            fail: function(data){
                console.log('同意上麦失败',data);
            }
        });
    });

    // 监听有流可订阅事件
    rtc.on('allow_sub', function (stream) {
        // 订阅流
        if(stream.isMixed()){
            console.log('是混合流,不定阅');
        }else{
            // 订阅流
            rtc.trySubscribeStream({
                tryStream: stream,
                success:function(stream){
                    // 订阅流成功
                    var streamId = stream.id(); // 获取流id
                    console.log('订阅流成功-----------------------------------------------------------------------', streamId);
                    //将视频动态插入盒子中
                    // stream.show(streamId); // 将流显示到id为streamId的盒子中
                    vue.addVideo(stream,'talkervideo',streamId)
                },
                fail: function(err){
                    console.log(err);
                }
            });
        }
    });

    // 取消订阅已经移除房间的流
    rtc.on('unSub', function(stream){
        rtc.unSubscribeStream({
            unSubStream: stream,
            success:function(id){
                console.log('取消订阅成功', id);
            },
            fail: function(err){
                console.log('取消订阅失败', err);
            }
        });
    });

    // 删除显示该流用的界面dom
    rtc.on('stream_removed', function (stream) {

    });
} 


export {
    sdkListen,
}

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
        document.title = data.name;
        vue.$store.commit('loginSuccessfully', true)//是否登录成功
        let time = (data.live.status)?(data.live.last):0;//已经直播时长
        vue.$store.dispatch('setLiveStatus',{'status':data.live.status,'time':time});//修改直播状态
        
        
        rtc.getHistory({
            success: function(data){
                console.log('------------------获取历史数据成功-----------------', data);
                vue.chatLog = data.datas.meta.chatLog
            },
            fail: function(str){
                console.log(str);
            }
         });
    });

    // 加入房间成功，标志着视频流服务已准备完成
    rtc.on('conference_join',function(data){
        rtc.createLocalStream({
            streamName: 'main',
            success: function(stream){
                // 将本地流显示在id 为 'my'的盒子里
                vue.addVideo(stream,'presentervideo','my')
                if(vue.$store.state.room.liveStatus==1){
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
    })
    
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
        const streamkeys = 'streamId_'+stream.id();
        
        for(let i in vue.talkervideo){
            if(vue.talkervideo[i].streamkeys==streamkeys){
                vue.talkervideo.splice(i,1);
            }
        }    
    });

    // 当有人员上下麦或人员进出房间时会收到该事件
    let fristOnlineUsers = true;//第一次收到online_users
    rtc.on('online_users', function(data){
        const personnelList = vue.$store.state.personnelList;
        const userSettings = Speaker.userSettings;
        console.log('------------------------------------------------------------------------')
        // console.log(data);
        // console.log(userSettings);
        // console.log(personnelList)

        data.map(function (item) {
            if(fristOnlineUsers){//第一次收到online_users
                var itemVal = userSettings[item.id];
                for(let key  in itemVal){
                    item[key] = itemVal[key]
                }

                // console.log(item.id,itemVal);
            
            }else{
                item.allow_assistant = false;
                item.allow_audio = true;
                item.allow_chat = true;
                item.allow_draw = false;
                item.allow_video = true;
                item.hand_up = false;
            }
            return item;
        });

        if(fristOnlineUsers) fristOnlineUsers = false;//第一次收到online_users
        console.log(data)
        vue.$store.commit('online_users',data)
    });

    // 单独个人配置项监听
    rtc.on('switch_user_settings', function (data) {
        console.log('----------------------------单独个人配置项监听--------------------------------------------')
        console.log(data);
    })
} 


export {
    sdkListen,
}
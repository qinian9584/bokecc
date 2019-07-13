<template>
  <div class="cc-container">
    <!-- 导航菜单部分 -->
    <div class="nav">
      <div class="nav-body">
        <div class="nav-left">
          <!-- 课件库 -->
          <div class="menu-box">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconkejianku"></use>
              </svg>
              <span>课件库</span>
            </el-button>
          </div>

          <!-- 工具箱 -->
          <div class="menu-box">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icongongjuxiang"></use>
              </svg>
              <span>工具箱</span>
            </el-button>
          </div>

          <!-- 花名册 -->
          <div class="menu-box">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconhuamingce"></use>
              </svg>
              <span>花名册</span>
            </el-button>
          </div>
        </div>

        <!-- 直播倒计时 -->
        <div class="nav-center" v-if="false">
          <span>直播倒计时&nbsp;</span>
          <span>01：20：22</span>
        </div>

        <!-- 右侧菜单 -->
        <div class="f-right nav-right">
          <div class="menu-box cut-wheat"  v-if="false">
            <el-button type="primary" size="mini" @click="demo">
              <span>切麦</span>
            </el-button>
          </div>
          <!-- 设备检查 -->
          <div class="menu-box setpadding">
            <el-button type="primary" size="mini" @click="demo">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconjiance"></use>
              </svg>
            </el-button>
          </div>
          <!-- 节点切换 -->
          <div class="menu-box setpadding">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconjiedian"></use>
              </svg>
            </el-button>
          </div>
          <!-- 设置 -->
          <div class="menu-box setpadding">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconshezhi"></use>
              </svg>
            </el-button>
          </div>
          <!-- 退出登录 -->
          <div class="menu-box setpadding">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconxiake"></use>
              </svg>
            </el-button>
          </div>
          <!-- 收到录制 -->
          <div class="menu-box setpadding">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconluzhi"></use>
              </svg>
            </el-button>
          </div>
          <!-- 开启直播 or 结束直播 -->
          <div class="menu-box begins">
            <div v-if="$store.state.room.liveStatus === 0">
              <el-button type="primary" size="mini" class="backgorund-FF9502" @click="startLive">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#iconshangke"></use>
                </svg>
                <span>上课</span>
              </el-button>
            </div>
            <div v-else-if="$store.state.room.liveStatus === 2">
              <el-button type="primary" size="mini" class="backgorund-FF9502">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icongongjuxiang"></use>
                </svg>
                <span>loddimg</span>
              </el-button>
            </div>
            <div v-else-if="$store.state.room.liveStatus === 1">
              <el-button type="primary" size="mini" class="backgorund-EC422F" @click="stopLive">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#iconxiake"></use>
                </svg>
                <span>{{liveStartTime}}</span>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要部分 -->
    <div :class="{main:true,'student-position-fixd':studentPositionFixd}">
      <!-- 画板 -->
      <brading-board></brading-board>

      <div class="right-box">
        <!-- 视频 -->
        <!--老师视频-->
        <div class="presenter-video-box">
          <component
            :is="value.component"
            :videodata="value.data"
            v-for="(value,key,index) in presentervideo"
            :key="index"
          ></component>
        </div>
        <!--学生视频-->
        <div class="student-video-box">
          <component
            :is="value.component"
            :videodata="value.data"
            v-for="(value,key,index) in talkervideo"
            :key="index"
          ></component>
        </div>

        <!-- 聊天 -->
        <online-chat ref="chat" :chatLog="chatLog"></online-chat>
      </div>
    </div>

    <!-- 花名册 -->
    <roster></roster>
  </div>
</template>

<script>
//组件
import bradingBoard from "../../components/board/drawingBoard";// 白板
import onlineChat  from "../../components/chat/chat";//聊天
import videoWebget from "../../components/video/video";//视频

//js
import { sdkListen } from "./sdkListen.js"; //用于监听sdk回调
export default {
  name: "presenter",
  components: {
    bradingBoard, //白板组件
    onlineChat, //聊天组件
    roster:() => import('../../components/alive/roster'),//花名册
  },
  data() {
    return {
      liveStartTime:0,//格式化后的 时间
      studentPositionFixd:false,//切换学生视频，摆放位置（是否在左下角）
      presentervideo: [], //老师视频
      talkervideo: [], //学生视频
      chatLog:[],//聊天历史数据 
    };
  },
  created() {
    let query = this.$route.query;
    query.role = this.$route.name;

    localStorage.setItem("role", query.role);

    for (var obj in query) {
      this.$store.state.room[obj] = query[obj];
    }

    const token = getCookie("token_presenter");
    window.rtc = new Rtc({
      userid: this.$store.state.room.userid, // 用户ID
      sessionid: token
    });
  },
  methods: {
    demo() {
      this.talkervideo.splice(0,1);
    },

    //增加视频
    addVideo(stream,videobox, id) {
      const streamkeys = 'streamId_'+id;
      this[videobox].push(
        {
          streamkeys,
          component: videoWebget,
          data: {
            stream,
            id:'s'+id
          }
        }
      )
    },
    //开始直播
    startLive() {
      let vue = this;
      vue.$store.dispatch('setLiveStatus',2);//修改直播状态
      rtc.startLive({
        success: function(data) {
          console.log("开启直播成功", data);
        },
        fail: function(str) {
          // vue.$store.dispatch('setLiveStatus',0);//修改直播状态
          console.log(str);
        }
      });
    },
    //结束直播
    stopLive() {
      let vue = this;
      vue.$store.dispatch('setLiveStatus',2);//修改直播状态
      rtc.stopLive({
        success: function() {
          console.log("关闭直播成功");
        },
        fail: function(str) {
          console.log(str);
          vue.$store.dispatch('setLiveStatus',1);//修改直播状态
        }
      });
    }
  },
  mounted() {
    //模板编译挂在之后  在这发起后端请求，拿回数据，配合路由钩子做一些事情
    sdkListen(this);
  },
  computed: {
    // 计算属性的 getter
    
  },
  watch: {    
    talkervideo:{//普通的watch监听
      handler: function(val, oldVal) {
        const length = val.length;
        if(length>=2){
          if(!this.studentPositionFixd) {
            this.studentPositionFixd = true;
          }
        }else{
          if(this.studentPositionFixd) {
            this.studentPositionFixd = false;
          }
        }
        
      },
      deep: true
    },
    //监听到直播状态发生变化时
    '$store.state.room.liveStatus':function(state){
      let vue = this;
      if(state == 1) {
        clearInterval(intval)
        let time = this.$store.state.room.liveStartTime;
        this.liveStartTime = timeFormat(time);
        let intval = setInterval(function () {
          if (vue.$store.state.room.liveStatus !== 1) {
            clearInterval(intval)
          }
          time++;
          vue.liveStartTime = timeFormat(time);
        }, 1000)
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import "../../assets/css/main.scss";
</style>

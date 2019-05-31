<template>
  <div class="main-right f-right">
    <div class="slide-show">
      <div class="top">
        <ul class="nav-ul" v-show="false">
          <li
            v-for="(item, index) in list"
            :key="index"
            @click="goto(index)"
            :listinde="index"
            :class="{active:index == acIndex}"
          >{{item}}</li>
        </ul>
      </div>
      <div class="chat-par">
        <div class="chat-concen-nav">
          <div class="chat-content">
            <div class="chat-wedget" v-loading="fullscreenLoading">
              <div class="loading-box"  id="chatWedGet">
                <div class="chat-content" id="chatContent">
                  <div
                    v-for="(item, index) in chatList"
                    :key="index"
                    :class="{'chat-dialog-other':item.ISme == false,'chat-dialog-self':item.ISme == true}"
                  >
                    <ul>
                      <li class="click-other">
                        <span class="span-other">
                          <strong class="Message_type_teacher">{{item.userRole}}</strong>
                          <strong class="Message_name">{{item.userName}}</strong>
                          <strong class="Message_time">{{item.time}}</strong>
                        </span>
                      </li>
                      <li>
                        <div
                          :class="{'chat-msg-other':item.ISme == false,'chat-msg-self':item.ISme == true}"
                        >
                          <span v-if="item.IsTextChat" class="chat-msg" v-html="item.content"></span>
                          <el-image class="chatimg"
                            v-if="!item.IsTextChat"
                            :dataurl="item.imgSrcMax"
                            :src="item.imgSrcMin"
                            @click.native="enlargeImg(item.imgSrcMax)"
                          >
                            <div slot="placeholder" class="image-slot">
                              加载中<span class="dot">...</span>
                            </div>
                          </el-image>

                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-send">
              <div class="chat-media">
                <div class="faceChoice" id="faceChoice" @click="isIcon()"></div>
                <div class="imgChoice ml10">
                  <input class="img_file" id="img_file" ref="pathClear" type="file" @change="imgFile($event)">
                </div>
              </div>
              <div class="chat-trigger clearfix">
                <textarea 
                type="text" 
                class="chat-content-input" 
                id="chatContentInput" 
                v-model="inputData" 
                :disabled="!allow_chat" 
                v-on:keyup.13="SendChat"
                ></textarea>
                <input type="button" value="发送" class="chat-send-btn" @click="SendChat">
              </div>
              <div class="posimg" id="posimgbox" ref="posimgbox" v-show="isShowIcon">
                <div
                  class="bod-smgcion"
                  v-for="(item, index) in iconList"
                  :key="index"
                  :index="index"
                  @click="emj(index+1)"
                >
                  <img :src="item.src">
                </div>
              </div>
            </div>
          </div>
          <div>2</div>
          <div>3</div>
        </div>
      </div>
    </div>
    
    <dialog-alert :file='file'></dialog-alert>
  </div>
</template>

<script>
export default {
  components: {
    dialogAlert: () => import('./dialogImg'),//上传图片 放大图片
  },
  props: ["chatLog"],
  data() {
    return {
      fullscreenLoading:true,//loading 效果
      listinde: 0,
      acIndex: 0,//对应选项卡
      allow_chat:true,//是否禁言；
      list: ["聊天","问答", "成员"], //聊天选项卡,目前不需要，影藏状态
      isShowIcon: false,//是否显示图标
      inputData: "",
      chatList: [], //聊天历史记录
      iconList: [
        { src: require("../../assets/img/em2/01.png") },
        { src: require("../../assets/img/em2/02.png") },
        { src: require("../../assets/img/em2/03.png") },
        { src: require("../../assets/img/em2/04.png") },
        { src: require("../../assets/img/em2/05.png") },
        { src: require("../../assets/img/em2/06.png") },
        { src: require("../../assets/img/em2/07.png") },
        { src: require("../../assets/img/em2/08.png") },
        { src: require("../../assets/img/em2/09.png") },
        { src: require("../../assets/img/em2/10.png") },
        { src: require("../../assets/img/em2/11.png") },
        { src: require("../../assets/img/em2/12.png") },
        { src: require("../../assets/img/em2/13.png") },
        { src: require("../../assets/img/em2/14.png") },
        { src: require("../../assets/img/em2/15.png") },
        { src: require("../../assets/img/em2/16.png") },
        { src: require("../../assets/img/em2/17.png") },
        { src: require("../../assets/img/em2/18.png") },
        { src: require("../../assets/img/em2/19.png") },
        { src: require("../../assets/img/em2/20.png") },
        { src: require("../../assets/img/em2/21.png") },
        { src: require("../../assets/img/em2/22.png") },
        { src: require("../../assets/img/em2/23.png") },
        { src: require("../../assets/img/em2/24.png") },
        { src: require("../../assets/img/em2/25.png") },
        { src: require("../../assets/img/em2/26.png") },
        { src: require("../../assets/img/em2/27.png") },
        { src: require("../../assets/img/em2/28.png") },
        { src: require("../../assets/img/em2/29.png") },
        { src: require("../../assets/img/em2/30.png") },
        { src: require("../../assets/img/em2/31.png") },
        { src: require("../../assets/img/em2/32.png") },
        { src: require("../../assets/img/em2/33.png") },
        { src: require("../../assets/img/em2/34.png") },
        { src: require("../../assets/img/em2/35.png") },
        { src: require("../../assets/img/em2/36.png") },
        { src: require("../../assets/img/em2/37.png") },
        { src: require("../../assets/img/em2/38.png") }
      ], //聊天输入框文本
      file:{
        upData:true,
        isshow:false,
        imgsrc:'https://liveclass.csslcloud.net/chat/83F203DAC2468694/4D807DF85C5481FA9C33DC5901307461/SwDMkdjBBQ.png'
      },//放大图片缩小图片数据；
    };
  },
  created() {
    let vue = this;
    document.addEventListener("click", e => {
      if (event.target.id == "faceChoice") return;
      if (!this.$refs.posimgbox.contains(e.target)) {
        this.isShowIcon = false;
      }
    });
    
    /**
    *  
    *	收到聊天
    */
    rtc.on("chat_message", function(msg) {
      const data = JSON.parse(msg);
      if(data.msg.substring(0, 5) == '[img_'){
        vue.ReceiveImgChat(data);
      }else{
        vue.showBackChatL(data);
      }

      
    });
  },
  methods: {
    //切换选项卡
    goto(index) {
      // this.listinde = document.querySelectorAll(".active")[0].getAttribute("listinde");
      this.acIndex = index;
      console.log(index);
      let domChat = document.querySelectorAll(".chat-concen-nav")[0];
      domChat.style.left = -index * 280 + "px";
    },
    emj(index) {
      //选择图标，加入输入框
      let order = index < 10 ? 0 + "" + index : index;
      const emstr = "[em2_" + order + "]";
      this.inputData += emstr;
    },
    isIcon() {
      
      //显示图标
      this.isShowIcon = !this.isShowIcon;
    },
    showBackChatL: function(data) {
      var datalistL = {};
      datalistL.time = data.time.substr(0,5);
      datalistL.userName = data.userName;
      // 计算人员身份
      if (data.userrole == "presenter") {
        datalistL.userRole = "老师";
      } else {
        datalistL.userRole = "学生";
      }
      datalistL.content = this.ExtData(data.msg);
      // 判断 是否 是自己发出的消息
      if(data.userid == rtc.viewerid){
        datalistL.ISme = true;
      }else{
        datalistL.ISme = false;
      }
      datalistL.IsTextChat = true; //是否为文本消息
      this.chatList.push(datalistL);
        
      
    },
    ReceiveImgChat: function(data) {
      //收到图片聊天 或者解析历史聊天中图片数据
      var datas = data;
      var joinData = this.joinData;
      //  	console.log(datas ,'------------------------图片聊天---------------------')
      var chatmsgdata = {};

      // chatmsgdata.time = datas.time.substr(0, 5); //时间处理
      chatmsgdata.userName = datas.username || datas.userName;
      // 计算人员身份
      if (datas.userrole == "presenter") {
        chatmsgdata.userRole = "老师";
        chatmsgdata.ISme = true;
      } else {
        chatmsgdata.userRole = "学生";
        chatmsgdata.ISme = false;
      }

      // chatmsgdata.content = vue.ExtData(chatmsgdata.msg);//消息转化

      var userId = datas.userid || datas.userId;
      //     console.log(userId,joinData,msg)

      
      chatmsgdata.IsTextChat = false; //是否为文本消息

      let msg = datas.msg || datas.content;

      //      console.log(msg ,'------------------------图片聊天---------------------')

      msg = msg.substring(5);
      msg = msg.substr(0, msg.length - 1);
      const imgSrcMax = msg
      // const imgSrcMax = msg
      //   .replace(
      //     "liveclass.oss-cn-beijing.aliyuncs.com",
      //     "liveclass.csslcloud.net"
      //   )
      //   .replace("https", "http");
      const imgSrcMin =
        imgSrcMax + "?" + "x-oss-process=image/resize,m_lfit,h_130,w_130";

      chatmsgdata.imgSrcMax = imgSrcMax; //大图src
      chatmsgdata.imgSrcMin = imgSrcMin; //浓缩图src

      this.chatList.push(chatmsgdata);
    },
    SendChat: function() {
      //发送聊天
      var msg = this.inputData;
      if (msg.trim() != "") {
        var nmsg = "";
        var arr = msg.split(" ");
        for(var i=0; i<arr.length;i++){
          var n = arr[i];
          var ur = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
          if (ur.test(n)) {
            nmsg += "[uri_" + n + "] ";
          } else {
            nmsg += n + " ";
          }
        }
        
        rtc.sendMsg(nmsg);
        this.inputData = "";
      }
    },
    ExtData: function(str) {
      
      var er = str.match(/\[em2_([0-9]*)\]/g);
      if (er) {
        for (var i in er) {
          var ind = str.indexOf(er[i]);
          var indlen = Number(str.substr(ind + 5, 2)) - 1;
          str = str.replace(
            str.substr(ind, 8),
            '<img class="msg-img" index="' +
              indlen +
              '" src="' +
              this.iconList[indlen].src +
              '"/>'
          );
        }
      }

      var nmsg = "";
      var arr = str.split(" ");
      for(var i=0; i<arr.length;i++){
        var n = arr[i].replace(/^\s*|\s*$/g,"");
        if (
          n.indexOf("[uri_") == 0 &&
          n.indexOf("]") == n.length - 1 &&
          n.length > 6
        ) {
          var u = n.substring(5, n.length - 1) + " ";
          nmsg +=
            '<a target="_blank" class="a-href"  href="' +
            u +
            '">' +
            u +
            "</a>" +
            " ";
        } else {
          nmsg += n + " ";
        }
      }
      
      return nmsg;
    },
    imgFile: function(event) {
      var file_list = event.target.files;

      if (file_list.length == 0) {
        alert("请选择文件");
        return;
      }

      var file = file_list[0];

      if (!/^image*/.test(file.type)) {
        alert("仅支持上传图片");
        return;
      }
      
      var fileData = file;
      fileData.upData = true; //区分是上传图片 还是放大图片
      fileData.imgsrc = window.URL.createObjectURL(file);
      fileData.isshow = true;
      this.file = file;

      this.$refs.pathClear.value ='';
    },
    enlargeImg: function(src) {
      alert(3333333)
      //放大图片
      var file = {};
      file.imgsrc = src;
      file.upData = false; //区分是上传图片 还是放大图片
      file.isshow = true;
      this.file = file;
    }
  },
  mounted() {
    //模板编译挂在之后  在这发起后端请求，拿回数据，配合路由钩子做一些事情
    
  },
  computed:{

  },
  watch: {
    //监听到 获取聊天历史数据
    chatLog() {
      if(this.chatLog.length==0){
        this.fullscreenLoading = false
      }
      for(let i=0;i<this.chatLog.length;i++){
        let chatLogI = this.chatLog[i];
            chatLogI.msg = chatLogI.content;
        
        // 计算消息发送时间
        let sumTime= new Date(Number(rtc.startTime) + Number(chatLogI.time)*1000);
        let getMinute = sumTime.getMinutes()<10?'0'+sumTime.getMinutes():sumTime.getMinutes();
        let gethoustime = sumTime.getHours() + ":" + getMinute+':00';
        
          chatLogI.time = gethoustime;
          
          if(chatLogI.role==10){
            chatLogI.userrole = 'presenter'
          }
        chatLogI.userid = chatLogI.userId;  
        if(this.chatLog[i].msg.substring(0, 5) == '[img_'){
          this.ReceiveImgChat(this.chatLog[i]);
        }else{
          this.showBackChatL(this.chatLog[i]);
        }
      }
    },
    //执行滚动到底部的逻辑
    chatList(val) {
      this.$nextTick(function() {
        var scrollchat = document.getElementById("chatWedGet");
        scrollchat.scrollTop = scrollchat.scrollHeight;
        this.fullscreenLoading = false;
      });
    }
  },
};
</script>

<style scoped>
.main-right {
    flex: 1;
    width: 100%;
    background: #fff;
    overflow: hidden;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}
::-webkit-scrollbar-track-piece {
  width: 0px;
  background-color: #fff;
}

::-webkit-scrollbar {
  width: 0px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  height: 0px;
  background: #fff;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background: #fff;
  cursor: pointer;
}
.slide-trans-enter-active {
  transition: all 0.5s;
}
.slide-trans-enter {
  transform: translateX(300px);
}
.slide-trans-old-leave-active {
  transition: all 0.5s;
  transform: translateX(-300px);
}
.loading-box{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.slide-show {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 0;
  display: flex;
  flex-direction: column;
}
.top {
  width: 100%;
}
.nav-ul {
  line-height: 35px;
  height: 35px;
  width: 100%;
  overflow: hidden;
  display: flex;
  margin: 0;
  padding: 0;
}
.nav-ul > li {
  flex: 1;
  list-style: none;
  text-align: center;
  background: #F1F1F2;
  cursor: pointer;
}
.nav-ul .active {
  background: #fff;
}
.chat-par {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.chat-concen-nav {
  width: 300%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.6s ease;
}
.chat-concen-nav > div {
  height: 100%;
  width: 250px;
  float: left;
}
.chat-concen-nav > div:nth-child(1) {
  background-color: #f5f5f5;
}
.chat-concen-nav > div:nth-child(2) {
  background: rgb(155, 153, 153);
}
.chat-concen-nav > div:nth-child(3) {
  background: green;
}
.chat-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.chat-wedget {
  flex: 1;
  width: 100%;
  overflow: auto;
}
.chat-send {
  width: 100%;
  height: 85px;
  position: relative;
}
.chat-send .posimg {
  position: absolute;
  top: -100px;
  left: 0;
  height: 100px;
  width: 100%;
  background: #fff;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
}
.chat-send .bod-smgcion {
  padding: 2px;
  width: 22px;
  height: 22px;
  margin: 5px 13px;
  box-sizing: border-box;
  border: 1px solid #fff;
}
.chat-send .bod-smgcion:hover {
  border: 1px solid #33aff6;
}
.chat-send .posimg img {
  width: 17px;
  height: 17px;
}
.chat-media {
  padding: 0;
}
.chat-trigger {
  display: flex;
}
.chat-trigger .chat-content-input {
  flex: 1;
  outline: none;
  margin: 0;
  padding: 0;
  width: 200px;
  border: 1px solid #ddd;
  height: 38px;
  min-height: 38px;
  max-height: 38px;
  line-height: 20px;
  resize: none;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.chat-trigger .chat-send-btn {
    height: 40px;
    background: #f27c19;
    color: #fff;
    border: none;
    cursor: pointer;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
}
.chat-media {
  padding: 10px 0;
}
.chat-dialog-other {
    text-align: left;
    clear: both;
    overflow: hidden;
}
.chat-content {
    padding: 10px;
    font-size: 12px;

}
.faceChoice, .faceChoice:hover {
    background-image: url(../../assets/img/index/classicon.png);
    background-repeat: no-repeat;
    width: 22px;
    height: 19px;
    display: inline-block;
}
.faceChoice {
    background-position: -360px -121px;
}
.faceChoice:hover {
    background-position: -360px -153px;
    cursor: pointer;
}
.imgChoice, .imgChoice:hover {
    background-image: url(../../assets/img/index/classicon.png);
    background-repeat: no-repeat;
    width: 20px;
    height: 17px;
    display: inline-block;
    cursor: pointer;
}
.ml10 {
    margin-left: 10px;
}
.imgChoice {
  overflow: hidden;
  padding: 0;
  margin: 0 0 0 10px;
  border: 0;
  background-position: -395px -123px;
  cursor: pointer;
}
.imgChoice:hover {
    background-position: -395px -155px;
    cursor: pointer;
}
.img_file {
  position: relative;
  opacity: 10;
  display: inline-block;
  width: 40px;
  height: 40px;
  cursor: pointer;
  top: -20px;
  font-size: 0;
  margin: -10px 0 0 0;
  padding: 0;
  border: 0;
}
.chat-content ul{
  padding:0;
  margin: 0;
}
.chat-content ul li{
    word-break: break-all;
    margin-bottom: 10px;
    line-height: 150%;
    position: relative;
    overflow: hidden;
}
.chat-dialog-self {
    /* border-radius: 7px; */
    text-align: right;
    clear: both;
    overflow: hidden;
}
.chat-msg-other {
    float: left;
    background-color: #fff;
    padding: 5px;
    border-radius: 3px;
    border-top-left-radius: 0;
    margin-bottom: 15px;
    text-align: left;
}
.chat-msg-other img{
    cursor: pointer;
}
.chat-msg-self img{
    cursor: pointer;
}
.chat-msg-self {
    background-color: #F27C19;
    float: right;
    padding: 5px;
    border-radius: 3px;
    border-top-right-radius:0; 
    margin-bottom: 15px;
    text-align: left;
}
.chat-msg-self .el-image{
  cursor: pointer;
}
.chat-msg-self .chat-msg{
    color: #fff;
}
.chat-msg-self .chat-msg .a-href{
    color: #fff;
}
.chat-dialog-other .chat-msg .a-href{
    color: #333;
}
.left_triangle {
    position: absolute;
}

.Message_name{
    color: #333333;
}
.Message_time{
    color: #BBBBBB;
    font-weight: 100;
}
.Message_type_teaching{
    background-color:#0dcaa1;
    padding: 2px 6px; 
    border-radius:3px; 
}
.Message_type_teacher{
    color: #fff;
    background-color:#41a4fd;
    padding: 2px 6px; 
    border-radius:3px; 
    font-weight: 100;
    font-size: 14px;
}
</style>

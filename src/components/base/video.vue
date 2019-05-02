<template>
    <div :class="{'video-position':true,'Zposition':isShowL == true,chan:chan,positionleft:chan==true,positionright:chan==false}"  id="videoWedget" >
        <div :class="{'video-wedget':true,'Zvideo':isShowL == true}">
          <!-- 直播视频模块 -->
          <div  class="video" id="videoCon">
            <div id="presenterVideo" class="my-video">
            </div>
          </div>
        </div>
        <div class="fix-position" v-show="!isplay">
          <img src="../../assets/img/loading-000.png">
        </div>
    </div>
</template>

<script>
export default {
  props: ["chan"],
  data () {
    return {
        position: false,
        isShowL: true,
        isplay:false,//回放是否开始
    }
  },
  mounted: function() {
    var vue = this;
    //加载完成
    this.rtc.on('on_cc_live_player_init',function(){
        // console.log('加载完成')
        vue.isplay = true//视频直接开始播放，并不是暂停状态
          
    })

    //监听当前时间变化
    // this.rtc.on('PlayTime',function(data){
      
    //   // console.log(data)
    //   var getPlayerTimeL = data.getPlayerTime;
    //   if(getPlayerTimeL>0){
    //     vue.isplay = true//视频直接开始播放，并不是暂停状态
    //   }
    // })
  },
  methods: {
    showVideo: function(Option) {
      var vue = this;
      // window.CallbackPlayer =new CallbackPlayer(Option);

      // setTimeout(function(){
      //   console.log('定时器')
      //   $("#videoCon").css({
      //     height:'100%',
      //     width:'100%'
      //   });

      //   vue.isShowL = true;
      // },4000)
        
    }
  }
}
</script>

<style>
.video-position{
    position: absolute;
    left: 0;
    top: 0;
    width: 260px;
    height: 195px;
    text-align: center;
    vertical-align: center;
    color: #fff;
    line-height: 195px;
    border-radius: 5px;
    z-index:0;
    border-top-left-radius: 6px;
    border-top-right-radius:6px;
    overflow: hidden; 
}
.video-wedget{
    height: 100%;
    width: 100%;
    background: #000;
    position: relative;
}
.video{
  /* height: 800px;
  width: 800px; */
  height: 100%;
  width: 100%;
}
.my-video {
  /* width: 260px;
  height: 195px; */
  height: 100%;
  width: 100%;
  z-index: 0;
  display: block;
}
.my-video li{
  list-style: none;
  position: relative;
  width: 100%;
  height: 100%;
}
.my-video li video{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
	}
.Zvideo{
  z-index: 1112;
    opacity: 1;
    transition: all .5s ease;
}
.Zposition{
  left: calc(100% - 260px);
}
.chan{
  position: absolute;
  right: 270px;
  left: 0;
  top: 0;
  bottom: 200px;
  z-index: 100;
  width: auto;
  height: auto;
}
.fix-position{
  position: fixed;
    right: 10px;
    top: 50px;
    width: 260px;
    height: 195px;
    background: #fff;
    z-index: 1113;
    transition: all .6s ease;
}
.fix-position img{
    transition-property: -webkit-transform;
    transition-duration: 1s;
    animation: rotate 1s linear infinite;
}
@-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
    to{-webkit-transform: rotate(360deg)}
}
@-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
    to{-moz-transform: rotate(359deg)}
}
@-o-keyframes rotate{from{-o-transform: rotate(0deg)}
    to{-o-transform: rotate(359deg)}
}
@keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
}
</style>
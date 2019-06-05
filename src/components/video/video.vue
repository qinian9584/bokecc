<template>
    <div class="video-position">
        <div class="video-wedget" :id=videodata.id>
          <!-- 直播视频模块 -->
          
        </div>
        <div></div>
        <!-- <div class="fix-position" v-show="!isplay">
          <img src="../../assets/img/loading-000.png">
        </div> -->
    </div>
</template>

<script>
export default {
  props: ["videodata"],
  data () {
    return {
        position: false,
        isShowL: true,
        isplay:false,//回放是否开始
    }
  },
  mounted: function() {
    var vue = this;
    this.videodata.stream.show(this.videodata.id)
    
  },
  methods: {
    
  },
  updated: function () {
      console.group('updated 更新完成状态===========================================================================》');
      this.videodata.stream.show(this.videodata.id)
      
      
  },
  beforeDestroy:function(){
    //  console.group(this.videodata.id,'beforeDestroy 销毁前状态===============》');
     
  },
  computed: {
    // 计算属性的
    videodataid:function(){
     const videoid = 's'+this.videodata.id;
      return videoid
    }
  },
}
</script>

<style scoped lang="scss">
.video-position{
    position: relative;
    width: 250px;
    height: 140px;
    text-align: center;
    vertical-align: center;
    color: #fff;
    line-height: 195px;
    z-index:0;
    border-top-left-radius: 6px;
    border-top-right-radius:6px;
}
.video-wedget{
    height: 100%;
    width: 100%;
    background: #000;
    position: relative;
    text-align: left;
    border-top-left-radius: 6px;
    border-top-right-radius:6px;
    overflow: hidden;
}
.fix-position{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 1113;
  transition: all .6s ease;
  border-top-left-radius: 6px;
  border-top-right-radius:6px;
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
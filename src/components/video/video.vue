<template>
    <div class="video-position" >
        <div class="video-wedget">
          <!-- 直播视频模块 -->
          
        </div>
        <!-- <div class="fix-position" v-show="!isplay">
          <img src="../../assets/img/loading-000.png">
        </div> -->
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

<style scoped lang="scss">
.video-position{
    position: relative;
    width: 280px;
    height: 160px;
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
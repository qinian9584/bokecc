<template>
  <div id="mainBorad" :class="{'main-board':true,'f-left':false,'effectFull':false}">
    <div class="canvas-draw">
      <!--画板区域-->
      <div id="draw-parent">
        <!-- 文档控制条，用户可自定义 -->
        <div class="canvas-control">
          <div class="canvas-control-el mr15">
            <div class="fullScreen" @click="effectFull"></div>
            <div class="splitLine"></div>
            <div class="add" v-show="add" @click="enlarge"></div>
            <div class="scale effect-zoom">{{Percentage}}</div>
            <div class="reduce" v-show="reduce" @click="narrow"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: ["chan"],
  data() {
    return {
      Percentage: "100%", //画板大小比例
      add: true, //放大按钮是否开启
      reduce: true //缩小按钮是否开启
    };
  },
  mounted() {
    // 监听登陆成功
    rtc.on('login_success', function (data) {
        // 登录成功
        console.log(data,'登录成功------------------');

        var canvasInitData = {
            allowDraw: true,
            id: 'draw-parent',
            pptDisplay: 0,   // 默认0，按窗口  1， 按宽度
        };

        if(data.live.status === 1){
            canvasInitData.liveId = data.live.id;
        }

        // 初始化画板
        rtc.canvasInit(canvasInitData);

        // 讲师端获取所有已上传文档
        // 获取房间内所有文档
    });
  },
  watch: {
    Percentage(val) {
      //执行滚动到底部的逻辑
      // console.log(val ,'====================================================')
      // if(val == '100%'){
      // 	this.add = true;
      // 	this.reduce =false;
      // }else if(val == '200%'){
      // 	this.add = false;
      // 	this.reduce =true;
      // }else {
      // 	this.add = true;
      // 	this.reduce =true;
      // }
    }
  },
  methods: {
    enlarge: function() {},
    narrow: function() {},
    effectFull: function() {}
  }
};
</script>

<style>
#draw-box::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  cursor: pointer;
}
#draw-box::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(204, 204, 204, 0.4);
  cursor: pointer;
}
#draw-box::-webkit-scrollbar-track {
  border-radius: 0;
  background: #3d3938;
}
#draw-box::-webkit-scrollbar-corner {
  background: #3d3938;
}
.isdrawsocrollbar #draw-box::-webkit-scrollbar {
  width: 0;
  height: 0;
  cursor: pointer;
}
.isdrawsocrollbar #draw-box::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
}
.isdrawsocrollbar #draw-box::-webkit-scrollbar-track {
  border-radius: 0;
  background: #fff;
}
.isdrawsocrollbar #draw-box::-webkit-scrollbar-corner {
  background: #fff;
}
.f-left #draw-box::-webkit-scrollbar {
  width: 0;
  height: 0;
  cursor: pointer;
}
.f-left #draw-box::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
}
.f-left #draw-box::-webkit-scrollbar-track {
  border-radius: 0;
  background: #fff;
}
.f-left #draw-box::-webkit-scrollbar-corner {
  background: #fff;
}
.main-board {
  background: #fff;
  position: absolute;
  right: 290px;
  left: 0;
  top: 0;
  bottom: 0px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  z-index: 99;
  /* overflow: hidden; */
}
.f-left {
  position: absolute;
  top: 0;
  width: 260px;
  height: 195px;
  left: calc(100% - 260px);
  z-index: 1112;
}
.isdrawsocrollbar {
  z-index: 151;
}
.canvas-draw {
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
  opacity: 1;
  transition: all 0.5s ease;
}
#draw-parent {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #ccc;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.canvas-control {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30px;
  width: 100%;
  background: #c5c5be;
}

#draw-box {
  position: absolute;
  top: 0;
  bottom: 30px;
  left: 0;
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
#draw {
  background: #fff;
  display: block;
  margin: 0 auto;
  position: relative;
  z-index: 999999;
  overflow: hidden;
}
#draw-board {
  display: block;
  margin: 0 auto;
  position: relative;
  z-index: 99999;
}
#draw iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 998;
}
.effectFull {
  z-index: 151;
}
.canvas-control-el div {
  margin-left: 10px;
  float: right;
}

/* 文档 底部控制栏 */
.mr15 {
  margin-right: 15px;
}
.canvas-control-el .add {
  background-image: url(../../assets/img/index/classicon.png);
  background-repeat: no-repeat;
  background-position: -455px -8px;
  width: 19px;
  height: 20px;
  cursor: pointer;
}
.canvas-control-el .add:hover {
  background-image: url(../../assets/img/index/classicon.png);
  background-repeat: no-repeat;
  background-position: -455px -45px;
  width: 19px;
  height: 20px;
}
.canvas-control-el .reduce {
  background-image: url(../../assets/img/index/classicon.png);
  background-repeat: no-repeat;
  background-position: -416px -8px;
  width: 19px;
  height: 20px;
  cursor: pointer;
}
.canvas-control-el .reduce:hover {
  background-image: url(../../assets/img/index/classicon.png);
  background-repeat: no-repeat;
  background-position: -416px -45px;
  width: 19px;
  height: 20px;
}
.canvas-control-el .scale {
  line-height: 30px;
  font-size: 14px;
}
.canvas-control-el .fullScreen {
  background-image: url(../../assets/img/index/classicon.png);
  background-repeat: no-repeat;
  background-position: -496px -8px;
  width: 19px;
  height: 23px;
  cursor: pointer;
}
.canvas-control-el .splitLine {
  width: 1px;
  background: #b5abab;
  height: 15px;
  margin-top: 7px;
}
.canvas-control-el div {
  margin-left: 10px;
  float: right;
}
</style>

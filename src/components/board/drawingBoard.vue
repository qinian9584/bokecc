<template>
  <div id="mainBorad" :class="{'main-board':true,'f-left':false,'effectFull':false}" v-loading="fullscreenLoading">
    <div class="canvas-draw">
      <!--画板区域-->
      <div id="draw-parent">
        <!-- 文档控制条，用户可自定义 -->
        <div class="canvas-control">
          <div class="canvas-control-el">
            <!-- 移动工具 -->
            <div class="menu-box" @click="effectFull">
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconyidonggongju"></use>
                  </svg>
              </el-button>
            </div>
            <!-- 画笔 -->
            <div class="menu-box" @click="effectFull">
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconhuabi"></use>
                  </svg>
              </el-button>
            </div>
            <!-- 多边形工具 -->
            <div class="menu-box" @click="effectFull">
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconduobianxinggongju"></use>
                  </svg>
              </el-button>
            </div>
            <!-- 橡皮擦 -->
            <div class="menu-box" @click="effectFull">
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconxiangpica"></use>
                  </svg>
              </el-button>
            </div>
            <!-- 激光笔 -->
            <div class="menu-box" @click="effectFull">
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconjiguangbi"></use>
                  </svg>
              </el-button>
            </div>
            <!-- 文本 -->
            <div class="menu-box" @click="drawChange(5)">
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconwenzigongju"></use>
                  </svg>
              </el-button>
            </div>
            <!-- 荧光笔 -->
            <div class="menu-box" @click="effectFull">
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconyingguangbi"></use>
                  </svg>
              </el-button>
            </div>
            <!-- 撤销 -->
            <div class="menu-box" @click="effectFull">
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconchexiao"></use>
                  </svg>
              </el-button>
            </div>
            <!-- 删除 -->
            <div class="menu-box" @click="effectFull">
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconshanchu"></use>
                  </svg>
              </el-button>
            </div>
          </div>
          <div class="canvas-control-el mr15">
            <!-- 全屏 --> 
            <div class="menu-box" @click="effectFull">
              <!-- 缩小 -->
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconwendangsuoxiaonor"></use>
                  </svg>
              </el-button>
            </div>
            <!-- 百分比 -->
            <div class="scale effect-zoom">{{Percentage}}</div>
            <!-- 放大 -->
            <div class="menu-box" @click="effectFull">
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconwendangfangdanor"></use>
                  </svg>
              </el-button>
            </div>
            <!-- 分界线 --> 
            <div class="splitLine"></div>
            <!-- 全屏 --> 
            <div class="menu-box" @click="effectFull">
              <el-button type="primary" size="mini">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconwendangquanping"></use>
                  </svg>
              </el-button>
            </div>
            
            
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
      fullscreenLoading: true,//loading 效果
      Percentage: "100%", //画板大小比例
      add: true, //放大按钮是否开启
      reduce: true, //缩小按钮是否开启
    };
  },
  methods: {
    loginSuccessfully:function(){
      // 登录成功
      var canvasInitData = {
          allowDraw: true,
          id: 'draw-parent',
          pptDisplay: 0,   // 默认0，按窗口  1， 按宽度
      };
      const status = this.$store.state.room.liveStatus
      if(status === 1){
          canvasInitData.liveId = status;
      }
      // 初始化画板
      rtc.canvasInit(canvasInitData);

      this.fullscreenLoading = false//清除loading
      
      // 讲师端获取所有已上传文档
      // 获取房间内所有文档
    },
    //画笔变更
    drawChange(type){
      var drawData = {
        action: 'type',
        value: {
          'type':type
        }
      };
      // 调用更改画笔接口
      rtc.drawChange(drawData);
    },
    enlarge: function() {},
    narrow: function() {},
    effectFull: function() {}
  },
  mounted() {
    let vue = this;
    // 监听登陆成功
    rtc.on('login_success', function (data) {
        
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
    },
    '$store.state.loginSuccessfully':function(){
      this.loginSuccessfully()
    }
  },
};
</script>

<style scope lang="scss">
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
  flex: 1;
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
  z-index: 1999;
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
.canvas-control-el .scale {
  line-height: 30px;
  font-size: 14px;
  color: #fff;
}
.canvas-control-el .icon{
  color: #fff;
  font-size: 20px;
  height: 20px;
}
.canvas-control-el .fullScreen {
  width: 19px;
  height: 23px;
  cursor: pointer;
}
.canvas-control-el .splitLine {
  width: 1px;
  background: #b5abab;
  height: 16px;
}
.canvas-control-el div {
  margin-left: 5px;
  float: right;
}
.canvas-control {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background:rgba(0,0,0,0.7);
  
  .canvas-control-el{
    display: flex;
    align-items: center;
  }

  .menu-box{
    .el-button{
      padding: 7px;
      background: transparent;
      border: 0;
      svg{
        height: 16px;
        width: 16px;
      }
    }
  }
}
</style>

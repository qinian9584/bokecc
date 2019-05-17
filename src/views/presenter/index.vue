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
                <use xlink:href="#icongongjuxiang"></use>
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
                <use xlink:href="#icongongjuxiang"></use>
              </svg>
              <span>花名册</span>
            </el-button>
          </div>
          
        </div>
        
        <!-- 直播倒计时 -->
        <div class="nav-center">
            <span>直播倒计时&nbsp; </span>
            <span>01：20：22</span>
        </div>

        <!-- 右侧菜单 -->
        <div class="f-right nav-right">
          <div class="menu-box cut-wheat">
            <el-button type="primary" size="mini">
              <span>切麦</span>
            </el-button>
          </div>
          <div class="menu-box setpadding">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icongongjuxiang"></use>
              </svg>
            </el-button>
          </div>
          <div class="menu-box setpadding">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icongongjuxiang"></use>
              </svg>
            </el-button>
          </div>
          <div class="menu-box setpadding">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icongongjuxiang"></use>
              </svg>
            </el-button>
          </div>
          <div class="menu-box setpadding">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icongongjuxiang"></use>
              </svg>
            </el-button>
          </div>
          <div class="menu-box begins">
            <el-button type="primary" size="mini">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icongongjuxiang"></use>
              </svg>
              <span>上课</span>
            </el-button>
          </div>
          
        </div>

      </div>
    </div>

    <!-- 主要部分 -->
    <div class="main">
      <!-- 画板 -->
			<brading-board></brading-board>

      <!-- 视频 -->
      <!--老师视频-->
			<div class="presenter-video-box">
				<video-webget ref="video"></video-webget>
			</div>
      <!--学生视频-->
			<div class="student-video-box">
				
			</div>

			

      <!-- 聊天 -->
			<slide-show ref="chat"></slide-show>
    </div>
  </div>
</template>

<script>
  import bradingBoard from '../../components/board/drawingBoard'
	import slideShow from '../../components/chat/slideShow'
	import videoWebget from '../../components/video/video'
export default {
  name: "presenter",
  components: {
    bradingBoard,//白板组件
    slideShow,//聊天组件
    videoWebget,//视频区域组件
    // dialogAlert,//上传图片 放大图片
  },
  data() {
    return {

    };
  },
  mounted() {
    //模板编译挂在之后  在这发起后端请求，拿回数据，配合路由钩子做一些事情
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import "../../assets/css/main.scss";

</style>

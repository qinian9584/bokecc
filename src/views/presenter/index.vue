<template>
  <div class="cc-container">
    <!-- 导航菜单部分 -->
    <div class="nav">
      <div class="nav-body">
        <div class="nav-left">
          <div class="menu-box">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconwendang"></use>
            </svg>
            <p>文档区</p>
          </div>
          <div class="menu-box">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconbaibanwhiteboard10"></use>
            </svg>
            <p>白板区</p>
          </div>
          <div class="menu-box">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconicontiku"></use>
            </svg>
            <p>课题库</p>
          </div>
          <div class="menu-box">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconshiti"></use>
            </svg>
            <p>试题库</p>
          </div>
          <div class="menu-box">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icongongjuxiang"></use>
            </svg>
            <p>工具箱</p>
          </div>
          <div class="menu-box">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconwj-mc"></use>
            </svg>
            <p>花名册</p>
          </div>
          
        </div>
        
        <!-- 直播倒计时 -->
        <div class="nav-center">
            <span>直播倒计时&nbsp; </span>
            <span>01：20：22</span>
        </div>

        <div class="f-right nav-right">
          <div class="menu-box change">
              <span>切麦</span>
            </div>
          <div class="menu-box">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icongongjuxiang"></use>
            </svg>
          </div>
          <div class="menu-box">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icongongjuxiang"></use>
            </svg>
          </div>
          <div class="menu-box">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icongongjuxiang"></use>
            </svg>
          </div>
          <div class="menu-box">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icongongjuxiang"></use>
            </svg>
          </div>
          <div class="menu-box">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icongongjuxiang"></use>
            </svg>
          </div>
          <div class="menu-box begins">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icongongjuxiang"></use>
            </svg>
            <span>上课</span>
          </div>
          
        </div>
      </div>


    </div>

    <!-- 主要部分 -->
    <div class="main">
      <!-- 画板 -->
			<brading-board></brading-board>

      <!-- 视频 -->
			<video-webget ref="video"></video-webget>

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
      isMobile:
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        ) != null
          ? true
          : false //是否为手机
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/main.scss";

</style>

<template>
  <div class="cc-container">	
    <div class="nav">
        <div class="nav-body">
            <div class="nav-left">
                <div class="menu-File">文档区</div>
                <div class="menu-File">文档区</div>
                <div class="menu-File">文档区</div>
                <div class="menu-File">文档区</div>
                <div class="menu-File">文档区</div>
            </div>
            <div class="f-right nav-right">					
                <div class="menu-text-line"></div>
                <div class="menu-text-load"></div>
                <div class="cloud"></div>
                <div class="set"></div>
                <div class="idle-control"></div>

            </div>
            
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'presenter',
  data() {
    return {
      isMobile:(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)!=null)?true:false, //是否为手机
    };
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/main.scss';
.cc-container{
    // background: url(../../assets/img/background-index.png) no-repeat center center;
}
</style>

<template>
  <div class="catalog">	
    <div class="left">
      <h3>{{$t("singleton.Catalog")}}</h3>
      <el-tree
        :data="data"
        default-expand-all
        :expand-on-click-node="false">
        <span class="" slot-scope="{ node,data }">
          <router-link :to="{path:data.url}" >{{ node.label }}</router-link>
        </span>
      </el-tree>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
    
    
    
  </div>
</template>

<script>
export default {
  name: 'catalog',
  data() {
    return {
      
    };
  },
  computed: {
      title: function () {
          return this.$t("login.login");
      },
      data:function(){
        let arr = [
            {
              label: this.$t("login.login"),
              url: '/login',
            },
          {
            label: this.$t("singleton.presenter"),
            url: '/presenter',
          },
          {
            label: this.$t("singleton.dataDisplay"),
            url: '/singleton',
            children: [{
              label:this.$t("singleton.stateManagement"),
              url: '/singleton/store',
            }, {
              label: this.$t("singleton.translationdata"),
              url: '/singleton/lang',
            }, {
              label: this.$t("singleton.modifyTheme"),
              url: '/singleton/theme',
            }]
          },
          {
            label: '401',
            url: '/401',
          },
          {
            label: '404',
            url: '/404',
          }
        ]
        return arr
      }
      
  },
  watch:{
    
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/mixin.scss";
h3{
  color: rgb(191, 203, 217);
  height: 50px;
  line-height: 50px;
  padding-left:10px; 
}
.left{
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 200px;
  background: rgb(48, 65, 86);
  @include bg_color(rgb(48, 65, 86))
}
.right{
  position: fixed;
  left: 200px;
  right: 0;
  height: 100%;
}
a{
  text-decoration: none;
  color: rgb(191, 203, 217);
}
.left /deep/.el-tree{
  background:transparent;
}
.left /deep/ .el-tree-node__content{
  height: 50px;
}
.left /deep/ .el-tree-node__content:hover{
  color: rgb(191, 203, 217);
  background-color:#001528;
}

.left /deep/ .el-tree-node:focus>.el-tree-node__content{
  background-color:#001528;
}
.left /deep/ .el-tree-node>.el-tree-node__content:focus{
  background-color:#001528;
}
</style>

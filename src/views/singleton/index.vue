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
      query:'',//一般页面参数；
      loginquery:'',//登录页面参数
    };
  },
  created(){
    let query = this.$route.query;
        this.query = `?userid=${query.userid}&roomid=${query.roomid}`;
        const  role= localStorage.getItem('role')||'presenter';
        this.loginquery = `?userid=${query.userid}&roomid=${query.roomid}&role=${role}`;

    console.log(this.$route)
  },
  mounted() {
    //模板编译挂在之后  在这发起后端请求，拿回数据，配合路由钩子做一些事情
    
  },
  computed: {
      title: function () {
          return this.$t("login.login");
      },
      data:function(){
        let arr = [
            {
              label: this.$t("login.login"),
              url: '/login'+this.loginquery,
            },
          {
            label: this.$t("singleton.presenter"),
            url: '/presenter'+this.query,
          },
          {
            label: this.$t("singleton.dataDisplay"),
            url: '/'+this.query,
            children: [{
              label:this.$t("singleton.stateManagement"),
              url: '/store'+this.query,
            }, {
              label: this.$t("singleton.translationdata"),
              url: '/lang'+this.query,
            }, {
              label: this.$t("singleton.modifyTheme"),
              url: '/theme'+this.query,
            }]
          },
          {
            label: '401',
            url: '/401',
          },
          {
            label: '404',
            url: '/404'+this.query,
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

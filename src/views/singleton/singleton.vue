<template>
  <div class="catalog">	
    <div class="left">
      <h3>目录</h3>
      <el-tree
        :data="data5"
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
    
    
    <p>{{this.$store.getters.isShow}}</p>
  	<p>{{this.$store.state.showFooter}}</p>
  </div>
</template>

<script>
export default {
  name: 'catalog',
  data() {
    return {
      data5: [{
        label: '数据展示',
        url: '/singleton',
        children: [{
          label: '状态管理数据',
          url: '/singleton/store',
        }, {
          label: '国际化数据',
          url: '/singleton/lang',
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3{
  color: rgb(191, 203, 217);
}
.left{
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 200px;
  background: rgb(48, 65, 86);
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

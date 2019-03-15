<template>
  <div class="demo">
  	<img src="../../assets/logo.png">
  	<p>{{this.$store.getters.isShow}}</p>
  	<p>{{$t("route")}} + {{$t("route.dashboard")}}</p>
    <p>第二页<span>333</span></p>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <router-link to="/">
	     <button class="btn btn-default">点击跳转</button>
		</router-link>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$size:50px;
p {
  font-size: $size;
  span{
    font-size: 20px;
  }
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

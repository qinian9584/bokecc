<template>
  <div class="demo">	
      <h3>获取所有的 翻译数据</h3>
     <p>{{$t("route")}} + {{$t("route.dashboard")}}</p>
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

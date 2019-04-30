<template>
  <div class="hello">
    <h3>获取所有的 状态管理数据</h3>
  	<p>{{this.$store.getters.isShow}}</p>
  	<p>{{this.$store.state.showFooter}}</p>
    <button @click="change">修改</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    change(){
      console.log(2)
      this.$store.commit('show', '我是要更新的数据');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

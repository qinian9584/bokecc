<template>
  <div class="hello">
    <h3>获取所有的 状态管理数据</h3>
  	<!-- <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="key"
        label="key"
        width="380">
      </el-table-column>
      <el-table-column
        prop="value"
        label="value">
      </el-table-column>
      
    </el-table> -->
   <!-- <button @click="chan">点击</button> -->
  </div>
</template>

<script>
export default {
  name: 'store',
  data () {
    return {
      tableData: []
    }
  },
  created() {
    this.tableData = this.$store.getters.all
  },
  methods: {
    chan(){
      console.log('tag', '')
      this.$store.state.showFooter =!this.$store.state.showFooter
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  text-align: center;
  color: rgb(31, 47, 61);
}
</style>

<template>
  <div class="hello">
    <h3>{{$t("singleton.Getall")}}{{$t("singleton.stateManagement")}}</h3>
  	<el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="key"
        label="key"
      >
      </el-table-column>
      <el-table-column
        prop="value"
        label="value">
      </el-table-column>
      
    </el-table>

    <div class="changestore">
      <el-button type="primary" @click="chan">修改state.showFooter</el-button>
      <span>{{$store.state.showFooter}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'store',
  data () {
    return {
      tableData: [],
      
    }
  },
  computed:{
    ...mapGetters([
      'all'
    ])
  },
  watch: {
    all: function(li) { //li就是改变后的值
      this.tableData = li
    }
  },
  created() {
    this.tableData = this.$store.getters.all
  },
  methods: {
    chan(){
      this.$store.state.showFooter =!this.$store.state.showFooter
      // this.$store.commit('someMutation')
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
h3{
  padding-top: 30px;
  text-align: center;
  color: rgb(31, 47, 61);
}
.changestore{
  padding: 30px 20px ;
  text-align: center;
  span{
    padding: 0 0 0 20px;
  }
}
</style>

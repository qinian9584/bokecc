<template>
  <div class="demo">	
    <h3>获取所有的 翻译数据</h3>
    <button @click="chan">点击</button>
     <!-- <div>{{$t("route")}} + {{$t("route.dashboard")}}</div> -->
     
    <!-- <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="key"
        label="Abbreviation"
        width="180">
      </el-table-column>
      <el-table-column
        prop="zh"
        label="zh">
      </el-table-column>
      <el-table-column
        prop="en"
        label="en">
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
export default {
  name: 'lang',
  data () {
    return {
      tableData: []
    }
  },
  created() {
    const lang = this.$i18n.messages.zh;
    const langen = this.$i18n.messages.en;
       
			for (let [key, value] of Object.entries(lang)) {				
				for (let [l, k] of Object.entries(value)) {				
          let en = '';
          if(l in langen[key]){
             en = langen[key][l];
          }        
          var data = {
            key:key+'.'+l,
            zh:k,
            en:en
          }

          this.tableData.push(data)
			  }
			}
  },
  methods: {
    chan(){
      console.log('tag', '')
      this.$i18n.locale = 'en'
    }
  },
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
h1, h2,h3 {
  text-align: center;
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

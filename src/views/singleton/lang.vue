<template>
  <div class="demo">	
    <h3>{{$t("singleton.Getall")}}{{$t("singleton.translationdata")}}</h3>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="key"
        label="Abbreviation"
      >
      </el-table-column>
      <el-table-column
        prop="zh"
        label="zh">
      </el-table-column>
      <el-table-column
        prop="en"
        label="en">
      </el-table-column>
    </el-table>

    <!-- <div> {{$t("route.Classroom")}}</div> -->
    <div class="changes">
      <el-button type="primary" @click="changeLanguage">切换语言</el-button>
      <span>{{this.$i18n.locale}}</span>
    </div>
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
    changeLanguage(){
      //切换中英文
      const language= localStorage.getItem('language');
      const langen = (language=='en')?'zh':'en';
      localStorage.setItem('language',langen)
      this.$i18n.locale = langen

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
  padding-top:30px ;
  height: 30px;
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
.changes{
  padding: 30px 20px ;
  text-align: center;
  span{
    padding: 0 0 0 20px;
  }
}
</style>

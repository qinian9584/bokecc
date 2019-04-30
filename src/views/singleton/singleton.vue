<template>
  <div class="box">	
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities2"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
      
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      activities2: [{
        content: '开始项目',
        timestamp: '2019-03-22 14:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持vuex',
        timestamp: '2019-03-22 14:46',
        color: '#0bbd87'
      }, {
        content: '支持axios',
        timestamp: '2019-03-22 14:46',
        size: 'large'
      }, {
        content: '支持vue-i18n',
        timestamp: '2019-03-22 14:46'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box{
  width:50%;
  margin:50px auto;
}
</style>

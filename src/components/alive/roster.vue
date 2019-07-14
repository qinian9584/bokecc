<template>
  <div class="roster-box">
    <div class="content">
      <div class="top">
        <div class="left">
          <span class="weight">{{$t("roster.roster")}}</span>
          <span>{{$store.state.room.personnelNumber}}</span>
          <span>{{$t("roster.P")}}</span>
        </div>
       
        <div class="right">
          <el-button size="mini"  @click="$store.state.roster.isShow=false">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconguanbi"></use>
            </svg>
          </el-button>
        </div>
      </div>
      <!-- 搜索区域 -->
      <div class="center">
        <div class="search">
          <div class="search-box">
            <el-input
              size="mini"
              placeholder="请输入用户名"
              suffix-icon="el-icon-search"
              v-model="search">
            </el-input>
          </div>
        </div>
        <div class="alls">
          <!-- 一键奖励 -->
          <div class="menu-box">
              <span>一键奖励</span>
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconxiayiye"></use>
              </svg>
          </div>
          <!-- 全体静音 -->
          <div class="menu-box">
              <span>全体静音</span>
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconxiayiye"></use>
              </svg>
          </div>
          <!-- 全体下麦 -->
          <div class="menu-box" @click="demo">
              <span>全体下麦</span>
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconxiayiye"></use>
              </svg>
          </div>
        </div>
      </div>
      <!-- Personnel List  人员列表 -->
      <div class="personnelList">
        <!-- 表头 -->
        <div class="tab-header">
          <ul>
            <!-- 用户名称 -->
            <li>{{$t("roster.userName")}}</li>
            <!-- 奖杯 -->
            <li>{{$t("roster.Trophy")}}</li>
            <!-- 摄像头 -->
            <li>{{$t("roster.camera")}}</li>
            <!-- 麦克风 -->
            <li>{{$t("roster.audio")}}</li>
            <!-- 连麦 -->
            <li>{{$t("roster.videoCall")}}</li>
            <!-- 授权标注 -->
            <li>{{$t("roster.allowDrawing")}}</li>
            <!-- 设为讲师 -->
            <li>{{$t("roster.setTeacher")}}</li>
            <!-- 禁言 -->
            <li>{{$t("roster.noChat")}}</li>
            <!-- 踢出 -->
            <li>{{$t("roster.shiftOut")}}</li>
          </ul>
        </div>

        <!-- 表体 -->
        <div class="tab-body">
          <transition-group>
          <ul class="ulline" v-for="(item) in personnelList" :key="item.id" v-show="item.isShow">
            <!-- 用户名称 -->
            <li>
              <!-- 用户角色 -->
              <div class="role">
                <span v-if="item.role=='talker'">学生</span>
                <span v-else>老师</span>
              </div>
              <!-- 用户名 -->
              <div class="username">{{item.name}}</div>
              <!-- 用户设备 -->
              <div class="platform">
                <span v-if="item.platform==5">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#icongongjuxiang"></use>
                  </svg>
                </span>
                <span v-else>
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#icongongjuxiang"></use>
                  </svg>
                </span>
              </div>
            </li>
            <!-- 奖杯 -->
            <li class="Trophy">
              <el-button type="primary" size="mini" class="">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icongongjuxiang"></use>
                </svg>
              </el-button>
            </li>
            <!-- 摄像头 -->
            <li class="camera">
              <!-- 默认状态  没有在麦上 -->
              
              <el-button type="primary" size="mini" class="default" v-if="item.status!=3">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#iconlaoshidakaishexiangtou"></use>
                </svg>
              </el-button>
              <!-- 在麦上 -->
              <el-button type="primary" size="mini" class="videoCall" v-else>
                <svg class="icon svg-icon on" aria-hidden="true" v-if="item.allow_video">
                  <use xlink:href="#iconlaoshidakaishexiangtou"></use>
                </svg>
                <svg class="icon svg-icon off" aria-hidden="true" v-else>
                  <use xlink:href="#iconlaoshiguanbishexiangtou"></use>
                </svg>
              </el-button>
            </li>
            <!-- 麦克风 -->
            <li class="audio">
              <!-- 默认状态  没有在麦上 -->
              <el-button type="primary" size="mini" class="default" v-if="item.status!=3">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#iconlaoshidakaimaikefeng1"></use>
                </svg>
              </el-button>
              
              <!-- 在麦上 -->
              <el-button type="primary" size="mini" class="videoCall"  v-else>
                <!-- 已开启 -->
                <svg class="icon svg-icon on" aria-hidden="true" v-if="item.allow_audio">
                  <use xlink:href="#iconlaoshidakaimaikefeng1"></use>
                </svg>

                <!--未开启 -->
                <svg class="icon svg-icon off" aria-hidden="true" v-else>
                  <use xlink:href="#iconlaoshiguanbimaikefeng"></use>
                </svg>
              </el-button>
            </li>
            <!-- 连麦 -->
            <li>
              <!-- 默认状态  没有在麦上 -->
              <el-button type="primary" size="mini" class="default" v-if="item.status!=3">
                <svg class="icon svg-icon off" aria-hidden="true">
                  <use xlink:href="#iconlianmaiguan"></use>
                </svg>
              </el-button>
              
              <!-- 在麦上 -->
              <el-button type="primary" size="mini" class="videoCall"  v-else>
                <svg class="icon svg-icon on" aria-hidden="true">
                  <use xlink:href="#iconlianmaiguan"></use>
                </svg>
              </el-button>
            </li>
            <!-- 授权标注 -->
            <li class="allowDrawing">
              <el-button type="primary" size="mini" class="default" v-if="item.allow_draw">
                <svg class="icon svg-icon on" aria-hidden="true">
                  <use xlink:href="#iconshouquanbiaozhuguan"></use>
                </svg>
              </el-button>
              
              <el-button type="primary" size="mini" class="videoCall"  v-else>
                <svg class="icon svg-icon off" aria-hidden="true">
                  <use xlink:href="#iconshouquanbiaozhuguan"></use>
                </svg>
              </el-button>
            </li>
            <!-- 设为讲师 -->
            <li class="setTeacher">
              <el-button type="primary" size="mini" class="default" v-if="item.allow_assistant">
                <svg class="icon svg-icon on" aria-hidden="true">
                  <use xlink:href="#iconsheweijiangshiguan"></use>
                </svg>
              </el-button>
              
              <el-button type="primary" size="mini" class="videoCall"  v-else>
                <svg class="icon svg-icon off" aria-hidden="true">
                  <use xlink:href="#iconsheweijiangshiguan"></use>
                </svg>
              </el-button>
            </li>
            <!-- 禁言 -->
            <li class="noChat">
              <el-button type="primary" size="mini" class="default" v-if="item.allow_chat">
                <svg class="icon svg-icon on" aria-hidden="true">
                  <use xlink:href="#iconjinyanguan1"></use>
                </svg>
              </el-button>
              
              <el-button type="primary" size="mini" class="videoCall"  v-else>
                <svg class="icon svg-icon off" aria-hidden="true">
                  <use xlink:href="#iconjinyanguan1"></use>
                </svg>
              </el-button>
            </li>
            <!-- 踢出 -->
            <li class="shiftOut">
              <el-button type="primary" size="mini" class="videoCall">
                <svg class="icon svg-icon on" aria-hidden="true">
                  <use xlink:href="#icontuichu"></use>
                </svg>
              </el-button>
            </li>
          </ul>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "roster",//花名册组件
  components: {
    
  },
  data() {
    return {
      search:'',//搜索内容
      tableData: [
        // {
        //   role:'talker',
        //   name: '王小虎',
        //   platform:'5',//5为pc端
        //   allow_video:true,
        //   allow_audio:true,
        //   status:3,//在麦上
        //   allow_draw:true,//授权标注
        //   allow_assistant:true,//设为讲师
        //   allow_chat:true,//禁言
        // },
      ]
    };
  },
  created() {
    
  },
  methods: {
    demo(){
      this.tableData[0].isShow = false;
      console.log(this.personnelList,this.$store.state.personnelList)
      this.personnelList[0].isShow = false;
      // this.set(this.tableData,0,this.tableData[0])
    }
  },
  mounted() {
    
  },
  computed:{
    //用户列表
    personnelList(){
      let data = this.$store.state.personnelList;
      let vue = this;
      let arr = [];
      const search = vue.search;
      data.forEach(function(item, index, array) {
        // 搜索框为空 或者name存在时  才显示
        if((item.length <= 0)||(item.name.includes(search))){
          item.isShow = true
        }else{
          item.isShow = false
        };
        if(item.role=="presenter"){
          arr.unshift(item)
        }else{
          arr.push(item)
        };        　　　　
      });     
      return arr;
      
    } 
  },
  watch: {
    //监听到输入框
    'search':function(val){        
      let personnelList = this.personnelList;
      personnelList.forEach(function(item, index, array) {
        //搜索框为空 或者name存在时  才显示
        if((item.length <= 0)||(item.name.includes(val))){
          item.isShow = true
        }else{
          item.isShow = false
        }         　　　　
      });
    },
  },
};
</script>

<style scoped  lang="scss">
::-webkit-scrollbar-track-piece {
  width: 0px;
  background-color: #fff;
}

::-webkit-scrollbar {
  width: 0px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  height: 0px;
  background: #fff;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background: #fff;
  cursor: pointer;
}
  .roster-box{
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    z-index: 11;

    .content{
      display: flex;
      flex-direction: column;
      width: 70%;
      height: 60%;
      min-width: 680px;
      min-height: 490px;
      background: #fff;
      box-shadow:0px 0px 10px 0px rgba(56,64,75,0.3);
      border-radius:2px;
      border:1px solid rgba(221,221,221,1);

      .top{
        height: 40px;
        line-height: 40px;
        background:rgba(248,248,249,1);
        border-radius:2px 2px 0px 0px;

        .left{
          float: left;
          .weight{
            padding-left:20px;
            font-weight: 600; 
          }
        }

        .right{
          height: 100%;
          float: right;
          margin-right: 10px;

          .el-button{
            height: 20px;
            padding: 0;
            border: 0;
            
            .icon{
              height: 100%;
              font-size: 16px;
            }
          }
        }
      }

      .center{
        height: 60px;
        display: flex;
        .search{
          display: flex;
          flex: 1;
          padding: 0 20px;
          align-items: center;
          .search-box{
            height: 28px;
            width: 80%;
            .el-input__innepx{
              height: 24px;
              line-height: 24px
            }
          }
        }
        .alls{
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: flex-end;
          .menu-box{
            display: inline-block;
            height: 16px;
            line-height: 16px;
            padding: 5px;
            margin-right:10px;
            cursor: pointer; 
            
            .icon{
              height: 100%;
              font-size: 12px;
              vertical-align: -3px;
            }
          }
          .menu-box:hover{
            color: #999;
          }
        }
      }

      .personnelList{
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
        .tab-header{
          height: 40px;
          >ul{
            display: flex;
            height: 100%;
            background:rgba(249,249,249,1);
            :first-child{
              width: 200px;
              flex: none;
              text-align: left;
              padding: 0 0 0 10px;
            }
            li{
              flex: 1;
              line-height: 40px;
              list-style: none;
              text-align: center;
            }
          }
        }
        // 表体
        .tab-body{
          flex: 1;
          overflow-y:scroll;  
          .ulline{
            display: flex; 
            height: 40px;
            width: 100%;
            overflow: hidden;
            >li:first-child{
              width: 200px;
              flex: none;
              justify-content: left;
              padding: 0 0 0 10px;

              .icon{
                font-size: 12px;
                height: 16px;
              }
            }
            li{
              display: flex;
              flex: 1;
              line-height: 40px;
              list-style: none;
              align-items: center;
              justify-content: center;
              overflow:hidden; 
              
              .el-button{
                background: transparent;
                padding: 0 5px;
                border-color:transparent; 
              }
              .icon{
                font-size: 16px;
                color: #999;
                height: 20px;
              }

              .role{
                height: 16px;
                width: 30px;
                margin-right:5px; 
                text-align: center;
                background:rgb(210, 229, 248);
                color: #2A93FD;
                border-radius: 2px;
                >span{
                  font-size: 12px;
                  display: block;
                  line-height: 16px;
                }
              }
              //用户名
              .username{
                overflow: hidden;
              }

              //用户设备
              .platform{
                margin-left:5px; 
                width: 14px;
              }
              
            }
          }
          .ulline:hover{
            background: #f9f9f9;
          }
        }
      }
    }
  }
  .roster-box .content .personnelList .tab-body > ul li .el-button.videoCall .icon.on{
    color: #3DB875;
  }
  .roster-box .content .personnelList .tab-body > ul li .el-button.videoCall .icon.off{
    color: #FF5C70;
  }
  
  .roster-box .content .personnelList .tab-body > ul .allowDrawing .el-button.default .icon.on{
    color: #3DB875;
  }
  .roster-box .content .personnelList .tab-body > ul .allowDrawing .el-button.videoCall .icon.off{
    color: #999;
  }
  .roster-box .content .personnelList .tab-body > ul .setTeacher .el-button.default .icon.on{
    color: #3DB875;
  }
  .roster-box .content .personnelList .tab-body > ul .setTeacher .el-button.videoCall .icon.off{
    color: #999;
  }
  .roster-box .content .personnelList .tab-body > ul .noChat .el-button.default .icon.on{
    color: #3DB875;
  }
  .roster-box .content .personnelList .tab-body > ul .noChat .el-button.videoCall .icon.off{
    color: #999;
  }
  /*v-enter 是进入之前，元素的起始状态*/
  /*v-leave-to 离开之后动画的终止状态*/
  .v-enter,.v-leave-to{
      opacity:  0;/*透明度*/
  }
    /*入场(离场)动画的时间段   */
  .v-enter-active,.v-leave-active{
      transition: all 0.8s ease;

  }
  .my-enter,.my-leave-to{
      opacity:  0;/*透明度*/
  }
  .my-enter-active,.my-leave-active{
      transition: all 0.8s ease;

  }
  
</style>

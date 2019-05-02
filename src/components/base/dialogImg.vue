<template>
  <div class="dialog" @mouseup="upenlargeImg"  @mousemove="moveImg($event)">
    <div class="dia-fix">
      <div v-if="file.upData == true" class="dia-con" id="diaCon">
        <h3 @click="sne">图片预览</h3>
        <img class="img-fix-close" src='../../assets/img/dialog/x.png' @click="CloseLog"/>
        <div class="img-cont">
          <div>
            <img class="" v-bind:src="file.imgsrc"/>
          </div>
        </div>
        <div class="img-buttom">
          <button class="cancel"  @click="CloseLog">取消</button>
          <button class="send" @click.stop="uploadImg">发送</button>
        </div>
      </div>
      <div v-if="file.upData == false" class="dialogenlarge">
        <img class="dialogenlarge-close" src='../../assets/img/dialog/x.png' @click="CloseLog"/>
        <div :class="{'dialogenlarge-con':true,onenlarge:flag}"  ondragstart="return false" >
          <img v-bind:src="file.imgsrc" id="enlargeImg" alt="" @mousedown="enlargeImg($event)"/>
        </div>
       </div> 
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag:false,//是否为按下状态
      coordinate:[],//按下坐标
      coordinateMove:[]//移动坐标
    }
  },
  props: [
    'file'
  ],
  methods: {
    CloseLog: function() {
      this.$emit('CloseLog');
    },
    uploadImg: function() {
      let file = this.file;
      let filename = this.file.name;

      this.chat_img_global = {
        g_object_name_type: 'random_name',
        g_object_name: '',
        g_oos_params: '',
        expire: '',
        g_dirname: '/'
      };				

      if (file && filename) {
        this.upload_oss(file, filename);
      }
      this.CloseLog();//关闭弹框
    },
    upload_oss: function(file, filename) {			
      var vue =this;
      var start = function() {
        $.ajax({
          type: "get",
          data: {
            'userid': vue.$route.query.userid,
            'roomid': vue.$route.query.roomid,
            'type': 'chatimg'
          },
          url: "https://ccapi.csslcloud.net/api/oss/token",
          success: function(data) {
            vue.chat_img_global.g_oos_params = data;
            vue.chat_img_global.expire = vue.chat_img_global.g_oos_params.expire;
            vue.chat_img_global.g_dirname = vue.chat_img_global.g_oos_params.dir + '/';

            var parms = vue.chat_set_upload_param(filename);

            vue.OssUpload(parms, file, vue.send_img);
            
          },
          error: function() {
            console.log('请求后台oss api失败');
          }
        });
      };

      // var now = timestamp = Date.parse(new Date()) / 1000;
      // //可以判断当前expire是否超过了当前时间，如果超过了当前时间，就重新取一下，3s 做为缓冲
      if (!vue.chat_img_global.expire || vue.chat_img_global.expire < now + 3) {
        start();
        return;
      }

      var parms = vue.chat_set_upload_param(filename);
      vue.OssUpload(parms, file, vue.send_img);

		},
    chat_set_upload_param: function (filename, ret) {
      var vue = this;
      var chat_img_global = vue.chat_img_global;
      chat_img_global.g_object_name = chat_img_global.g_dirname;

      if (filename != '') {
        var suffix = vue.chat_get_suffix(filename);
        vue.chat_calculate_object_name(filename);
      }

      var new_multipart_params = {
        'key': chat_img_global.g_object_name,
        'host': chat_img_global.g_oos_params.host,
        // 'policy': Base64.encode(g_oos_params.policy),
        'policy': chat_img_global.g_oos_params.policy,
        'OSSAccessKeyId': chat_img_global.g_oos_params.accessid,
        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
        'signature': chat_img_global.g_oos_params.signature,
        'expire': chat_img_global.g_oos_params.expire
      };

      return new_multipart_params;
    },
    chat_calculate_object_name: function(filename) {
      // 随机文件名
      var vue = this;
      var chat_img_global = vue.chat_img_global;
      if (chat_img_global.g_object_name_type == 'local_name') {
        chat_img_global.g_object_name += "${filename}"
      } else if (chat_img_global.g_object_name_type == 'random_name') {
        var suffix = vue.chat_get_suffix(filename)
        chat_img_global.g_object_name = chat_img_global.g_dirname + vue.chat_random_string(10) + suffix
      }
      return ''
    },
    chat_random_string: function (len) {　　
      len = len || 32;　　
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　　
      var maxPos = chars.length;　　
      var pwd = '';　　
      for (i = 0; i < len; i++) {　　
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    chat_get_suffix: function(filename) {
      var pos = filename.lastIndexOf('.')
      var suffix = ''
      if (pos != -1) {
        suffix = filename.substring(pos)
      }
      return suffix;
    },
    OssUpload(param, file, callBack) {
      var signature = param.signature;
      var fileFullName = param.host + "/" + param.key;
      var request = new FormData();
      request.append('OSSAccessKeyId', param.OSSAccessKeyId);
      request.append('policy', param.policy);
      request.append('signature', param.signature);
      request.append('key', param.key);
      request.append('success_action_status', '200');
      for (var i in param.metaDatas) {
        request.append(i, param.metaDatas[i]);
      }
      request.append('file', file);
      request.append('submit', "Upload to OSS");

      $.ajax({
        url: param.host,
        data: request,
        processData: false,
        cache: false,
        async: true,
        contentType: false,
        //关键是要设置contentType 为false，不然发出的请求头 没有boundary
        //该参数是让jQuery去判断contentType
        type: "POST",
        success: function(data, status, request) {
          if (status === "success") {
            callBack(fileFullName);
          } else {
            console.log('图片上传oss失败');
          }
        }
      });

    },
    send_img: function(data) {
      var msg = {
        'type': 'img',
        'content': data
      };
      console.log('!!!!!!!!上传文件路径' + data);
      this.rtc.sendImg(JSON.stringify(msg));
    },
    sne: function(data) {
      var msg = {
        'type': 'img',
        'content': 'data'
      };
      console.log('!!!!!!!!上传文件路径' + data);
      this.rtc.sendImg(JSON.stringify(msg));
    },
    enlargeImg: function(e){
      //按下鼠标，开启放大放大缩小图片事件
      this.flag = true;
       this.coordinate =[e.screenX,e.screenY]
      
    },
    moveImg: function(e){
        if(this.flag == false){
          return
        };
        let DomImg = document.getElementById('enlargeImg');
        this.coordinateMove =[e.screenX,e.screenY]
        let coordinateSQ = Math.ceil(Math.sqrt(this.coordinate[0]*this.coordinate[0]+this.coordinate[1]*this.coordinate[1]));
        let coordinateMoveSQ = Math.ceil(Math.sqrt(this.coordinateMove[0]*this.coordinateMove[0]+this.coordinateMove[1]*this.coordinateMove[1]));
        let siz = (coordinateMoveSQ-coordinateSQ)*0.1;
        
        if(siz<=0){
          if( DomImg.width<=120||DomImg.height<=80){return}
        }
        DomImg.width +=  siz;
    },
    upenlargeImg() {
      //鼠标抬起，移动放大图片失效
      this.flag = false;
    }
  }
}
</script>

<style scoped>
.dialog{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color:rgba(0,0,0,0.5);
  z-index: 9999999;
}
.dia-fix{
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dia-con{
  width: 70%;
  height: 80%;
  background: #fff;
  border-radius:10px; 
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.dia-con h3{
  width: 100%;
  height: 80px;
  line-height: 60px;
  font-size: 16px;
  text-align: center;
  font-weight: 100;
}
.img-fix-close{
  position: absolute;
  right: 15px;
  top: 15px;
  width: 28px;
  height: 28px;
}
.img-fix-close:hover{
  cursor:pointer;
  opacity: 0.8;
}
.img-cont{
  flex: 1;
  width: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
}
.img-cont>div{
  flex: 1;
}
.img-cont div img{
  top:0px;
  bottom:0px;
  left:0px;
  right:0;
  margin:auto;
  position: absolute;
  max-height: 100%;
  max-width: 100%;
  
}
.img-buttom{
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-buttom button{
  height: 33px;
  width: 88px;
  line-height: 30px;
  border: 0;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  margin:  0 10px;
  outline: none;
}
.img-buttom button:hover{
  cursor: pointer;
  opacity: 0.8;
}
.img-buttom .cancel{
  background: #B5B5B5;
}
.img-buttom .send{
  background: #F38528;
}
.dialogenlarge{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialogenlarge>img{
  width: 40px;
  height: 40px;
  position: absolute;
  top: calc(10% - 30px);
  right:calc(10% - 30px);
  display: block;
  background: #fff;
  border-radius:20px; 
  cursor: pointer;
  z-index: 100;
};
.dialogenlarge>img:hover{
  cursor: pointer;
  opacity: 0.1;
}
.dialogenlarge .dialogenlarge-con{
  width: 80%;
  height: 80%;
  background: #fff;
  position: relative;
  border-radius:10px; 
}
.dialogenlarge .dialogenlarge-con img{
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0;
  margin: auto;
  position: absolute;
  max-height: 100%;
  max-width: 100%;
}
.onenlarge{
  cursor: se-resize;
}
</style>
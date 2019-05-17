<template>
	<div class="login">
		<div class="box">
		    <!--左边介绍模块-->
			<div class="introduce-box">
				<div class="introduce-logol">
					<img src="../assets/img/login/classroom.png">
				</div>
				<p class="course-name">{{title}}</p>
				<div class="course-content">
					<p></p>
					<p v-html="desc"><br></p>
					<p></p>
				</div>
			</div>
			<!--右边登录模块-->
			<div class="login-box  login-show">				
				<h3 data-text="云课堂" class="data-text">云课堂</h3>
				<div class="middle">
					<div class="login-tip" v-show="loginPss">{{loginPssData}}</div>
					<p class="pname">
						<i class="material-icons"><img src="../assets/img/login/user-name.svg"></i>
						<input type="text"   class="data-place" name="username" maxlength="20" id="username" placeholder="请输入昵称"  v-model="username">
					</p>
					<p class="ppass">
						<i class="material-icons"><img src="../assets/img/login/password.svg"></i>
						<input type="password"   class="data-place" id="password" placeholder="请输入密码"  v-model="password">
					</p>
					
					<button data-bg="bg" class="data-bg" @click="logoin"></button>
					<div class="lg" v-show="false">
					<span class="switch_lg data-text" data-text="切换">English</span>
						<i class=""><img src="../assets/img/login/right.svg"></i>
					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<script>	
	import loginapi from '@/api/login'
	import {getCookie,setCookie} from '@/assets/js/utils'
	export default {
		name: 'login',
		data() {
			return {
				username: '我是周杰伦',
				password: '123',
				title:'',
				desc:'',
				loginPss:false,//密码错误提示框
				loginPssData:'用户名不能为空',
				role:{
					// 登录角色 0: 教师 ,1:互动者,  2:旁听者   教师角色一个房间只能有一人登陆，其他角色不限制
					"presenter":0,					
				}
			}
		},
		beforeCreate:function() {
			// if(this.rtc){
			// 	window.location.reload()
			// }
		},
		created: function(){	
						
		},
		mounted: function() {									
			
		},
		methods:  {
			logoin: function () {
				let _this =this;
				let data = this.$route.query;				
				const name = this.username;
				const password= this.password;

				
				
				if(name == ''){
					_this.showError('账户不能为空')
					return;
				}

				
				for(var i=0;i<=name.length;i++){
					var leg=name.charCodeAt(i);				
					if(leg==32){
						_this.showError ("用户名不能有空格");
						return;
					}
				}

				data.name = name;
				data.password = password; 
				data.client = 0;//客户端
				const role = data.role;
				
				data.role = this.role[role];//角色
						
				var s=loginapi.loginByToken(data).then(function (response) {
					console.log(response.data)					
					const res = response.data;
					if(res.result == 'OK'){
						const token = 'token_'+role;						
						setCookie(token, res.data.token, 1);
						_this.$router.push({
							path: `/${role}`,
							name: ro,
							query: {
														
							},
						});
					}else{
						
					}
					
				})
				.catch(function (error) {
					console.log(error)
				})
								
				
				// $.ajax({
				// 	url: "https://ccapi.csslcloud.net/api/v1/serve/room/token/create",
				// 	type: "GET",
				// 	dataType: "json",
				// 	data: {
				// 		userid: userid,
				// 		roomid: roomid,
				// 		name: name,
				// 		password: password,
				// 		role: 2,
				// 		client: "0" //登录客户端类型：0: 浏览器， 1: 移动端 （必填）
				// 	},
				// 	success: function(data) {
				// 		console.log(data);
				// 		if(data.result === 'OK') {
				// 			var token = data.data.token;
				// 			setCookie('audience', token, 1);
				// 			_this.$router.push({
				// 				path: '/check',
				// 				name: 'checkPage',
				// 				query: {
				// 					roomid : roomid,
				// 					userid: userid						
				// 				},
				// 			});

				// 		} else {
				// 			_this.showError('密码错误')
				// 		}
				// 	}
				// });
			},
			showError(errText){
				this.loginPssData = errText;
				this.loginPss = true;
				setTimeout(()=>{this.loginPss = false;},2000)
				
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
	height: 100%;
	width: 100%;
	position: relative;
}
.box {
    width: 700px;
    height: 360px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -180px 0 0 -350px;
}
.box .introduce-box {
    width: 336px;
    height: 360px;
    float: left;
    /* background: #fefdfb; */
    text-align: center;
    /* border: 1px solid #D3D5D7; */
    border-radius: 3px;
    color: #fff;
    padding: 80px 20px 0 20px;
    background: url(../assets/img/login/logol_background.png) 0 0;
	background-size: 100% 100%;
	box-sizing: border-box;
}
.box .introduce-box .introduce-logol {
    width: 70px;
    height: 70px;
    margin: 0 auto;
    margin-bottom: 30px;
}
.box .introduce-box .course-content {
    text-align: center;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    word-break: break-all;
    overflow: hidden;
    max-height: 120px;
    position: relative;
}
.box .introduce-box .introduce-logol {
    width: 70px;
    height: 70px;
    margin: 0 auto;
    margin-bottom: 30px;
}
.box .introduce-box .course-name {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    line-height: 30px;
    /* margin-bottom: 20px; */
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.box .introduce-box .introduce-logol img {
    width: 100%;
    height: 100%;
}
.login-box {
    float: right;
    width: 336px;
    height: 360px;
    position: relative;
    background: #fefdfb;
    text-align: center;
    border: 1px solid #D3D5D7;
    border-radius: 3px;
    color: #333;
}
.login-box h3 {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #EBEAE8;
    margin: 0 20px;
    font-size: 16px;
}
.login-box .middle p {
    position: relative;
	margin-top: 30px;
	height: 45px;
}
.login-box .middle p i img{
	width: 16px;
}
.login-box .middle .ppass {
    margin-top: 20px;
}
.login-box .middle input {
    width: 235px;
    height: 45px;
    border-radius: 23px;
    border: 1px solid rgba(0,0,0,0.1);
	font-size: 14px;
	padding: 0 0 0 30px;
}
.login-box .middle input:focus{
	outline: none;
}
.login-box .middle button {
    width: 230px;
    height: 50px;
    margin: 0 auto;
    display: block;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: 0 solid white;
    background: url(../assets/img/login/but1.png) no-repeat;
    background-size: contain;
    outline: none;
    margin-top: 30px;
}
.login-box .middle p i {
    position: absolute;
    left: 45px;
    top: 16px;
    color: rgba(0,0,0,0.3);
    font-size: 16px;
}
.login-box .middle .lg{
	font-size:14px; 
	margin-top:30px; 
	text-align: center;
	line-height: 16px;
}
.login-box .middle .lg span{
	display: inline;
	line-height: 16px;
	position: relative;
	top: -4px;
	color: #333;
}
.login-box .middle .lg i{
	display: inline;
	position: inherit;
}
.login-box .middle .lg img{
	width: 18px;
	height: 18px;
}
.login-tip {
    width: 100%;
    height: 36px;
    line-height: 36px;
    border: 1px solid #ee7d09;
    background: #ee940e;
    color: #fff;
    position: absolute;
    z-index: 9;
	top: 42px;
	font-size: 12px;
}
</style>
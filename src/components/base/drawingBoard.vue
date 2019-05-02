<template>
   <div id="mainBorad" :class="{'main-left':true,'f-left':chan,'effectFull':!effectFulldata}">
		<div class="canvas-draw">
			<!--画板区域-->
			<div id="draw-parent" :class="{isdrawsocrollbar:bordID == 'WhiteBorad---'}">
					<!-- 文档控制条，用户可自定义 -->


				<div class="canvas-control">
					<div class="canvas-control-el mr15">
						<div class="fullScreen" @click="effectFull"></div>
						<div class="splitLine"></div>
						<div class="add" v-show="add"  @click="enlarge"></div>
						<div class="scale effect-zoom">{{Percentage}}</div>
						<div class="reduce" v-show="reduce" @click="narrow"></div>
					</div>
				</div>				
			</div>
		</div>
		
	</div> 
</template>

<script>
export default {
	props: ["chan"],
  	data () {
		return {
				Percentage: '100%',//画板大小比例
				add:true,//放大按钮是否开启
				reduce:true,//缩小按钮是否开启
				nowIndex: 0,
				effectFulldata: true,
				bordID: 'WhiteBorad',
				oldTime:-1,//存储播放时间点
				docBeforeList:[],//当前时间，之前的文档数据
				animationBefore:[],//当前时间，之前的动画数据
		}
	},
	watch:{
		Percentage(val){
			//执行滚动到底部的逻辑
			// console.log(val ,'====================================================')
			// if(val == '100%'){
			// 	this.add = true;
			// 	this.reduce =false;
			// }else if(val == '200%'){
			// 	this.add = false;
			// 	this.reduce =true;
			// }else {
			// 	this.add = true;
			// 	this.reduce =true;
			// }
		},
	},
  methods: {
		CanvasData (Canvasdatalist,Canvasdoclist,AnimationList) {
			let vue = this;
			vue.Canvasdatalist = Canvasdatalist;//聊天数据；
			vue.Canvasdoclist = Canvasdoclist;//ppt背景数据
			vue.animationList = AnimationList;//动画数据
			// console.log(AnimationList,'动画数据')
			// const joinData = data;

			var canvasInitData = {
						allowDraw: false,
						id: 'draw-parent',
						liveid:'03BE19B0548DA691'
					};

			// if(data.live.status === 1){
			// 	canvasInitData.liveId = data.live.id;
			// }
			// 初始化画板
			// vue.rtc.canvasInit(canvasInitData);

			this.rtc.on('flipMessage', function(data){
			
				if(data.action === 'changeDoc'){
					
				}else if(data.action === 'flip'){
					const bordID = data.data.id;
					vue.bordID = bordID ; 
					
				}else if(data.action === 'scale'){								
						const Percentage = data.data.percent * 100 +'%';//修改画板百分比
						vue.Percentage = Percentage;								
				}   
			});
		},
		showBackCanvas:function(Nowtime,change){			
			console.log(this.oldTime,Nowtime,'时间点变化')
			
			var datalist = this.Canvasdatalist;//画笔数据
			var Canvasdoclist = this.Canvasdoclist;//ppt数据
			var animationList = this.animationList;//动画数据
			
			CallbackPlayer.funGetPlayerTime()//重新渲染画板

			return;


			if(change){
					// ppt数据
					for ( var i in Canvasdoclist) {
						if(Canvasdoclist[i].time <= Nowtime){	
							this.docBeforeList.push(Canvasdoclist[i]);
							console.log(Canvasdoclist[i])					
						}
					}
					var docBeforeTerm = this.docBeforeList.pop();
					console.log(docBeforeTerm,Canvasdoclist)
					var k = docBeforeTerm.docId + '_' + docBeforeTerm.pageNum;
					
					if(k != DP.currentDocKey){											
						DP.flip(docBeforeTerm);
					}					

					// setTimeout(()=>{
						//动画数据 animationList
						for ( var i in animationList) {
							if(animationList[i].time <= Nowtime){		
								// console.log(DP.currentDocKey, animationList[i],'动画数据')
								this.animationBefore.push(animationList[i]);															
								
							}
						}

						let animationBeforeTerm = this.animationBefore.pop();
						if(this.animationBefore.length && docBeforeTerm.time < animationBeforeTerm.time){//最后一次切换文档的事件，要小于当前动画文档的时间
							DP.do_animation(animationBeforeTerm);
						}
						

						DP.clearRect()
						// 画板区画笔
						for ( var i in datalist) {
							if(datalist[i].time <= Nowtime){											
								DP.draw(datalist[i].data);
							}
						}
					// },60)	
			}else{
			
				if(Nowtime == this.oldTime){//时间无变化		
					return;
				}else if(Nowtime - this.oldTime == 1){//正常按秒循序播放
					
					// ppt数据
					for ( var i in Canvasdoclist) {
						if(Canvasdoclist[i].time == Nowtime){		
							console.log(DP.currentDocKey, Canvasdoclist[i],'ppt翻页')									
							DP.flip(Canvasdoclist[i]);
						}
					}		
					//动画数据 animationList
					for ( var i in animationList) {
						if(animationList[i].time == Nowtime){		
							// console.log(DP.currentDocKey, Canvasdoclist[i],'ppt翻页')									
							DP.do_animation(animationList[i]);
						}
					}
					
					
					DP.clearRect()
					// 画板区画笔
					for ( var i in datalist) {
						if(datalist[i].time <= Nowtime){											
							DP.draw(datalist[i].data);
						}
					}
					

				}else{//打点播放 或者 拖动时间轴播放
					// ppt数据
					for ( var i in Canvasdoclist) {
						if(Canvasdoclist[i].time <= Nowtime){	
							this.docBeforeList.push(Canvasdoclist[i]);					
						}
					}
					let docBeforeTerm = this.docBeforeList.pop();
					var k = docBeforeTerm.docId + '_' + docBeforeTerm.pageNum;
					
					if(k != DP.currentDocKey){											
						DP.flip(docBeforeTerm);
					}					

					// setTimeout(()=>{
						//动画数据 animationList
						for ( var i in animationList) {
							if(animationList[i].time <= Nowtime){		
								// console.log(DP.currentDocKey, animationList[i],'动画数据')
								this.animationBefore.push(animationList[i]);															
								
							}
						}

						let animationBeforeTerm = this.animationBefore.pop();
						if(this.animationBefore.length && docBeforeTerm.time < animationBeforeTerm.time){//最后一次切换文档的事件，要小于当前动画文档的时间
							DP.do_animation(animationBeforeTerm);
						}
						

						DP.clearRect()
						// 画板区画笔
						for ( var i in datalist) {
							if(datalist[i].time <= Nowtime){											
								DP.draw(datalist[i].data);
							}
						}
					// },60)														
				}
			}
			

			
			
			this.oldTime = Nowtime;//存储为上一个时间
			
		},
		enlarge:function(){			
			var docData = {
					action: 'enlarge'
			};
			this.rtc.docChange(docData);
			this.showBackCanvas(this.oldTime,'change')//重新渲染画板
		},
		narrow: function() {
			var docData = {
							action: 'narrow'
					};
			this.rtc.docChange(docData);
			this.showBackCanvas(this.oldTime,'change')//重新渲染画板
		},
		effectFull: function() {
			if(this.effectFulldata){
				var docData = {
							action: 'full'
						};
				this.rtc.docChange(docData);
			}
			else{
				var docData = {
						action: 'exitFull'
					};
				this.rtc.docChange(docData);
			}
			this.effectFulldata =!this.effectFulldata;
			console.log(this.oldTime)
			this.showBackCanvas(this.oldTime,'change')//重新渲染画板
		}
 	}
}
</script>

<style>
 #draw-box::-webkit-scrollbar{
  width: 10px;
  height:10px;
  cursor: pointer;
}
 #draw-box::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background: rgba(204, 204, 204, 0.40);
  cursor: pointer;
}
 #draw-box::-webkit-scrollbar-track{
  border-radius: 0;
  background: #3D3938;
}
 #draw-box::-webkit-scrollbar-corner{
  background: #3D3938;
}
.isdrawsocrollbar #draw-box::-webkit-scrollbar{
  width: 0;
  height:0;
  cursor: pointer;
}
.isdrawsocrollbar #draw-box::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
}
.isdrawsocrollbar #draw-box::-webkit-scrollbar-track{
  border-radius: 0;
  background: #fff;
}
.isdrawsocrollbar #draw-box::-webkit-scrollbar-corner{
  background: #fff;
}
.f-left #draw-box::-webkit-scrollbar{
  width: 0;
  height:0;
  cursor: pointer;
}
.f-left #draw-box::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
}
.f-left #draw-box::-webkit-scrollbar-track{
  border-radius: 0;
  background: #fff;
}
.f-left #draw-box::-webkit-scrollbar-corner{
  background: #fff
}
.main-left{
	background: #fff;
	position: absolute;
	right: 270px;
	left:0;
	top: 0;
	bottom: 200px;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
	z-index: 99;
	/* overflow: hidden; */
}
.f-left{
	position: absolute;
    top: 0;
    width: 260px;
	height: 195px;
	left: calc(100% - 260px);
	z-index: 1112;
}
.isdrawsocrollbar{
	z-index: 151;
}
.canvas-draw{
	display: block;
	position: relative;
	height: 100%;
	width: 100%;
	opacity: 1;
	transition: all .5s ease;
}
#draw-parent{
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: #ccc;
	border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
.canvas-control{
	position: absolute;
	bottom: 0;
	left: 0;
	height: 30px;
	width: 100%;
	background: #c5c5be;  
}

#draw-box{
	position: absolute;
	top: 0;
	bottom: 30px;
	left: 0;
	width: 100%;
	overflow:auto;
	box-sizing: border-box;
	border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
#draw {
    background: #fff;
    display: block;
    margin: 0 auto;
    position: relative;
    z-index: 999999;
    overflow: hidden;
}
#draw-board {
    display: block;
    margin: 0 auto;
    position: relative;
    z-index: 99999;
}
#draw iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
}
.effectFull{
	z-index: 151;
}
</style>

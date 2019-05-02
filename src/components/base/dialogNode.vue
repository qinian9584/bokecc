<template>
	<div class="out-box-2" id="choice-net">
		<div class="inner">
			<h3>线路切换<i class="fa icon-guanbipsd"></i></h3>
			<div class="content" style="display: block;">
				<p class="title"><span>线路</span><span>操作</span></p>
				<div class="point">
					<p data-value="DNYX" data-abroad="1"><span class="road">新加坡</span><span class="done"><em>切换</em></span></p>
				</div>
			</div>
		</div>
		<div class="mask"></div>
	</div>
</template>

<script>
	export default {		
		name: 'dialogNode',
		data() {
			return {
				
				
			}
		},
		created: function(){	
			
		},
		mounted: function() {
			
		},
		methods:  {
			
		}
	}
</script

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.out-box-2{
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
    z-index: 99999999;
    width: 100%;
    height: 100%;
    color: #333;
}
.mask{
	background: #000;
    filter: alpha(opacity=40);
    opacity: 0.4;
    width: 100%;
    height: 100%

}
.inner{
	width: 350px;
    height: 350px;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-left: -175px;
    margin-top: -175px;
	position: absolute;
	background: #fff;
	z-index: 1;
	border-radius:5px;
	text-align: center; 
	color: rgba(0,0,0,0.6);
}
.inner h3 {
    margin-bottom: 10px;
	font-weight: bold;
	text-align: center;
	margin: 10px auto 12px;
	color: #000;
}
.inner .content {
    width: 300px;
    margin: 0 auto;
    display: none;
}
.inner .content p {
    height: 30px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    line-height: 30px;
    padding-left: 10px;
}
 .inner .content p span {
    display: inline-block;
}
 .inner .content p span:nth-child(1) {
    width: 100px;
    text-align: left;
    font-size: 13px;
}
.inner .content p span:nth-child(2) {
    width: 90px;
    margin-left: 90px;
    font-size: 13px;
}
.inner .content > div p span em {
    display: inline-block;
    width: 50px;
    height: 20px;
    background: #F27C1A;
    line-height: 20px;
    color: #fff;
    border-radius: 3px;
    font-size: 12px;
	cursor: pointer;
	font-weight: normal;
    font-style: normal;
}
</style>
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = { //要设置的全局访问的state对象	
	loginSuccessfully:false,//是否登录成功
	//房间信息
	room: {
		role: null,
		userid: null,
		roomid: null,
		liveStatus: 2, //0:直播未开始；1：直播进行中；2：正在开启直播中	
		liveStartTime: 0,//直播开始时间
	},
	//人员列表
	personnelList:[]

};
const getters = { //实时监听state值的变化(最新状态)
	//获取到所有的  状态管理数据，在 /store 页面使用
	all(state) {
		let statedata = state;
		let arr = [];
		let clone = function (statedata, parkey) {
			for (let [key, value] of Object.entries(statedata)) {

				if ((typeof value == 'object') && (value != null)) {
					clone(value, key)
				} else {
					if (parkey) {
						var keys = parkey + '.' + key;
					} else {
						var keys = key;
					}
					arr.push({
						key: keys,
						value: JSON.stringify(value)
					})
				}
			}
		}
		clone(statedata)
		return arr
	},


};
const mutations = {//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
	//修改是否登录成功
	loginSuccessfully(state,n){
		state.loginSuccessfully = n
	},
	//修改直播状态
	liveStatus(state, n) {
		state.room.liveStatus = n
	},
	//修改直播时间
	startTime(state, n) {
		state.room.liveStartTime = n
	},
	
	// 当有人员上下麦或人员进出房间时会收到该事件
	online_users(state,data){
		console.log('------------------------------------------------------------------------')
		console.log(data);
		state.personnelList = data;
	},
	//单独个人配置项监听 
	setpersonnelList(data){
		console.log('------------------------------------------------------------------------')
		console.log(data);
		
	}

};
const actions = {//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性

	/*
	*
   	*修改直播状态   定时修改直播时长
	* @param {obj}  store 对象
	* @param {number} 直播状态  0:直播未开始；1：直播进行中；2：正在开启直播中
	* or
	* @param {'status':0,'time':6000} 直播状态  直播进行时长
	* 
	*/
	setLiveStatus(context, data) {
		let state, time;
		if (typeof data == "number") {
			state = data;
			time = 0;
		} else {
			state = data.status;
			time = data.time;
		}	
		context.commit('liveStatus', state)
		context.commit('startTime', parseInt(time) / 1000)		
	},

};
const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});
export default store;
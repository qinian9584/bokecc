import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = { //要设置的全局访问的state对象
	showFooter: true,
	aa:{
		ss:111,
		qq:111
	},
	changableNum: 0
	//要设置的初始属性值
};
const getters = { //实时监听state值的变化(最新状态)
	all(state) { 
		let statedata = state;		
		let arr = [];
		let clone = function(statedata,parkey){
			for (let [key, value] of Object.entries(statedata)) {		
					
				if(typeof value =='object'){
					clone(value,key)
				}else{
					if(parkey){
						var keys = parkey +'.'+key;
					}else{
						var keys = key;
					}
					arr.push({
						key:keys,
						value:JSON.stringify(value)
					})
				}
			}
		}
		clone(statedata)
		return arr
	},
	
};
const mutations = {//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
	someMutation (state) {
		state.showFooter = !state.showFooter
	}
	
};
const actions = {//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
	
};
const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});
export default store;
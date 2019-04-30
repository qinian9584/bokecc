import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	mode: 'history', 
	routes: [
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/login'),
		},
		{
			path: '/singleton/',
			name: 'singleton',
			component: () => import('@/views/singleton/index'),
			children: [
				{
					path: '/',
					name: 'singleton',
					component: () => import('@/views/singleton/singleton'),
					meta: { title: 'catalog' }
				},
				{
					path: 'lang',
					name: 'lang',
					component: () => import('@/views/singleton/lang'),
					meta: { title: 'catalog' }
				},
				{
					path: 'store',
					component: () => import('@/views/singleton/store'),
					name: 'store',
					meta: { title: 'store' }
				}
			]
		},
		{
			path: "/404",
			name: "notFound",
			component:  () => import('@/views/errorPage/401'),
		}, 
		{
			path: "*", // 此处需特别注意置于最底部
			redirect: "/404"
		}
	]
})

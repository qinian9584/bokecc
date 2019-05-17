import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
	mode: 'history', 
	routes: [
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/login'),
		},
		{
			path: '/presenter',
			name: 'presenter',
			component: () => import('@/views/presenter/index'),
		},
		{
			path: '/singleton/',
			name: 'catalog',
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
				},
				{
					path: 'theme',
					component: () => import('@/views/singleton/theme'),
					name: 'theme',
					meta: { title: 'theme' }
				}
			]
		},
		{
			path: "/401",
			name: "Page401",
			component:  () => import('@/views/errorPage/401'),
		}, 
		{
			path: "/404",
			name: "Page404",
			component:  () => import('@/views/errorPage/404'),
		}, 
		{
			path: "*", // 此处需特别注意置于最底部
			redirect: "/404"
		}
	]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
	console.log(to)
	console.log(from)
	console.log(next)
	next({
		// path:to.path,
		// name: to.name,
		query: to.query,
		params:{
			urlData:to.query
		}		
	  })
	// 必须使用 next ,执行效果依赖 next 方法的调用参数
})


export default router
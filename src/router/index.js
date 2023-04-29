import { createWebHistory, createRouter } from 'vue-router'
import Index from '@/pages/Index.vue'
import Dashboard from '@/pages/Dashboard.vue'

import Login from '@/components/forms/LoginComponent.vue'
import Register from '@/components/forms/RegisterComponent.vue'
import HomeComponent from '@/components/forms/dashboard/HomeComponent.vue'
import AllComponent from '@/components/forms/dashboard/AllComponent.vue'
import NewComponent from '@/components/forms/dashboard/NewComponent.vue'


const routes = [
	{
		path: '/',
		name: 'Index',
		component: Index,
		redirect: { name: 'pageLogin' },
		children: [
			{
				name: "pageLogin",
				path: 'login',
				component: Login,
			},
			{
				path: 'register',
				component: Register,
			},
		]
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
		redirect: { name: 'pageHome' },
		children: [
			{
				name: "pageHome",
				path: 'home',
				component: HomeComponent,
			},
			{
				path: 'categorias',
				component: AllComponent,
			},
			{
				path: 'categorianueva',
				component: NewComponent,
			},
			{
				path: 'categorias/:id/:name',
				component: NewComponent,
			},
		]
	},

]



const router = createRouter({
	history: createWebHistory(),
	routes, //same --- > routes:routes
	linkActiveClass: "underline decoration-1 font-bold",

})

router.beforeResolve((to, from, next) => {

var token = localStorage.getItem('tokeOpperweb');

	if (token && token != '') {
		if(to.fullPath == '/login' || to.fullPath == '/register'){
			next({
				path: '/dashboard',
				replace: true
			})
		}else{
			next();
		}
	} else if(to.fullPath != '/' && to.fullPath != '/login' && to.fullPath != '/register'){
		next({
			path: '/',
			replace: true
		})
	}else{
		next();
	}

})


export default router
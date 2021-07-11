import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/'

Vue.use(VueRouter)

// const ifAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     next()
//     return ''
//   } else {
//     if (from) {
//     }
//     next('/login')
//   }
// }
const ifAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated && to.name !== 'Login') {
    next('/login')
    return ''
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/main/Dashboard.vue')
      },
      {
        path: '/popularWork',
        name: 'Popular Work',
        component: () => import('../views/main/PopularWork.vue')
      },
      {
        path: '/banner',
        name: 'Banner',
        component: () => import('../views/main/HeroSection.vue')
      },
      {
        path: '/inputPopularWork',
        name: 'Add Item Popular Work',
        component: () => import('../views/main/Form.vue')
      },
      {
        path: '/inputHeroSection',
        name: 'Add Hero Section',
        component: () => import('../views/main/FormHeroSection.vue')
      },
      {
        path: '/editPopuaraWork/:id',
        name: 'Edit Item Popular Work',
        component: () => import('../views/main/Form.vue')
      },
      {
        path: '/editHeroSection/:id',
        name: 'Edit Item Hero Section',
        component: () => import('../views/main/FormHeroSection.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    beforeEnter: ifAuthenticated
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

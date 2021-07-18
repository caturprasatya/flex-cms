import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import store from '../store/'

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
// const ifAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated && to.name !== 'Login') {
//     next('/login'); return ''
//   } else {
//     next()
//   }
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // beforeEnter: ifAuthenticated
    children: [
      {
        path: '/',
        name: 'Popular Work',
        component: () => import('../views/main/PopularWorks/PopularWork.vue')
      },
      {
        path: '/banner',
        name: 'Banner',
        component: () => import('../views/main/HeroSection/HeroSection.vue')
      },
      {
        path: '/inputCategory',
        name: 'Input Category',
        component: () => import('../views/main/Category/InputCategory.vue')
      },
      {
        path: '/inputPopularWork',
        name: 'Input Item Popular Work',
        component: () => import('../views/main/PopularWorks/FormPopularWork.vue')
      },
      {
        path: '/inputHeroSection',
        name: 'Input Hero Section',
        component: () => import('../views/main/HeroSection/FormHeroSection.vue')
      },
      {
        path: '/editPopuaraWork/:id',
        name: 'Edit Item Popular Work',
        component: () => import('../views/main/PopularWorks/FormPopularWork.vue')
      },
      {
        path: '/editHeroSection/:id',
        name: 'Edit Item Hero Section',
        component: () => import('../views/main/HeroSection/FormHeroSection.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    // beforeEnter: ifAuthenticated
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

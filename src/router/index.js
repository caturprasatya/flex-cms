import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/galery',
        name: 'Galery',
        component: () => import('../views/main/Galery.vue')
      },
      {
        path: '/add',
        name: 'Add File',
        component: () => import('../views/main/Form.vue')
      },
      {
        path: '/edit/:id',
        name: 'Edit File',
        component: () => import('../views/main/Form.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

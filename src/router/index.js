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
        path: '/addFile',
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

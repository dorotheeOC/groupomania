import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ckeditor',
    name: 'Ckeditor',
    component: () => import('../components/Ckeditor.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.auth) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/Signup.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.auth) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('../views/Feed.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.auth) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/posts/:id',
    name: 'singlePost',
    component: () => import('../components/SinglePost.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.auth ) next({ name: 'Login' })
      else next()
    }
    
  },
  {
    path: '/users/:id',
    name: 'singleUser',
    component: () => import('../views/SingleUser.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.auth) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../components/Report.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.auth) next({ name: 'Login' })
      else next()
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// redirige vers l'identification pour toutes les routes
/* router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.auth || to.name) next({ name: 'Login' })
  else next()
}) */

export default router

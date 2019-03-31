import Vue from 'vue'
import Router from 'vue-router'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Artists from './components/Artists'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/artists',
      name: 'artists',
      component: Artists
    }
  ]
})

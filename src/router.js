import Vue from 'vue'
import Router from 'vue-router'
import Signin from './components/Signin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin
    }
  ]
})

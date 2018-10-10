import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home'
import user from '../components/user/user'
import login from '../components/login/login'
import topicdetail from '../components/topicdetail/topicdetail'
import create from '../components/create/create'
import news from '../components/news/news'
import about from '../components/about/about'

Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/user/:id',
      name: 'user',
      meta: {
        requireAuth: true
      },
      component: user
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/topicdetail',
      name: 'topicdetail',
      component: topicdetail
    },
    {
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})

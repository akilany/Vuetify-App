import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/list',
    name: 'EventList',
    component: EventList
  }, {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/event/:id',
    name: 'EventShow',
    component: () => import('../views/EventShow.vue'),
    props: true
  },
  {
    path: '/create',
    name: 'EventCreate',
    component: () => import('../views/EventCreate.vue')
  }, {
    path: '/edit/:id',
    name: 'EventEdit',
    component: () => import('../views/EventEdit.vue'),
    props: true
  }, {
    path: '/404',
    name: '404',
    component: () => import('../views/errors/NotFound.vue')
  },
  {
    path: "*",
    redirect: {
      name: '404'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
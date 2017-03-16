import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SampleForm from '@/components/SampleForm'
import SampleList from '@/components/SampleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/form',
      name: 'SampleForm',
      component: SampleForm
    },
    {
      path: '/form/:id',
      name: 'SampleForm',
      component: SampleForm
    },
    {
      path: '/list',
      name: 'SampleList',
      component: SampleList
    }
  ]
})

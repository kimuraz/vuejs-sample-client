import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SampleForm from '@/components/SampleForm'
import SampleList from '@/components/SampleList'
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'

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
    },
    {
      path: '/line',
      name: 'LineChart',
      component: LineChart
    },
    {
      path: '/bar',
      name: 'BarChart',
      component: BarChart
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Item from '@/components/Item'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/items',
      name: 'items',
      component: Item
    }
  ]
})

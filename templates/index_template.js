import Vue from 'vue'
import Router from 'vue-router'
import Entityname from '@/components/Entityname'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/entitynames',
      name: 'entitynames',
      component: Entityname
    }
  ]
})

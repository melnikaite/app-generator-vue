import Vue from 'vue'
import Router from 'vue-router'
import Team from '@/components/Team'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/teams',
      name: 'teams',
      component: Team
    }
  ]
})

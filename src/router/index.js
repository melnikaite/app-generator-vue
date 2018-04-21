import Vue from 'vue'
import Router from 'vue-router'
import EventParticipant from '@/components/EventParticipant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/event-participant',
      name: 'event-participant',
      component: EventParticipant
    }
  ]
})

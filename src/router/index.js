import Vue from 'vue'
import VueRouter from 'vue-router'

import recommend from '../components/recommend/recommend.vue'
import singer from '../components/singer/singer.vue'
import rank from '../components/rank/rank.vue'
import search from '../components/search/search.vue'
import singerDetail from '../components/singer-detail/singer-detail.vue'
import disc from '../components/disc/disc.vue'

// const home = () =>import('../')
Vue.use(VueRouter)

export default new VueRouter({
  linkActiveClass: 'active',
  routes:[
    {
      path:'/recommend',
      component:recommend,
      children:[
        {
          path:':id',
          component:disc
        }
      ]
    },
    {
      path:'/singer',
      component:singer,
      children:[
        {
          path:':id',
          component:singerDetail
        }
      ]
    },
    {
      path:'/rank',
      component:rank
    },
    {
      path:'/search',
      component:search
    },
    {
      path:'/',
      redirect:'/recommend'
    }

  ]
})



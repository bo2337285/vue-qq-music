import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/components/MainPage'
import Album from '@/components/Album.vue'
import Singer from '@/components/Singer.vue'
import RankPage from '@/components/RankPage.vue'
import Recommand from '@/components/Recommand.vue'
import Cd from '@/components/Cd.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'MainPage',
      components: {
        main:MainPage
      },
      children: [
        {
          path: '',
          name: 'recommand',
          component: Recommand
        },
        {
          path: '/recommand',
          name: 'recommand',
          component: Recommand
        },
        {
          path: '/rank',
          name: 'rank',
          component: RankPage
        }
      ]
    },
    {
      path: '/singer/:id',
      name: 'singer',
      components: {
        main: Singer
      }
    },
    {
      path: '/album/:id',
      name: 'album',
      components: {
        main: Album
      }
    },
    {
      path: '/cd/:id',
      name: 'cd',
      components: {
        main: Cd
      }
    }
  ],
  //只在history模式下有用
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

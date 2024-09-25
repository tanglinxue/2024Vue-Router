import Vue from 'vue'
import VueRouter from '@/vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'a',
        component: {
          render: (h) => <h1>homea</h1>
        }
      },
      {
        path: 'b',
        component: {
          render: (h) => <h1>homeb</h1>
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    children: [
      {
        path: 'a',
        component: {
          render: (h) => <h1>abouta</h1>
        }
      },
      {
        path: 'b',
        component: {
          render: (h) => <h1>aboutb</h1>
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.matcher.addRoutes([
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    children: [
      {
        path: 'c',//children中路径不能增加/
        component: {
          render: (h) => <h1>about c</h1>
        }
      }
    ]
  }
])

router.beforeEach((from, to, next) => {
  setTimeout(() => {
    console.log(1)
    next()
  }, 1000)
})


router.beforeEach((from, to, next) => {
  setTimeout(() => {
    console.log(2)
    next()
  }, 1000)
})


//导航守卫

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ranking from '../views/Ranking.vue'
import TodayRecommendPage from '../views/TodayRecommendPage.vue'
import GenreRecommendPage from '../views/GenreRecommendPage.vue'
import MovieDetail from '../views/MovieDetail.vue'
import NoticeBoard from '../views/NoticeBoard.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import ArticleForm from '../views/ArticleForm.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import ProfileForm from '../views/ProfileForm.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: Ranking
  },
  {
    path: '/todayrecommendpage',
    name: 'TodayRecommendPage',
    component: TodayRecommendPage
  },
  {
    path: '/genrerecommendpage',
    name: 'GenreRecommendPage',
    component: GenreRecommendPage
  },
  {
    path: '/moviedetail',
    name: 'MovieDetail',
    component: MovieDetail,
    meta: { scrollToTop: true }
  },
  {
    path: '/noticeboard',
    name: 'NoticeBoard',
    component: NoticeBoard
  },
  {
    path: '/articledetail',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/articleform',
    name: 'ArticleForm',
    component: ArticleForm
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/profileform',
    name: 'ProfileForm',
    component: ProfileForm
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]


const scrollBehavior = function (to) {
  const position = {}
  return new Promise(resolve => {
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }

    // wait for the out transition to complete (if necessary)
    this.app.$root.$once('triggerScroll', () => {
      // if the resolved position is falsy or an empty object,
      // will retain current scroll position.
      resolve(position)
    })
  })
}




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior,
})

export default router

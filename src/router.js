import Vue from 'vue'
import Router from 'vue-router'
import Index from 'pages/Index'
// import Next from 'pages/Next'
import Login from 'pages/Login'
import Homepage from 'pages/Homepage'

Vue.use(Router)

const router = new Router({
  hashbang: true
})

const Routes = router => {
  router.map({
    '/index': {
      name: 'index',
      component: Index
    },
    // '/next': {
    //   name: 'next',
    //   component: Next
    // },
    '/login': {
      name: 'login',
      component: Login
    },
    '/homepage': {
      name: 'homepage',
      component: Homepage
    }
  })
  router.redirect({
    '/': '/index'
  })
}

Routes(router)

export default router

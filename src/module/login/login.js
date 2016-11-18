import Vue from 'vue'
import Login from 'pages/Login'
import VueRouter from 'vue-router'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)

const Routes = function (router) {
  router.map({
    '/login': {
      name: 'login',
      component: Login
    }
  })
  router.redirect({
    '/': '/login'
  })
  router.alias({
    '/login': '/module/login.html'
  })
}

const router = new VueRouter({
  history: true
})

Routes(router)

router.start(Login, 'login')

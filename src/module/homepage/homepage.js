import Vue from 'vue'
import Homepage from 'pages/Homepage'
import VueRouter from 'vue-router'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)

const Routes = function (router) {
  router.map({
    '/homepage': {
      name: 'homepage',
      component: Homepage
    }
  })
}

const router = new VueRouter({
  history: true
})

Routes(router)

router.start(Homepage, 'homepage')

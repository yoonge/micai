import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Routes from 'src/routes.js'

const VueApp = Vue.extend(App)

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  history: true
})

Routes(router)

router.start(VueApp, 'app')

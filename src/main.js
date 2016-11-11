import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routes from './routes.js'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: true
})

Routes(router)

router.start(App, '#app')


import Vue from 'vue'
import Index from 'pages/Index'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  history: true
})

router.start(Index, 'index')

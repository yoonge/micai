import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from 'src/router.js'

const VueApp = Vue.extend(App)

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueResource)

router.start(VueApp, 'app')

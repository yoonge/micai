import App from './App'
import Next from 'pages/Next'
import Login from 'pages/Login'
import Homepage from 'pages/Homepage'

const Routes = router => {
  router.map({
    '/portal/content/weixinPublic/vue/index': {
      name: 'app',
      component: App
    },
    '/portal/content/weixinPublic/vue/next': {
      name: 'next',
      component: Next
    },
    '/portal/content/weixinPublic/vue/login': {
      name: 'login',
      component: Login
    },
    '/portal/content/weixinPublic/vue/homepage': {
      name: 'homepage',
      component: Homepage
    }
  })
  router.redirect({
    '*': '/portal/content/weixinPublic/vue/',
    '/portal/content/weixinPublic/vue/': '/portal/content/weixinPublic/vue/index'
  })
}

export default Routes

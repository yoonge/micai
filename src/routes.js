import Login from 'pages/Login'
import Homepage from 'pages/Homepage'

const Routes = function (router) {
  router.map({
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
    '/': '/login'
  })
}

export default Routes

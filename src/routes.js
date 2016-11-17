import Login from 'module/login/'
import Homepage from 'module/homepage/'

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

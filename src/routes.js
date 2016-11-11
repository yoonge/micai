import Login from 'pages/Login'

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
}

export default Routes

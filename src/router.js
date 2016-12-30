import Vue from 'vue'
import Router from 'vue-router'
import Index from 'pages/Index'
import Login from 'pages/Login'
import Home from 'pages/Home'
import Homepage from 'pages/Homepage'
import Employee from 'pages/Employee'
import employeeCenter from 'pages/EmployeeCenter'
import EmployeeCompany from 'pages/EmployeeCompany'

Vue.use(Router)

const router = new Router({
  hashbang: true,
  history: false
})

const Routes = router => {
  router.map({
    '/index': {
      name: 'index',
      component: Index
    },
    '/login': {
      name: 'login',
      component: Login
    },
    '/home': {
      name: 'home',
      component: Home,
      subRoutes: {
        '/homepage': {
          name: 'home.homepage',
          component: Homepage
        },
        '/employee': {
          name: 'home.employee',
          component: Employee,
          subRoutes: {
            '/employeeCenter': {
              name: 'home.employee.center',
              component: employeeCenter
            },
            '/employeeCompany': {
              name: 'home.employee.company',
              component: EmployeeCompany
            }
          }
        }
      }
    }
  })
  router.redirect({
    '/': '/index',
    '/home': '/home/homepage',
    '/home/employee': '/home/employee/employeeCenter'
  })
}

Routes(router)

export default router

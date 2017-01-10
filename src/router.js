import Vue from 'vue'
import Router from 'vue-router'
import Index from 'pages/Index'
import Login from 'pages/Login'
import Home from 'pages/Home'
import Homepage from 'pages/Homepage'

import Employee from 'pages/Employee'
import EmployeeCenter from 'pages/EmployeeCenter'
import EmployeeCompany from 'pages/EmployeeCompany'

import Map from 'pages/Map'
import MapView from 'pages/MapView'
import MapSearchResult from 'pages/MapSearchResult'
import MapPartySearchResult from 'pages/MapPartySearchResult'

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
        '/map': {
          name: 'home.map',
          component: Map,
          subRoutes: {
            '/mapView': {
              name: 'home.map.view',
              component: MapView
            },
            '/mapSearchResult': {
              name: 'home.map.searchResult',
              component: MapSearchResult
            },
            'mapPartySearchResult': {
              name: 'home.map.partySearchResult',
              component: MapPartySearchResult
            }
          }
        },
        '/employee': {
          name: 'home.employee',
          component: Employee,
          subRoutes: {
            '/employeeCenter': {
              name: 'home.employee.center',
              component: EmployeeCenter
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
    '/home/map': '/home/map/mapView',
    '/home/employee': '/home/employee/employeeCenter'
  })
}

Routes(router)

export default router

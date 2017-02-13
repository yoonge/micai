import Vue from 'vue'
import Router from 'vue-router'
import Index from 'pages/Index'
import Login from 'pages/Login'
import Home from 'pages/Home'
import Homepage from 'pages/Homepage'

import Employee from 'pages/Employee'
import EmployeeCenter from 'pages/EmployeeCenter'
import EmployeeCompany from 'pages/EmployeeCompany'

import User from 'pages/User'
import UserInfo from 'pages/UserInfo'
import UserWork from 'pages/UserWork'
import UserEducation from 'pages/UserEducation'
import UserSocial from 'pages/UserSocial'

import Edit from 'pages/Edit'
import EditUserInfo from 'pages/EditUserInfo'

import Map from 'pages/Map'
import MapView from 'pages/MapView'
import MapSearchResult from 'pages/MapSearchResult'
import MapPartySearchResult from 'pages/MapPartySearchResult'

import Address from 'pages/Address'
import AddressList from 'pages/AddressList'
import AddressSearchResult from 'pages/AddressSearchResult'

import System from 'pages/System'
import SystemView from 'pages/SystemView'

import Wage from 'pages/Wage'
import WageView from 'pages/WageView'
import WagePassword from 'pages/WagePassword'
import WageSetPassword from 'pages/WageSetPassword'
import WageSuccess from 'pages/WageSuccess'
import WageInfo from 'pages/WageInfo'
import WageInfoDynamic from 'pages/WageInfoDynamic'

import Notice from 'pages/Notice'
import NoticeView from 'pages/NoticeView'
import NoticeInfo from 'pages/NoticeInfo'

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
        '/address': {
          name: 'home.address',
          component: Address,
          subRoutes: {
            '/addressList': {
              name: 'home.address.list',
              component: AddressList
            },
            '/addressSearchResult': {
              name: 'home.address.searchResult',
              component: AddressSearchResult
            }
          }
        },
        '/system': {
          name: 'home.system',
          component: System,
          subRoutes: {
            '/systemView': {
              name: 'home.system.view',
              component: SystemView
            }
          }
        },
        '/wage': {
          name: 'home.wage',
          component: Wage,
          subRoutes: {
            '/wageView': {
              name: 'home.wage.view',
              component: WageView
            },
            '/wagePassword': {
              name: 'home.wage.password',
              component: WagePassword
            },
            '/wageSetPassword': {
              name: 'home.wage.setPassword',
              component: WageSetPassword
            },
            '/wageSuccess': {
              name: 'home.wage.success',
              component: WageSuccess
            },
            'wageInfo': {
              name: 'home.wage.info',
              component: WageInfo
            },
            'wageInfo/:companyId/:companyName': {
              name: 'home.wage.info.dynamic',
              component: WageInfoDynamic
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
        },
        '/user': {
          name: 'home.user',
          component: User,
          subRoutes: {
            '/userInfo': {
              name: 'home.user.info',
              component: UserInfo
            },
            '/userWork': {
              name: 'home.user.work',
              component: UserWork
            },
            '/userEducation': {
              name: 'home.user.education',
              component: UserEducation
            },
            '/userSocial': {
              name: 'home.user.social',
              component: UserSocial
            }
          }
        },
        '/edit': {
          name: 'home.edit',
          component: Edit,
          subRoutes: {
            '/editUserInfo': {
              name: 'home.edit.userInfo',
              component: EditUserInfo
            }
          }
        },
        '/notice': {
          name: 'home.notice',
          component: Notice,
          subRoutes: {
            '/noticeView': {
              name: 'home.notice.view',
              component: NoticeView
            },
            '/noticeInfo/:cpUserId/:noticeId': {
              name: 'home.notice.info',
              component: NoticeInfo
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
    '/home/address': '/home/address/addressList',
    '/home/system': '/home/system/systemView',
    '/home/wage': '/home/wage/wageView',
    '/home/employee': '/home/employee/employeeCenter',
    'home/user': '/home/user/userInfo',
    '/home/notice': '/home/notice/noticeView'
  })
}

Routes(router)

export default router

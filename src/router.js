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
import UserTemp from 'pages/UserTemp'
import UserInfo from 'pages/UserInfo'
import UserInfoTemp from 'pages/UserInfoTemp'
import UserWork from 'pages/UserWork'
import UserWorkTemp from 'pages/UserWorkTemp'
import UserEducation from 'pages/UserEducation'
import UserEducationTemp from 'pages/UserEducationTemp'
import UserSocial from 'pages/UserSocial'
import UserSocialTemp from 'pages/UserSocialTemp'

import Edit from 'pages/Edit'
import EditUserInfo from 'pages/EditUserInfo'
import EditUserInfoTemp from 'pages/EditUserInfoTemp'

import UserWorkList from 'pages/UserWorkList'
import UserWorkListTemp from 'pages/UserWorkListTemp'
import AddUserWork from 'pages/AddUserWork'
import AddUserWorkTemp from 'pages/AddUserWorkTemp'
import EditUserWork from 'pages/EditUserWork'
import EditUserWorkTemp from 'pages/EditUserWorkTemp'

import UserEducationList from 'pages/UserEducationList'
import UserEducationListTemp from 'pages/UserEducationListTemp'
import AddUserEducation from 'pages/AddUserEducation'
import AddUserEducationTemp from 'pages/AddUserEducationTemp'
import EditUserEdu from 'pages/EditUserEdu'
import EditUserEduTemp from 'pages/EditUserEduTemp'

import UserSocialRelationshipList from 'pages/UserSocialRelationshipList'
import UserSocialRelationshipListTemp from 'pages/UserSocialRelationshipListTemp'
import AddUserSocialRelationship from 'pages/AddUserSocialRelationship'
import AddUserSocialRelationshipTemp from 'pages/AddUserSocialRelationshipTemp'
import EditUserSocialRelationship from 'pages/EditUserSocialRelationship'
import EditUserSocialRelationshipTemp from 'pages/EditUserSocialRelationshipTemp'

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
        '/userTemp': {
          name: 'home.userTemp',
          component: UserTemp,
          subRoutes: {
            '/userInfoTemp/:memberLoginId/:cpUserIdTemp': {
              name: 'home.user.info.temp.dynamic',
              component: UserInfoTemp
            },
            '/userInfoTemp': {
              name: 'home.user.info.temp',
              component: UserInfoTemp
            },
            '/userWorkTemp': {
              name: 'home.user.work.temp',
              component: UserWorkTemp
            },
            '/userEducationTemp': {
              name: 'home.user.education.temp',
              component: UserEducationTemp
            },
            '/userSocialTemp': {
              name: 'home.user.social.temp',
              component: UserSocialTemp
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
            },
            '/editUserInfoTemp': {
              name: 'home.edit.userInfoTemp',
              component: EditUserInfoTemp
            },
            '/userWorkList': {
              name: 'home.edit.userWorkList',
              component: UserWorkList
            },
            '/userWorkListTemp': {
              name: 'home.edit.userWorkListTemp',
              component: UserWorkListTemp
            },
            '/addUserWork': {
              name: 'home.edit.addUserWork',
              component: AddUserWork
            },
            '/addUserWorkTemp': {
              name: 'home.edit.addUserWorkTemp',
              component: AddUserWorkTemp
            },
            '/editUserWork/:workExpId': {
              name: 'home.edit.editUserWork',
              component: EditUserWork
            },
            '/editUserWorkTemp/:workExpId': {
              name: 'home.edit.editUserWorkTemp',
              component: EditUserWorkTemp
            },
            '/userEducationList': {
              name: 'home.edit.userEducationList',
              component: UserEducationList
            },
            '/userEducationListTemp': {
              name: 'home.edit.userEducationListTemp',
              component: UserEducationListTemp
            },
            '/addUserEducation': {
              name: 'home.edit.addUserEducation',
              component: AddUserEducation
            },
            '/addUserEducationTemp': {
              name: 'home.edit.addUserEducationTemp',
              component: AddUserEducationTemp
            },
            '/editUserEdu/:eduInfoId': {
              name: 'home.edit.editUserEdu',
              component: EditUserEdu
            },
            '/editUserEduTemp/:eduInfoId': {
              name: 'home.edit.editUserEduTemp',
              component: EditUserEduTemp
            },
            '/userSocialRelationshipList': {
              name: 'home.edit.userSocialRelationshipList',
              component: UserSocialRelationshipList
            },
            '/userSocialRelationshipListTemp': {
              name: 'home.edit.userSocialRelationshipListTemp',
              component: UserSocialRelationshipListTemp
            },
            '/addUserSocialRelationship': {
              name: 'home.edit.addUserSocialRelationship',
              component: AddUserSocialRelationship
            },
            '/addUserSocialRelationshipTemp': {
              name: 'home.edit.addUserSocialRelationshipTemp',
              component: AddUserSocialRelationshipTemp
            },
            '/editUserSocialRelationship/:socialRelationshipId': {
              name: 'home.edit.editUserSocialRelationship',
              component: EditUserSocialRelationship
            },
            '/editUserSocialRelationshipTemp/:socialRelationshipId': {
              name: 'home.edit.editUserSocialRelationshipTemp',
              component: EditUserSocialRelationshipTemp
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

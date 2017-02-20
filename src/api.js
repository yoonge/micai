import config from '../config'

export const getUrl = config.apiPrefix + '/portal/weixinPublic/weixinToLogin.do'

export const getUserInfo = config.apiPrefix + '/portal/weixinPublic/login.do'

export const sendSmsCode = config.apiPrefix + '/portal/register/sendMsg.do'

export const getCaptcha = config.apiPrefix + '/portal/captcha/getCaptcha.do'

export const checkMessage = config.apiPrefix + '/portal/weixinPublic/weChatCheckMessage.do'

export const getHomepageInfo = config.apiPrefix + '/portal/weixinPublic/toWeChatMain.do'

export const getAllCompany = config.apiPrefix + '/portal/weixinPublic/CompanyChangedInfo.do'

export const SelectACompany = config.apiPrefix + '/portal/weixinPublic/SelectACompany.do'

export const hrMapInfo = config.apiPrefix + '/portal/weixinPublic/toWeChatHrMap.do'

export const hrMapSearch = config.apiPrefix + '/portal/weixinPublic/searchSingleInfo.do'

export const hrMapPartySearch = config.apiPrefix + '/portal/weixinPublic/toSearchPartyInfo.do'

export const savePhoneBook = config.apiPrefix + '/portal/weixinPublic/savePhoneBook.do'

export const queryPhoneBook = config.apiPrefix + '/portal/weixinPublic/queryPhoneBook.do'

export const searchSinglePhone = config.apiPrefix + '/portal/weixinPublic/searchSinglePhone.do'

export const getDocumentAddress = config.apiPrefix + '/portal/weixinPublic/ReadDocumentAddress.do'

// wage
export const checkWagePassword = config.apiPrefix + '/portal/weixinPublic/ValidateSalaryPassword.do'

export const setWagePassword = config.apiPrefix + '/portal/weixinPublic/SalaryQuePassword.do'

export const getWageInfo = config.apiPrefix + '/portal/weixinPublic/ShowSalaryInfo.do'

export const checkWageSmsCode = config.apiPrefix + '/portal/weixinPublic/CheckTestGetCode.do'

export const getWageSmsCode = config.apiPrefix + '/portal/weixinPublic/TestGetCode.do'

export const getNoticeList = config.apiPrefix + '/portal/weixinPublic/queryNotices.do'

export const getNoticeInfo = config.apiPrefix + '/portal/weixinPublic/queryNoticeDetail.do'

export const getNoticeNoRead = config.apiPrefix + '/portal/weixinPublic/queryNoReadAmount.do'

// userInfo
export const showPersonalInfo = config.apiPrefix + '/portal/weixinPublic/showPersonalInfo.do'

export const addPersonalInfo = config.apiPrefix + '/portal/weixinPublic/addPersonalInfo.do'

export const showEmployExperience = config.apiPrefix + '/portal/weixinPublic/showEmployExperience.do'

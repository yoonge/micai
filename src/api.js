import config from '../config'

// export const getUrl = config.apiPrefix + '/getUrl'

// export const getUserInfo = config.apiPrefix + '/getUserInfo'

export const getUrl = config.apiPrefix + '/portal/weixinPublic/weixinToLogin.do'

export const getUserInfo = config.apiPrefix + '/portal/weixinPublic/login.do'

export const sendSmsCode = config.apiPrefix + '/portal/register/sendMsg.do'

export const getCaptcha = config.apiPrefix + '/portal/captcha/getCaptcha.do'

export const checkMessage = config.apiPrefix + '/portal/weixinPublic/weChatCheckMessage.do'

export const getHomepageInfo = config.apiPrefix + '/portal/weixinPublic/toWeChatMain.do'

export const getAllCompany = config.apiPrefix + '/portal/weixinPublic/CompanyChangedInfo.do'

export const SelectACompany = config.apiPrefix + '/portal/weixinPublic/SelectACompany.do'

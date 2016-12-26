<template>
  <div>
    <loading :show="loading" :text="textLoading"></loading>
    <div class="xg-logo-wrapper">
      <img class="xg-logo" src="~assets/img/logo@2x.png">
    </div>
    <div class="xg-login">
      <group>
        <flexbox :gutter="0">
          <flexbox-item style="flex: 0 0 32px;">
            <i class="ui-icon ui-icon-md ui-icon-phone"></i>
          </flexbox-item>
          <flexbox-item>
            <input type="tel" v-model="telphone" maxlength="11" placeholder="请输入手机号" @input="listenTelphone()" @blur="checkTelphone()">
          </flexbox-item>
        </flexbox>
        <flexbox :gutter="0">
          <flexbox-item style="flex: 0 0 32px;">
            <i class="ui-icon ui-icon-md ui-icon-sms-code"></i>
          </flexbox-item>
          <flexbox-item>
            <input type="text" v-model="smsCode" maxlength="4" placeholder="短信验证码" @input="listenCaptcha()"></input>
          </flexbox-item>
          <flexbox-item style="flex: 0 0 96px; text-align: right;">
              <button type="button" class="btn-link" :class="{'btn-link-disable': linkDisable}" @click="getSmsCode()">{{textLink}}</button>
          </flexbox-item>
        </flexbox>
        <flexbox :gutter="0" v-if="showCaptcha">
          <flexbox-item style="flex: 0 0 32px;">
            <i class="ui-icon ui-icon-md ui-icon-captcha"></i>
          </flexbox-item>
          <flexbox-item>
            <input type="text" v-model="captcha" maxlength="6" placeholder="校验码" @input="listenCaptcha()">
          </flexbox-item>
          <flexbox-item style="flex: 0 0 89px;">
              <img src="http://wx.91micai.com/portal/captcha/getCaptcha.do" alt="Captcha" width="89">
          </flexbox-item>
        </flexbox>
        <x-button class="btn-login" :disabled="btnDisabled" @click="checkSmsCode()">登录</x-button>
      </group>
      <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
    </div>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Group, Cell, Flexbox, FlexboxItem, XInput, XButton, Toast, Loading } from 'vux-components'

export default {
  name: 'Login',
  components: {
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    XInput,
    XButton,
    Toast,
    Loading
  },
  data () {
    return {
      telphone: '',
      smsCode: '',
      captcha: '',
      textToast: '',
      showToast: false,
      textLink: '获取验证码',
      linkDisable: true,
      btnDisabled: true,
      showCaptcha: false,
      loading: false,
      textLoading: '登录中...'
    }
  },
  ready () {
    $('body').removeClass('homepage').addClass('login')
  },
  methods: {
    listenTelphone () {
      const phoneLength = this.telphone.length
      if (phoneLength === 11) {
        const phoneNum = this.telphone
        if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
          this.textToast = '您填写的手机格式有误！'
          this.showToast = true
        } else {
          this.linkDisable = false
        }
      } else {
        this.linkDisable = true
      }
    },
    checkTelphone () {
      const phoneNum = this.telphone
      if (!(/^1[34578]\d{9}$/.test(phoneNum)) && phoneNum !== '') {
        this.textToast = '您填写的手机格式有误！'
        this.showToast = true
        return false
      } else {
        return true
      }
    },
    listenCaptcha () {
      const smsCodeLength = this.smsCode.length
      const captchaLength = this.captcha.length
      if (!this.showCaptcha) {
        if (smsCodeLength === 4) {
          this.btnDisabled = false
          $('button.btn-login').removeClass('weui_btn_default').addClass('weui_btn_primary')
        } else {
          this.btnDisabled = true
          $('button.btn-login').removeClass('weui_btn_primary').addClass('weui_btn_default')
        }
      } else {
        if ((captchaLength === 6) && (smsCodeLength === 4)) {
          this.btnDisabled = false
          $('button.btn-login').removeClass('weui_btn_default').addClass('weui_btn_primary')
        } else {
          this.btnDisabled = true
          $('button.btn-login').removeClass('weui_btn_primary').addClass('weui_btn_default')
        }
      }
    },
    checkSmsCode () {
      const that = this
      this.$http({
        url: api.checkMessage,
        params: {
          phone: that.telphone,
          smsCaptcha: that.smsCode,
          captcha: that.captcha
        },
        method: 'GET',
        beforeSend () {
          that.loading = true
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.result) {
          that.loading = false
          that.$route.router.go('/homepage')
        } else {
          that.loading = false
          that.textToast = '您输入的验证码有误！'
          that.showToast = true
          that.btnDisabled = true
          $('button.btn-login').removeClass('weui_btn_primary').addClass('weui_btn_default')
        }
      }).catch(err => {
        console.log(err.data)
      })
    },
    getSmsCode () {
      const that = this
      if (this.linkDisable) {
        return false
      } else {
        this.$http({
          url: api.sendSmsCode,
          params: {
            phone: that.telphone
          },
          method: 'GET'
        }).then(res => {
          console.log(res.data)
          if (res.data.info) {
            that.textToast = '短信验证码已成功发送，三十分钟内有效！'
            that.showToast = true
            that.linkDisable = true
            let t = 30
            let timer = setInterval(() => {
              t--
              if (t === 0) {
                if (that.checkTelphone()) that.linkDisable = false
                that.textLink = '获取验证码'
                clearInterval(timer)
              } else {
                that.textLink = t + ' 秒后重发'
              }
            }, 1000)
          }
          if (res.data.registerCaptchaSessionToken) {
            that.showCaptcha = true
          }
        }).catch(err => {
          console.log(err.data)
        })
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset';
@import '../styles/reset';
@import '../styles/icon';

body.login {
  background-image: url(~assets/img/login-bg@2x.png);
  background-position: center bottom;
  background-size: contain;
}

.xg-logo-wrapper {
  text-align: center;

  .xg-logo {
    width: 132px;
    margin-top: 30px;
  }
}

.xg-login {
  margin-top: 20px;
  padding-right: 32px;
  padding-left: 32px;

  .vux-flexbox {
    border-bottom: 1px solid #e3e3e3;
    margin-top: 12px;

    .vux-flexbox-item > input {
      color: #5b5b5b;
      border: none;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .btn-link {
    color: #51a5f7;

    &.btn-link-disable {
      color: #e3e3e3;
    }
  }
  .weui_cells:before {
    border-top-width: 0;
  }

  .weui_btn {
    border-radius: 2px;
    margin-top: 24px;

    &:after {
      border: none;
    }
  }
  .weui_btn_disabled.weui_btn_default {
    color: #fff;
    background-color: #e3e3e3;
  }
  .weui_btn_primary {
    color: #fff;
    background-color: #51a5f7;

    &:not(.weui_btn_disabled):active {
      background-color: #51a5f7;
    }
  }
  .weui_toast {
    border-radius: 2px;
    background-color: rgba(0, 0, 0, .67);
    top: 160px;

    .weui_toast_content {
      color: rgba(255, 255, 255, .8);
      font-size: 14px;
      padding: 6px 8px;
    }
  }
}
</style>
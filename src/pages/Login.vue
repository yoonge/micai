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
            <input type="text" v-model="captcha" maxlength="4" placeholder="校验码" @input="listenCaptcha()">
          </flexbox-item>
          <flexbox-item style="flex: 0 0 89px;">
              <img :src="captchaSrc" alt="Captcha" width="89" @click="getCaptchaSrc()">
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
      captchaSrc: '',
      loading: false,
      textLoading: 'Loading...'
    }
  },
  ready () {
    $('body').removeAttr('class').addClass('login')
    this.getCaptchaSrc()
  },
  methods: {
    listenTelphone () {
      const phoneLength = this.telphone.length
      if (phoneLength === 11) {
        const phoneNum = this.telphone
        if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
          this.$set('textToast', '您填写的手机格式有误！')
          this.$set('showToast', true)
        } else {
          this.$set('linkDisable', false)
        }
      } else {
        this.$set('linkDisable', true)
      }
    },
    checkTelphone () {
      const phoneNum = this.telphone
      if (!(/^1[34578]\d{9}$/.test(phoneNum)) && phoneNum !== '') {
        this.$set('textToast', '您填写的手机格式有误！')
        this.$set('showToast', true)
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
          this.$set('btnDisabled', false)
          $('button.btn-login').removeClass('weui_btn_default').addClass('weui_btn_primary')
        } else {
          this.$set('btnDisabled', true)
          $('button.btn-login').removeClass('weui_btn_primary').addClass('weui_btn_default')
        }
      } else {
        if ((captchaLength === 4) && (smsCodeLength === 4)) {
          this.$set('btnDisabled', false)
          $('button.btn-login').removeClass('weui_btn_default').addClass('weui_btn_primary')
        } else {
          this.$set('btnDisabled', true)
          $('button.btn-login').removeClass('weui_btn_primary').addClass('weui_btn_default')
        }
      }
    },
    checkSmsCode () {
      const that = this
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      this.$http({
        url: api.checkMessage,
        params: {
          phone: that.telphone,
          smsCaptcha: that.smsCode,
          captcha: that.captcha
        },
        method: 'GET',
        beforeSend () {
          console.log('Loading...')
          that.$set('loading', true)
        }
      }).then(res => {
        if (res.data.result) {
          u.phone = that.telphone
          window.localStorage.setItem('userInfo', JSON.stringify(u))
          that.$set('loading', false)
          that.$route.router.go('/home')
        } else {
          that.$set('loading', false)
          that.$set('textToast', '您输入的验证码有误！')
          that.$set('showToast', true)
          that.$set('btnDisabled', true)
          $('button.btn-login').removeClass('weui_btn_primary').addClass('weui_btn_default')
        }
      }).catch(err => {
        console.error(err.data)
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
          if (res.data.info) {
            that.$set('textToast', '短信验证码已成功发送，三十分钟内有效！')
            that.$set('showToast', true)
            that.$set('linkDisable', true)
            let t = 30
            let timer = setInterval(() => {
              t--
              if (t === 0) {
                if (that.checkTelphone()) that.linkDisable = false
                that.$set('textLink', '获取验证码')
                clearInterval(timer)
              } else {
                let txt = t + ' 秒后重发'
                that.$set('textLink', txt)
              }
            }, 1000)
          }
          if (res.data.registerCaptchaSessionToken) {
            that.$set('showCaptcha', true)
          }
        }).catch(err => {
          console.error(err.data)
        })
      }
    },
    getCaptchaSrc () {
      this.$set('captchaSrc', api.getCaptcha)
    }
  }
}
</script>

<style lang="less">
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
    border: none;
    background-color: transparent;

    &.btn-link-disable {
      color: #e3e3e3;
    }
  }
}
</style>
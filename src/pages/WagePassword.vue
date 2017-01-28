<template>
  <div class="wage-password">
    <!-- 第一步 -->
    <div class="password-first-step">
      <p class="password-title">请输入 {{telphone}} 收到的验证码</p>
      <flexbox :gutter="0">
        <flexbox-item style="flex: 0 0 32px;">
          <i class="ui-icon ui-icon-md ui-icon-sms-code"></i>
        </flexbox-item>
        <flexbox-item>
          <input type="text" v-model="smsCode" maxlength="4" placeholder="短信验证码" @input="listenSmsCode()">
        </flexbox-item>
        <flexbox-item style="flex: 0 0 96px; text-align: right;">
          <button type="button" class="btn-link" :class="{'btn-link-disable': linkDisable}" disabled="{{linkDisable}}" @click="getSmsCode()">{{textLink}}</button>
        </flexbox-item>
      </flexbox>
      <button class="password-btn weui_btn" :class="{'btn-disabled': btnDisabled}" disabled="{{btnDisabled}}" @click="checkSmsCode()">下一步</button>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Flexbox, FlexboxItem, Toast } from 'vux-components'

export default {
  name: 'WagePassword',
  components: {
    Flexbox,
    FlexboxItem,
    Toast
  },
  data () {
    return {
      telphone: '',
      openId: '',
      headImg: '',
      smsCode: '',
      textLink: '获取验证码',
      linkDisable: false,
      textToast: '短信验证码输入错误！',
      showToast: false,
      btnDisabled: true
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('openId', u.openId)
    this.$set('telphone', u.phone)
    this.$set('headImg', u.headImg)
    this.getSmsCode()
  },
  methods: {
    getSmsCode () {
      const that = this
      this.$http({
        url: api.getWageSmsCode,
        params: {
          phoneNo: this.telphone
        },
        method: 'GET'
      }).then(res => {
        that.$set('textToast', '短信验证码已成功发送，30 分钟内有效！')
        that.$set('showToast', true)
        that.$set('linkDisable', true)
        let t = 60
        let timer = setInterval(() => {
          t--
          if (t === 0) {
            that.$set('textLink', '获取验证码')
            clearInterval(timer)
            that.$set('linkDisable', false)
          } else {
            let txt = t + ' 秒后重发'
            that.$set('textLink', txt)
            that.$set('linkDisable', true)
          }
        }, 1000)
      }).catch(err => {
        console.error(err.data)
      })
    },
    listenSmsCode () {
      const smsCodeLength = this.smsCode.length
      if (smsCodeLength === 4) {
        this.$set('btnDisabled', false)
      } else {
        this.$set('btnDisabled', true)
      }
    },
    checkSmsCode () {
      const that = this
      that.$http({
        url: api.checkWageSmsCode,
        params: {
          smsCaptcha: this.smsCode,
          phoneNo: this.telphone
        },
        method: 'GET'
      }).then(res => {
        if (!res.data.result) {
          this.$set('showToast', true)
        } else {
          that.$router.go('/home/wage/wageSetPassword')
        }
      }).catch(err => {
        console.error(err.data)
      })
    }
  }
}
</script>

<style lang="less">
.wage-password {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 25px 5% 0 5%;

  .password-title {
    padding: 0;
    font-size: 16px;
    font-weight: normal;
    color: #5B5B5B;
    margin-top: 10px;
  }

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
    color: #38ACFD;
    border: none;
    background-color: transparent;

    &.btn-link-disable {
      color: #e3e3e3;
    }
  }

  .password-btn {
    color: #fff;
    font-size: 16px;
    width: 100%;
    height: 44px;
    border-radius: 3px;
    border: none;
    background-color: #38acfd;
    margin: 18px auto 0;

    &.btn-disabled {
      background-color: #c8cfd4;
    }
  }
  .password-instruction {
    color: #bcbcbc;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin: 20px auto 0;
    padding: 0;
  }
  .password-true {
    width: 100%;
  }
  .password-ok {
    height: 54px;
    text-align: center;
    margin: 20px auto;

    img {
      width: 51px;
      height: 54px;
    }
  }
  .password-success {
    color: #5b5b5b;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
  }
  .password-btn-success {
    margin-top: 44px;
    background-color: #38acfd;
  }
}

</style>




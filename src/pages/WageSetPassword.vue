<template>
  <div class="password-second-step">
    <flexbox :gutter="0">
      <flexbox-item style="flex: 0 0 32px;">
        <i class="ui-icon ui-icon-md ui-icon-lock"></i>
      </flexbox-item>
      <flexbox-item>
        <input type="password" v-model="password" @input="checkPassword" placeholder="请输入6～16位含字母及数字的密码" maxlength="16" class="password-true">
    </flexbox>
    <button class="password-btn weui_btn" :class="{'btn-disabled': btnDisabled}" disabled="{{btnDisabled}}" @click="setPassword()">下一步</button>
    <p class="password-instruction">该密码将应用于修改手机，工资单查询等功能</p>
    <toast :show.sync="showToast" type="text" width="90%">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Flexbox, FlexboxItem, Toast } from 'vux-components'

export default {
  name: 'wageSetPassword',
  components: {
    Flexbox,
    FlexboxItem,
    Toast
  },
  data () {
    return {
      telphone: '',
      openId: '',
      compangId: '',
      password: '',
      btnDisabled: true
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('openId', u.openId)
    this.$set('telphone', u.phone)
    this.$set('compangId', u.currentCompanyId)
  },
  methods: {
    checkPassword () {
      const reg = /^([0-9a-zA-Z]){6,16}$/
      reg.test(this.password) ? this.$set('btnDisabled', false) : this.$set('btnDisabled', true)
    },
    setPassword () {
      const that = this
      const reg = /^([0-9a-zA-Z]){6,16}$/
      const flag = reg.test(that.password)
      if (flag) {
        that.$http({
          url: api.setWagePassword,
          params: {
            salaryPassword: that.password,
            phoneNo: that.telphone
          },
          method: 'GET'
        }).then(res => {
          if (res.data.result) {
            that.$router.go('/home/wage/wageSuccess')
          }
        }).catch(err => {
          console.error(err.data)
        })
      }
    }
  }
}
</script>

<style lang="less">
.password-second-step {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 25px 5% 0 5%;

  .vux-flexbox {
    border-bottom: 1px solid #e3e3e3;
    margin-top: 12px;

    .vux-flexbox-item > input {
      color: #5b5b5b;
      border: none;
      padding-top: 10px;
      padding-bottom: 10px;
    
      &::-webkit-input-placeholder {
        color: #abb2b7;
        font-size: 14px;
      }
      &:-moz-placeholder {
        color: #abb2b7;
        font-size: 14px;
      }
      &::-moz-placeholder {
        color: #abb2b7;
        font-size: 14px;
      }
      &:-ms-input-placeholder {
        color: #abb2b7;
        font-size: 14px;
      }
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
    padding: 0;
    margin: 20px auto 0;
    font-size: 14px;
    line-height: 20px;
    color: #BCBCBC;
    text-align: center;
  }
  .password-true {
    width: 100%;
  }
}

</style>
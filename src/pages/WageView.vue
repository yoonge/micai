<template>
  <div class="wageView">
    <div class="wage-poster">
      <img :src="headImg" :alt="telphone">
    </div>
    <p class="wage-title">{{currentCompanyName}}</p>
    <input type="password" class="input-wage" placeholder="请输入查询密码" v-model="password" @input="listenPassword()">
    <button type="button" class="btn-wage weui_btn" :class="{'btn-disabled': btnDisabled}" disabled="{{btnDisabled}}" @click="checkWagePassword()">查询工资</button>
    <!-- <p class="wage-retrieve">找回密码</p> -->
    <a class="wage-set" v-link="'/home/wage/wagePassword'">
      <span class="wage-set-password">没有密码？请设置密码</span>
    </a>
    <toast :show.sync="showToast" type="text">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Toast } from 'vux-components'

export default {
  name: 'WageView',
  components: {
    Toast
  },
  data () {
    return {
      telphone: '',
      openId: '',
      headImg: '',
      password: '',
      cpUserId: '',
      currentCompanyName: '',
      textToast: '密码错误！',
      showToast: false,
      btnDisabled: true
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('openId', u.openId)
    this.$set('telphone', u.phone)
    this.$set('headImg', u.headImg)
    this.$set('cpUserId', u.cpUserId)
    this.$set('currentCompanyName', u.currentCompanyName)
  },
  methods: {
    listenPassword () {
      const passwordLength = this.password.length
      if (passwordLength >= 4) {
        this.$set('btnDisabled', false)
      } else {
        this.$set('btnDisabled', true)
      }
    },
    checkWagePassword () {
      const that = this
      this.$http({
        url: api.checkWagePassword,
        params: {
          cpUserId: that.cpUserId,
          salaryPassword: that.password
        },
        method: 'GET'
      }).then(res => {
        console.log(res.data)
        if (res.data.result) {
          that.$router.go('/home/wage/wageInfo')
        } else {
          that.$set('showToast', true)
        }
      }).catch(err => {
        console.error(err.data)
      })
    }
  }
}
</script>

<style lang="less">
.wageView {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 568px;
  background-color: #fff;
  padding: 44px 10% 0 10%;
  position: relative;

  .wage-poster {
    width: 92px;
    height: 92px;
    border-radius: 50%;
    margin: 0 auto;

    img {
      width: 82px;
      height: 82px;
      border-radius: 50%;
      border: 5px solid #ebebeb;
    }
  }
  .wage-title {
    padding: 0;
    margin: 22px auto 0;
    font-size: 16px;
    line-height: 22px;
    color: #494949;
    text-align: center;
  }
  .input-wage {
    display: block;
    width: 100%;
    height: 44px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #e4e4e4;
    margin: 36px auto 0;

    &::-ms-input-placeholder {
      color: #c3c3c3;
      font-size: 14px;
      text-align: center;
    }
    &::-webkit-input-placeholder {
      color: #c3c3c3;
      font-size: 14px;
      text-align: center;
    }
  }
  .btn-wage {
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
  .wage-retrieve {
    color: #51a5f7;
    font-size: 14px;
    line-height: 21px;
    font-weight: lighter;
    text-align: right;
    margin-top: 12px;
    padding: 0;
  }
  .wage-set {
    color: #51a5f7;
    font-size: 14px;
    font-weight: lighter;
    width: 80%;
    height: 44px;
    line-height: 44px;
    border-radius: 3px;
    border: 1px solid #e4e4e4;
    text-align: center;
    position: absolute;
    bottom: 28px;
  }
}
</style>



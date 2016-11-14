<template>
  <div class="xg-logo-wrapper">
    <img class="xg-logo" src="../assets/logo@2x.png">
  </div>
  <div class="xg-login">
    <group>
      <flexbox :gutter="0">
        <flexbox-item style="flex: 0 0 32px;">
          <i class="ui-icon ui-icon-md ui-icon-phone"></i>
        </flexbox-item>
        <flexbox-item>
          <input type="tel" v-model="telphone" placeholder="请输入手机号" @blur="checkTelphone()">
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0">
        <flexbox-item style="flex: 0 0 32px;">
          <i class="ui-icon ui-icon-md ui-icon-captcha"></i>
        </flexbox-item>
        <flexbox-item>
          <input type="text" v-model="captcha" placeholder="短信验证码" @input="checkCaptcha()"></input>
        </flexbox-item>
        <flexbox-item style="flex: 0 0 91px;">
            <a href="#!" class="btn-link btn-link-disable">获取验证码</a>
        </flexbox-item>
      </flexbox>
      <x-button class="btn-login" disabled>登录</x-button>
    </group>
    <toast :show.sync="show1" :time="3000" type="text" width="12em">{{text1}}</toast>
  </div>
</template>

<script>
import $ from 'webpack-zepto'
import { Group, Cell, Flexbox, FlexboxItem, XInput, XButton, Toast } from 'vux-components'

export default {
  components: {
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    XInput,
    XButton,
    Toast
  },
  data () {
    return {
      telphone: '',
      captcha: '',
      show1: false,
      text1: ''
    }
  },
  methods: {
    checkTelphone () {
      let p = this.telphone
      if (!(/^1[34578]\d{9}$/.test(p))) {
        this.text1 = '您填写的手机格式有误！'
        this.show1 = true
        return false
      }
    },
    checkCaptcha () {
      let c = this.captcha.length
      if (!(c === 4)) {
        this.text1 = '您输入的验证码有误！'
        this.show1 = true
        return false
      } else {
        $('button.btn-login').removeClass('weui_btn_disabled').removeClass('weui_btn_default').addClass('weui_btn_primary')
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

.xg-logo-wrapper {
  text-align: center;
}

.xg-login {
  padding-left: 32px;
  padding-right: 32px;
  .vux-flexbox {
    border-bottom: 1px solid #e3e3e3;
    .vux-flexbox-item > input {
      border: none;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .btn-link {
    color: #51a5f7;
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
  .weui_toast {
    border-radius: 2px;
    background-color: rgba(0, 0, 0, .67);
    top: 160px;
    .weui_toast_content {
      color: rgba(255, 255, 255, .8);
      font-size: 14px;
      padding-top: 6px;
      padding-bottom: 6px;
    }
  }
}

.xg-logo {
  width: 132px;
  margin-top: 30px;
}

.weui_cells:before {
  border-top-width: 0 !important;
}
</style>
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
          <x-input is-type="china-mobile" placeholder="请输入手机号"></x-input>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0">
        <flexbox-item style="flex: 0 0 32px;">
          <i class="ui-icon ui-icon-md ui-icon-captcha"></i>
        </flexbox-item>
        <flexbox-item>
          <x-input :min="4" :max="4" placeholder="短信验证码"></x-input>
        </flexbox-item>
        <flexbox-item style="flex: 0 0 91px;">
            <a href="#!" class="btn-link">获取验证码</a>
        </flexbox-item>
      </flexbox>
      <x-button disabled>登录</x-button>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Flexbox, FlexboxItem, XInput, XButton, Icon } from 'vux-components'

export default {
  components: {
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    XInput,
    XButton,
    Icon
  },
  data () {
    return {
      captcha: ''
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
  }
  .weui_cell {
    padding-left: 0;
    padding-right: 0;
  }
  .btn-link {
    color: #51a5f7;
  }
  .weui_btn:after {
    border: none;
  }
  .weui_btn_disabled.weui_btn_default {
    color: #fff;
    border-radius: 2px;
    background-color: #e3e3e3;
    margin-top: 24px;
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
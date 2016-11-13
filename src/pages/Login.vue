<template>
  <div class="vux-demo">
    <img class="logo" src="../assets/logo@2x.png">
  </div>
  <div class="form-login">
    <group>
      <flexbox :gutter="0">
        <flexbox-item style="flex: 0 0 20px;">
          <icon type="search"></icon>
        </flexbox-item>
        <flexbox-item>
          <x-input keyboard="number" is-type="china-mobile" placeholder="请输入手机号"></x-input>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0">
        <flexbox-item style="flex: 0 0 20px;">
          <icon type="search"></icon>
        </flexbox-item>
        <flexbox-item><x-input :min="4" :max="5" placeholder="短信验证码"></x-input></flexbox-item>
        <flexbox-item style="flex: 0 0 91px;">
            <x-button mini>获取验证码</x-button>
        </flexbox-item>
      </flexbox>
      <x-button class="btn-login" disabled>登录</x-button>
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

.vux-demo {
  text-align: center;
}

.form-login {
  padding-left: 32px;
  padding-right: 32px;
  & .weui_cell {
    padding-left: 0;
    padding-right: 0;
  }
}

.logo {
  width: 132px;
  margin-top: 30px;
}

.btn-login {
  margin-top: 24px;
}

.weui_cells:before {
  border-top-width: 0 !important;
}
</style>
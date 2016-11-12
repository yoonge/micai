<template>
  <div class="vux-demo">
    <img class="logo" src="../assets/logo@2x.png">
  </div>
  <div class="form-wrapper">
    <group>
      <x-input keyboard="number" is-type="china-mobile" placeholder="请输入手机号"></x-input>
      <flexbox :gutter="0">
        <flexbox-item><x-input :min="4" :max="5" placeholder="短信验证码"></x-input></flexbox-item>
        <flexbox-item :span="2/5" style="text-align: right;"><x-button mini>获取验证码</x-button></flexbox-item>
      </flexbox>
      <x-button class="btn-login" disabled>登录</x-button>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Flexbox, FlexboxItem, XInput, XButton } from 'vux-components'

export default {
  components: {
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    XInput,
    XButton
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

.form-wrapper {
  padding-left: 25px;
  padding-right: 25px;
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
<template>
  <div class="user">
    <sticky scroll-box="vux_view_box_body">
      <tab :line-width="1" class="user-header">
        <tab-item selected v-link="'/home/user/userInfo'">个人信息</tab-item>
        <tab-item v-link="'/home/user/userWork'">工作经历</tab-item>
        <tab-item v-link="'/home/user/userEducation'">教育信息</tab-item>
        <tab-item v-link="'/home/user/userSocial'">社会关系</tab-item>
      </tab>
    </sticky>
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
import { Tab, TabItem, Sticky, Datetime, Group, XButton, XInput, PopupPicker } from 'vux-components'

export default {
  name: 'User',
  components: {
    Tab,
    TabItem,
    Sticky,
    PopupPicker,
    Group,
    Datetime,
    XButton,
    XInput
  }
}
</script>

<style lang="less">
.weui_input {
  text-align: right;
}
.vux-tab .vux-tab-item.vux-tab-selected {
  color: #2aabfd!important;
}
.vux-tab-ink-bar-transition-forward {
  background-color: #2aabfd!important;
  height: 2px!important;
  bottom: -1px;
}
.vux-tab-ink-bar-transition-backward {
  background-color: #2aabfd!important;
  height: 2px!important;
  bottom: -1px;
}
.vux-tab {
  height: 40px;
}
.vux-tab .vux-tab-item {
  line-height: 40px;
}
.user {
  width: 100%;
  height: 100%;

  .user-header {
    box-shadow: 0px 2px 2px rgba(0,0,0,0.06);
  }
}
</style>

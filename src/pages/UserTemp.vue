<template>
  <div class="user">
    <div class="user-header">
      <tab :line-width="2" :animate="false">
        <tab-item v-link="{ path: '/home/userTemp/userInfoTemp', activeClass: 'vux-tab-selected' }">个人信息</tab-item>
        <tab-item v-link="{ path: '/home/userTemp/userWorkTemp', activeClass: 'vux-tab-selected' }">工作经历</tab-item>
        <tab-item v-link="{ path: '/home/userTemp/userEducationTemp', activeClass: 'vux-tab-selected' }">教育信息</tab-item>
        <tab-item v-link="{ path: '/home/userTemp/userSocialTemp', activeClass: 'vux-tab-selected' }">社会关系</tab-item>
      </tab>
    </div>
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
import { Tab, TabItem, Datetime, Group, XButton, XInput, PopupPicker } from 'vux-components'

export default {
  name: 'User',
  components: {
    Tab,
    TabItem,
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
.user {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  background-color: #eff4f7;

  .weui_btn {
    margin-top: 0;
  }
  .weui_btn:after {
    border: none;
    border-radius: 2px;
  }
  .weui_btn_default {
    color: #fff;
    border-radius: 2px;
    background-color: #38acfd;

    &.btn-disabled {
      background-color: #dcdcdc;
    }
  }

  .user-header {
    width: 100%;
    height: 40px;
    box-shadow: 0px 2px 2px rgba(0,0,0,0.06);

    .vux-tab {
      height: 40px;

      .vux-tab-item {
        color: #666!important;
        line-height: 40px;

        &.vux-tab-selected {
          color: #2aabfd!important;
          border-color: #2aabfd!important;
        }
      }
    }
  }
  .btn-wrapper {
    margin-top: 16px;

    .btn-add-work-exp {
      color: #fff;
      display: block;
      width: 100%;
      height: 42px;
      line-height: 42px;
      text-align: center;
      border-radius: 2px;
      background-color: #38acfd;
    }
  }
  .btn-wrapper-fixed {
    box-sizing: border-box;
    width: 100%;
    height: 67px;
    border-top: 1px solid #f7f7f7;
    background-color: #fff;
    padding: 12px 18px;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>

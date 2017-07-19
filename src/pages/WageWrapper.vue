<template>
  <div class="wage-wrapper">
    <sticky class="wage-header">
      <tab :line-width="2" :animate="false">
        <tab-item v-link="{ path: '/home/wage/wageWrapper/wageMonthly', activeClass: 'vux-tab-selected' }">月工资</tab-item>
        <tab-item v-link="{ path: '/home/wage/wageWrapper/wageWeekly', activeClass: 'vux-tab-selected' }">周工资</tab-item>
        <tab-item v-link="{ path: '/home/wage/wageWrapper/wageDaily', activeClass: 'vux-tab-selected' }">日工资</tab-item>
      </tab>
    </sticky>
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
import { Sticky, Tab, TabItem } from 'vux-components'

export default {
  name: 'wageWrapper',
  components: {
    Sticky,
    Tab,
    TabItem
  }
}
</script>

<style lang="less">
.wage-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #eff4f7;
  padding-top: 42px;
  position: relative;

  .wage-header {
    width: 100%;
    height: 40px;
    border-bottom: 2px solid #fff;
    position: fixed!important;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;

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
  .weui_btn {
    font-size: 16px;
    font-weight: normal;
    width: 108px;
    line-height: 2em;
    text-align: center;
  }
}
</style>

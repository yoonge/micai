<template>
  <div class="wage">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
import { Tab, TabItem } from 'vux-components'

export default {
  name: 'Wage',
  components: {
    Tab,
    TabItem
  }
}
</script>

<style lang="less">
.wage {
  width: 100%;
  height: 100%;

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
      background-color: #dcdcdc !important;
    }
  }
  .btn-wrapper {
    box-sizing: border-box;
    width: 100%;
    padding: 16px;

    .btn-loan {
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
}
</style>

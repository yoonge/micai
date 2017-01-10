<template>
  <div class="app">
    <router-view
      transition="slide"
      transition-mode="out-in"> 
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'App'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset';
@import 'styles/reset';
@import 'styles/icon';
@import 'styles/orgchart.css';

.app {
  width: 100%;
  height: 100%;
}

.weui_cells:before {
  border-top-width: 0;
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

.weui_btn_primary {
  color: #fff;
  background-color: #51a5f7;

  &:not(.weui_btn_disabled):active {
    background-color: #51a5f7;
  }
}

.weui_toast {
  border-radius: 2px;
  background-color: rgba(0, 0, 0, .67);
  top: 160px;

  .weui_toast_content {
    color: rgba(255, 255, 255, .8);
    font-size: 14px;
    padding: 6px 8px;
  }
}
</style>
<template>
  <div class="approval">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'Approval'
}
</script>

<style lang="less">
.approval {
  width: 100%;
  height: 100%;
  position: relative;

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
}
</style>
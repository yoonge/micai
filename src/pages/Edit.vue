<template>
  <div class="edit">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'Edit'
}
</script>

<style lang="less">
.edit {
  width: 100%;
  height: 100%;
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
  }
  .btn-wrapper {
    box-sizing: border-box;
    width: 100%;
    background-color: #eff4f7;
    padding: 16px;

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
}
</style>

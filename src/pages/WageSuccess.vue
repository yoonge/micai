<template>
  <div class="password-third-step">
    <div class="password-ok">
      <img src="../assets/img/iconfont-ensure.png">
    </div>
    <p class="password-success">密码设置成功</p>
    <button class="password-btn weui_btn password-btn-success" v-link="'/home/wage/wageInfo'">进入工资单查询</button>
  </div>
</template>

<style lang="less">
.password-third-step {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 25px 5% 0 5%;
  
  .password-ok {
    height: 54px;
    text-align: center;
    margin: 20px auto;

    img {
      width: 51px;
      height: 54px;
    }
  }

  .password-success {
    color: #5b5b5b;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
  }

  .password-btn-success {
    margin-top: 44px;
    background-color: #38acfd;
  }
}
</style>
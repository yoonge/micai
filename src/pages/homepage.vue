<template>
  <div class="xg-homepage">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="xg-avatar-wrapper">
      <div class="xg-avatar">
        <img src="../assets/img/avatar-default@2x.png" alt="Avatar">
      </div>
      <ul class="xg-info">
        <li class="xg-info-mobile">186****4958</li>
        <li class="xg-info-corp">星河信果科技信息有限公司</li>
        <li class="xg-info-title">产品经理</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Loading } from 'vux-components'

export default {
  name: 'Homepage',
  components: {
    Loading
  },
  data () {
    return {
      telphone: '',
      smsCode: '',
      captcha: '',
      textToast: '',
      showToast: false,
      textLink: '获取验证码',
      linkDisable: true,
      btnDisabled: true,
      showCaptcha: false,
      loading: false,
      textLoading: '登录中...'
    }
  }
}
</script>

<style lang="less">
.xg-homepage {
  width: 100%;
  height: 100%;
  min-height: 568px;
  background-image: url('../assets/img/homepage-bg@2x.png');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
}

.xg-avatar-wrapper {
  width: 188px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 36px;

  .xg-avatar {
    width: 104px;
    height: 104px;
    border-radius: 55px;
    border: 6px solid #9dcbff;
    background-color: #fff;
    background-image: url(../assets/img/avatar-default@2x.png);
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 106px 106px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;

    > img {
      width: 104px;
    }
  }
  .xg-info {
    color: #fff;
    text-align: center;
    padding: 12px;

    > li {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.xg-info-mobile {
        font-size: 19px;
      }
      &.xg-info-corp {
        color: rgba(255, 255, 255, .8);
        font-size: 16px;
      }
      &.xg-info-title {
        color: rgba(255, 255, 255, .8);
        font-size: 14px;
      }
    }
  }
}
</style>
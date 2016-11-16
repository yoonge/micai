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
    <div class="xg-section">
      <dl class="xg-manpower-map">
        <dd><a href="#!"><img src="../assets/img/manpower-map@2x.png" alt="人力地图"></a></dd>
        <dt>人力地图</dt>
        <dd>拉近公司员工关系，增强沟通效率，让日常工作变的事半功倍</dd>
      </dl>
    </div>
    <div class="xg-section">
      <dl class="xg-manpower-map">
        <dd><a href="#!"><img src="../assets/img/manpower-map@2x.png" alt="人力地图"></a></dd>
        <dt>人力地图</dt>
        <dd>拉近公司员工关系，增强沟通效率，让日常工作变的事半功倍</dd>
      </dl>
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
@import '~vux/src/styles/reset';
@import '../styles/reset';
@import '../styles/icon';

// body {
//   background-color: rgb(104, 206, 255);
//   background-image: url('../assets/img/homepage-bg@2x.png');
//   background-position: center top;
//   background-size: 100% 100%;
// }

.xg-homepage {
  box-sizing: border-box;
  padding-right: 32px;
  padding-bottom: 48px;
  padding-left: 32px;

  .xg-section {
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 2px 2px 7px 1px rgba(0, 0, 0, .2);
    margin-top: 12px;
    padding: 12px 12px 24px;

    & + .xg-section {
      margin-top: 48px;
    }

    .xg-manpower-map {
      color: #626262;
      font-size: 12px;
      width: 100%;
      text-align: center;
      box-sizing: border-box;

      dt {
        font-size: 17px;
        font-weight: bold;
        margin-top: 3px;
        margin-bottom: 3px;
      }
      dd:first-child > a > img {
        width: 100%;
      }
      dd:last-child {
        padding-right: 24px;
        padding-left: 24px;
      }
    }
  }
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
    margin-right: auto;
    margin-left: auto;

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
<template>
  <div class ="noticeInfo">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="notice-info-main" v-show="result">
      <div class="notice-main-title">
        <span class="notice-title-bg"></span>
        <div class="notice-title-group">
          <p class="notice-title-name">{{ info.title }}</p>
          <p class="notice-title-date">{{ info.releaseTime }}</p>
        </div>
      </div>
      <div class="notice-main-message">
        <div class="notice-main-content">
          <i class="notice-content-bg"></i>
          <p>{{ info.content }}</p>
        </div>
      </div>
    </div>
    <h3 class="none" v-show="none">请求失败，请检查您的网络状态。</h3>
  </div>
</template>

<script>
import * as api from 'src/api.js'
import { Loading } from 'vux-components'

export default {
  name: 'NoticeView',
  components: {
    Loading
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      info: {},
      cpUserId: '',
      noticeId: '',
      result: false,
      none: false
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('cpUserId', u.cpUserId)
    let a = this.$route.params
    this.$set('noticeId', a.noticeId)
    this.getNoticeInfo()
  },
  methods: {
    getNoticeInfo () {
      const that = this
      that.$http({
        url: api.getNoticeInfo,
        params: {
          cpUserId: that.cpUserId,
          noticeId: that.noticeId
        },
        method: 'GET'
      }).then(res => {
        if (res.data.result) {
          that.$set('info', res.data.noticeDetail)
          that.$set('result', true)
        } else {
          that.$set('none', true)
        }
        that.$set('loading', false)
      })
    }
  }
}
</script>

<style lang="less">
.noticeInfo{
  width: 100%;
  height: 100%;
  background-color: #EEF3F6;

  .notice-info-main{
    width: 100%;
    background-color: #fff;

    .notice-main-title{
      display: flex;
      width: 100%;
      height: 72px;
      padding-left: 4%;
      background-color: #fff;
      border-bottom: 1px solid #DEDEDE;

      .notice-title-bg{
        display: inline-block;
        width: 58px;
        height: 72px;
        background: url(../assets/img/notice.png) 0 center no-repeat;
        background-size: 42px 42px;
      }

      .notice-title-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        
        p{
          padding: 0;
        }
        .notice-title-name {
          font-size: 18px;
          line-height: 24px;
          color: #4F4F4F;
        }
        .notice-title-date {
          color: #bcbcbc;
          font-size: 14px;
          line-height: 20px;
          font-weight: 300;
        }
      }
    }

    .notice-main-message{
      padding-left: 12%;
      padding-top: 18px;
      border-bottom: 1px solid #dedede;

      .notice-main-content{
        width: 100%;
        position: relative;
        padding-bottom: 24px;
        padding-right: 4%;
        
        .notice-content-bg{
          position: absolute;
          top: 0;
          left: -30px;
          width: 18px;
          height: 18px;
          background: url(../assets/img/notice-content.png) no-repeat;
          background-size: 18px 18px;
        }
        p{
          padding: 0;
          font-size: 14px;
          line-height: 20px;
          color: #4B4B4B;
        }
      }

      .notice-main-date{
        position: relative;
        width: 100%;
        height: 44px;
        line-height: 44px;
        
        .notice-date-bg{
          position: absolute;
          top: 50%;
          left: -30px;
          margin-top: -9px;
          width: 18px;
          height: 18px;
          background: url(../assets/img/notice-date.png) no-repeat;
          background-size: 18px 18px;
        }

        p{
          padding: 0;
          font-size: 14px;
          color: #4B4B4B;
        }
      }
    }
  }
}
</style>
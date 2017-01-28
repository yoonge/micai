<template>
  <div class ="noticeInfo">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="notice-info-main" v-show="result">
      <table class="notice-header">
        <tbody>
          <tr>
            <th rowspan="2" valign="top" class="notice-title-icon"><span class="notice-title-bg"></span></th>
            <td class="notice-title-name">{{ info.title }}</td>
          </tr>
          <tr>
            <td class="notice-title-date">{{ info.releaseTime }}</td>
          </tr>
        </tbody>
      </table>
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
.notice-title-bg {
  display: inline-block;
  width: 42px;
  height: 44px;
  background: url(../assets/img/notice.png) center center no-repeat;
  background-size: 42px 44px;
}

.notice-header {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #dedede;

  .notice-title-icon {
    width: 42px;
    padding: 16px 12px;
  }
  .notice-title-name {
    height: 25px;
    padding-top: 14px;
    padding-right: 12px;
  }
  .notice-title-date {
    color: #bcbcbc;
    font-size: 14px;
    padding-bottom: 12px;
  }
}

.noticeInfo {
  width: 100%;
  height: 100%;
  background-color: #eef3f6;

  .notice-info-main {
    width: 100%;
    background-color: #fff;

    .notice-main-message {
      padding-left: 12%;
      padding-top: 18px;
      border-bottom: 1px solid #dedede;

      .notice-main-content {
        box-sizing: border-box;
        width: 100%;
        position: relative;
        padding-bottom: 24px;
        padding-right: 12px;
        
        .notice-content-bg {
          position: absolute;
          top: 0;
          left: -30px;
          width: 18px;
          height: 18px;
          background: url(../assets/img/notice-content.png) no-repeat;
          background-size: 18px 18px;
        }
        p {
          padding: 0;
          font-size: 14px;
          line-height: 20px;
          color: #4b4b4b;
        }
      }

      .notice-main-date{
        position: relative;
        width: 100%;
        height: 44px;
        line-height: 44px;
        
        .notice-date-bg {
          width: 18px;
          height: 18px;
          background: url(../assets/img/notice-date.png) no-repeat;
          background-size: 18px 18px;
          margin-top: -9px;
          position: absolute;
          top: 50%;
          left: -30px;
        }

        p {
          padding: 0;
          font-size: 14px;
          color: #4b4b4b;
        }
      }
    }
  }
}
</style>
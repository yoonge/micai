<template>
  <div class="noticeView">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="notice-border" v-show="result">
      <template v-for="item in info">
        <div class="notice-list" :class="{'notice-noread':item.status}" v-link="{name: 'home.notice.info', params: { cpUserId: cpUserId, noticeId: item.id }}">
          <span class="notice-name">{{item.title}}</span>
          <span class="notice-arrow">&nbsp;</span>
          <span class="notice-date">{{item.releaseTime}}</span>
        </div>
      </template>
    </div>
    <div class="notice-nobody" v-show="none">
      <img src="../assets/img/notice-no.png">
      <p>还没有通知</p>
    </div>
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
      float: true,
      cpUserId: '',
      result: false,
      none: false
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('cpUserId', u.cpUserId)
    this.fetchNoticeList()
  },
  methods: {
    fetchNoticeList () {
      const that = this
      that.$http({
        url: api.getNoticeList,
        params: {
          cpUserId: that.cpUserId
        },
        method: 'GET'
      }).then(res => {
        let temporary = res.data.noticeList
        if (res.data.result && temporary.length > 0) {
          for (let i = 0; i < temporary.length; i++) {
            if (temporary[i].status === '1') {
              temporary[i].status = false
            }
            if (temporary[i].status === '0') {
              temporary[i].status = true
            }
          }
          that.$set('info', temporary)
          that.$set('result', true)
        } else {
          that.$set('none', true)
        }
        that.$set('loading', false)
      }).catch(err => {
        console.error(err.data)
      })
    }
  }
}
</script>

<style lang="less">
.noticeView {
  width: 100%;
  min-height: 100%;
  background-color: #eef3f6;
  padding-top: 10px;
  
  .notice-nobody {
    text-align: center;
    padding-top: 170px;

    img {
      width: 120px;
      height: 168px;
    }

    p {
      color: #b1b6b8;
      font-size: 18px;
      line-height: 25px;
    }
  }
  
  .notice-border {
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #dedede;

    .notice-list {
      width: 100%;
      height: 46px;
      line-height: 46px;
      border-bottom: 1px solid #dedede;

      .notice-name {
        font-size: 15px;
        color: #4F4F4F;
        float: left;
        width: 196px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 30px;
      }

      .notice-date {
        float: right;
        font-size: 14px;
        color: #bcbcbc;
        margin-right: 30px;
      }

      .notice-arrow {
        float: right;
        display: inline-block;
        width: 8px;
        height: 46px;
        background: url(../assets/img/go.png) center no-repeat;
        background-size: 8px 16px;
        margin-right: 16px;
      }
    }
  }
}
.notice-noread {
  background: url('../assets/img/notice-noread.png') no-repeat;
  background-position: 15px center;
  background-size: 6px 6px;
}
</style>
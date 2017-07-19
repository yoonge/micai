<template>
  <div class="approval-view">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="approval-list">
      <ul class="clearfix">
        <li><a v-link="'#!'" class="approval-item-1">我的申请</a></li>
        <li><a v-link="'#!'" class="approval-item-2">我的审批</a></li>
      </ul>
    </div>
    <div class="attendance-list">
      <h3>日常事务</h3>
      <flexbox :gutter="0">
        <flexbox-item class="attendance-item">
          <a class="attendance-item-1" v-link="'/home/attendance/attendanceVacate'">
            <i class="ui-icon ui-icon-xlg ui-icon-xlg-1"></i>
          </a>
          <p>请假申请</p>
        </flexbox-item>
        <flexbox-item class="attendance-item">
          <a class="attendance-item-2" v-link="'/home/attendance/attendanceOvertime'">
            <i class="ui-icon ui-icon-xlg ui-icon-xlg-2"></i>
          </a>
          <p>加班申请</p>
        </flexbox-item>
        <flexbox-item class="attendance-item">
          <a class="attendance-item-3" v-link="'/home/attendance/attendanceRepunch'">
            <i class="ui-icon ui-icon-xlg ui-icon-xlg-3"></i>
          </a>
          <p>补卡申请</p>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0">
        <flexbox-item class="attendance-item">
          <a class="attendance-item-4" v-link="'/home/attendance/attendanceBusinessTrip'">
            <i class="ui-icon ui-icon-xlg ui-icon-xlg-4"></i>
          </a>
          <p>出差申请</p>
        </flexbox-item>
        <flexbox-item class="attendance-item">
          <a class="attendance-item-5" v-link="'/home/attendance/attendanceOfficialBusinessTrip'">
            <i class="ui-icon ui-icon-xlg ui-icon-xlg-5"></i>
          </a>
          <p>公出申请</p>
        </flexbox-item>
        <flexbox-item class="attendance-item">
          <a class="attendance-item-6" v-link="'/home/system'">
            <i class="ui-icon ui-icon-xlg ui-icon-xlg-6"></i>
          </a>
          <p>出勤统计</p>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script lang="babel">
// import $ from 'jquery'
// import * as api from 'src/api.js'
import { Flexbox, FlexboxItem, Loading, XButton } from 'vux-components'

export default {
  name: 'ApprovalView',
  components: {
    Flexbox,
    FlexboxItem,
    Loading,
    XButton
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...'
      // telphone: '',
      // openId: '',
      // headImg: '',
      // homepageInfo: {},
      // cpUserId: '',
      // noticeNoRead: false
    }
  },
  ready () {
    this.$set('loading', false)
  }
}
</script>

<style lang="less">
.approval-view {
  background-color: #eef3f6;

  .approval-list {
    background-color: #fff;
    padding: 24px 0;
    position: relative;

    &:after {
      color: #d9d9d9;
      content: " ";
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #d9d9d9;
      position: absolute;
      left: 0;
      bottom: 0;
      transform-origin: 0 100%;
      transform: scaleY(0.5);
    }

    ul li {
      box-sizing: border-box;
      float: left;
      width: 50%;
      text-align: center;

      a {
        color: #4e4d4d;
        font-size: 15px;
        display: inline-block;
        width: 100%;
        background-color: transparent;
        background-repeat: no-repeat;
        background-position: center top;
        background-size: 72px 72px;
        padding-top: 80px;

        &.approval-item-1 {
          border-right: 1px solid #d9d9d9;
          background-image: url(../assets/img/ui-icon-xxlg-1@2x.png);
        }
        &.approval-item-2 {
          background-image: url(../assets/img/ui-icon-xxlg-2@2x.png);
        }
      }
    }
  }
}
.attendance-list {
  width: 100%;
  background-color: #fff;
  margin-top: 12px;
  padding-bottom: 32px;

  > h3 {
    color: #7d7d7d;
    font-size: 16px;
    font-weight: normal;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #f3f3f3;
    padding-left: 18px;
  }
}
.attendance-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 32px;
  
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  > p {
    color: #7d7d7d;
    font-size: 14px;
    line-height: 20px;
    padding-top: 12px;
  }
}
.xg-item-human-map {
  background: linear-gradient(top, #01a3ff 0%, #03d0ff 100%);
  box-shadow: 0px 0px 4px #02a8ff;
}
.xg-item-address-book {
  background: linear-gradient(top, #ffa52f 0%, #ffcc56 100%);
  box-shadow: 0px 0px 4px #ffa932;
}
.xg-item-enterprise-system {
  background: linear-gradient(top, #2fd1cf 0%, #66e8e5 100%);
  box-shadow: 0px 0px 4px #35d4d2;
}
.xg-item-article-wages {
  background: linear-gradient(top, #288ff4 0%, #71aafb 100%);
  box-shadow: 0px 0px 4px #bfd9f3;
}
.xg-item-attendance {
  background: linear-gradient(top, #ff6e46 0%, #ff8f7c 100%);
  box-shadow: 0px 0px 4px #ff714b;
}
.xg-item-approval {
  background: linear-gradient(top, #288ff4 0%, #71aafb 100%);
  box-shadow: 0px 0px 4px #bfd9f3;
}
</style>





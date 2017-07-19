<template>
  <div class="attendance-view">
    <loading :show="loading" :text="textLoading"></loading>
    <header class="attendance-header">
      <flexbox :gutter="0">
        <flexbox-item :span="7" class="attendance-weather">
          <dl>
            <dt>19℃</dt>
            <dd>海淀区</dd>
            <dd>晴转多云</dd>
          </dl>
        </flexbox-item>
        <flexbox-item :span="5" class="attendance-date">
          <dl>
            <dt>星期五</dt>
            <dd>2017年4月21日</dd>
          </dl> 
        </flexbox-item>
      </flexbox>
    </header>
    <div class="punch-item punch-on-duty">
      <dl class="pull-right">
        <dt>上班 09:00 <span class="text-primary">已签</span></dt>
        <dd><x-button class="btn-disabled">签到</x-button></dd>
      </dl>
    </div>
    <div class="punch-item punch-off-duty">
      <dl class="pull-right">
        <dt>下班 18:00 <span>未签</span></dt>
        <dd><x-button>签退</x-button></dd>
      </dl>
    </div>
    <div class="punch-item punch-off-duty">
      <dl class="pull-right">
        <dt>下班 18:00 <span class="text-warning">早退</span></dt>
        <dd><x-button class="btn-disabled">签退</x-button></dd>
      </dl>
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
  name: 'AttendanceView',
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
.attendance-view {
  background-color: #eef3f6;

  .attendance-header {
    box-sizing: border-box;
    color: #fff;
    width: 100%;
    height: 120px;
    background-color: transparent;
    background-image: url(~assets/img/weather-bg@2x.png);
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 100% 100%;
    padding-top: 18px;

    .attendance-weather {
      box-sizing: border-box;
      font-weight: lighter;
      padding-left: 30px;

      dt {
        font-size: 48px;
        float: left;
        padding-right: 6px;
      }
      dd {
        font-size: 14px;
        padding-top: 17px;

        + dd {
          padding-top: 0;
        }
      }
    }
    .attendance-date {
      box-sizing: border-box;
      font-weight: lighter;
      text-align: right;
      padding-right: 32px;

      dt {
        font-size: 26px;
      }
      dd {
        font-size: 12px;
      }
    }
  }
  .punch-item {
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: 40px center;
    background-size: 70px 70px;
    margin-top: 12px;
    padding-right: 48px;

    &.punch-on-duty {
      background-image: url(~assets/img/on-duty@2x.png);
    }
    &.punch-off-duty {
      background-image: url(~assets/img/off-duty@2x.png);
    }

    dl {
      padding-top: 18px;

      dt {
        color: #7d7d7d;
        font-size: 14px;

        > span {
          color: #fff;
          font-size: 12px;
          display: inline-block;
          width: 36px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 8px;
          background-color: #c8cfd4;
          vertical-align: 1px;
          margin-left: 4px;

          &.text-warning {
            background-color: #ff8732;
          }
          &.text-primary {
            background-color: #38acfd;
          }
        }
      }

      .weui_btn {
        font-size: 16px;
        width: 112px;
        height: 32px;
        line-height: 32px;
        margin-top: 8px;
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





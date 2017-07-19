<template>
  <div class="wage-daily">
    <loading :show="loading" :text="textLoading"></loading>
    <inline-calendar
      :value.sync="today"
      :hide-header="true"
      :disable-future="true"
      :weeks-list="weeksList"
      :show-last-month="false"
      :show-next-month="false">
    </inline-calendar>
    <div class="wage-status">
      <dl class="wage-status-late clearfix" v-if="late">
        <dd class="wage-status-item-1">{{status}}</dd>
        <dd class="wage-status-item-2">{{statusText}}</dd>
        <dt>{{dailyWage}}</dt>
      </dl>
      <dl class="wage-status-vacate clearfix" v-if="vacate">
        <dd class="wage-status-item-1">{{status}}</dd>
        <dd class="wage-status-item-2">{{statusText}}</dd>
        <dt>{{dailyWage}}</dt>
      </dl>
      <dl class="clearfix" v-if="normal">
        <dd class="wage-status-item-1">{{status}}</dd>
        <dd class="wage-status-item-2">{{statusText}}</dd>
        <dt>{{dailyWage}}</dt>
      </dl>
    </div>
    <div class="btn-wrapper">
      <x-button class="btn-loan" :class="{'btn-disabled': btnDisabled}" :disabled="btnDisabled">预贷</x-button>
    </div>
  </div>  
</template>

<script>
import $ from 'jquery'
import * as api from 'src/api.js'
import { Loading, Group, InlineCalendar, XButton } from 'vux-components'

export default {
  name: 'WageDaily',
  components: {
    Loading,
    Group,
    InlineCalendar,
    XButton
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      openId: '',
      cpUserId: '',
      companyId: '',
      companyName: '',
      today: 'TODAY',
      weeksList: ['日', '一', '二', '三', '四', '五', '六'],
      statusCode: '',
      statusType: '',
      dailyWage: '',
      status: '',
      statusText: '',
      normal: false,
      late: false,
      vacate: false,
      btnDisabled: true
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('openId', u.openId)
    this.$set('cpUserId', u.cpUserId)
    this.$set('companyId', u.currentCompanyId)
    this.$set('companyName', u.currentCompanyName)
  },
  methods: {
    getDailySalary () {
      const that = this
      this.$set('loading', true)
      this.$set('btnDisabled', true)
      this.$http({
        url: api.getAttendanceStatus,
        params: {
          day: that.today,
          userId: that.cpUserId,
          companyId: that.companyId
        },
        method: 'GET'
      }).then(res => {
        console.log(JSON.stringify(res.data))
        this.$set('normal', false)
        this.$set('late', false)
        this.$set('vacate', false)
        if (res.data.status) {
          that.$set('statusCode', res.data.status)
          that.$set('statusType', res.data.type)
          console.log($.type(res.data.value))
          that.$set('dailyWage', res.data.value + ' 元')
          that.fixStatus()
          if (res.data.value > 0) that.$set('btnDisabled', false)
        }
        that.$set('loading', false)
      }).catch(res => {
        console.error(res.data)
      })
    },
    fixStatus (oData) {
      switch (this.statusCode) {
        case '00':
          this.$set('normal', true)
          this.$set('status', '正常')
          this.$set('statusText', '正常上班')
          break
        case '01':
          this.$set('late', true)
          this.$set('status', '迟到')
          this.$set('statusText', this.statusType)
          break
        case '02':
          this.$set('late', true)
          this.$set('status', '早退')
          this.$set('statusText', this.statusType)
          break
        case '03':
          this.$set('vacate', true)
          this.$set('status', '缺勤')
          this.$set('statusText', '缺勤一天')
          break
        case '05':
          this.$set('normal', true)
          this.$set('status', '公出')
          this.$set('statusText', '公出')
          break
        case '06':
          this.$set('normal', true)
          this.$set('status', '加班')
          this.$set('statusText', '加班')
          break
        case '07':
          this.$set('vacate', true)
          this.$set('status', '请假')
          this.$set('statusText', '请假一天')
          break
        case '08':
          this.$set('normal', true)
          this.$set('status', '缺卡')
          this.$set('statusText', '忘记打卡')
          break
      }
    }
  },
  watch: {
    today: function () {
      this.getDailySalary()
    }
  }
}
</script>

<style lang="less">
.wage-daily {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  background-color: #fff;

  .inline-calendar {
    border-bottom: 1px solid #f3f3f3;
    padding-top: 6px;
    padding-bottom: 6px;

    th.week {
      color: #bcbcbc;
      font-size: 14px;
      font-weight: normal;
    }
    td {
      font-size: 14px;

      &.is-today {
        color: #2aabfd;
      }
      &.current > span {
        color: #fff;
        background-color: #2aabfd;
      }
    }
  }
  .wage-status {
    font-size: 14px;
    padding-left: 40px;
    padding-right: 30px;

    dl {
      line-height: 40px;
      border-left: 1px solid #f3f3f3;
      padding-bottom: 32px;

      &:first-child {
        padding-top: 32px;
      }
      dd {
        font-weight: normal;
        float: left;

        &.wage-status-item-1 {
          color: #fff;
          display: inline-block;
          width: 40px;
          height: 40px;
          text-align: center;
          border-radius: 20px;
          background-color: #2aabfd;
          margin-left: -20px;
          margin-right: 16px;
        }
      }
      dt {
        color: #2aabfd;
        font-weight: normal;
        float: right;
      }
      &.wage-status-late {

        dd.wage-status-item-1 {
          background-color: #f6a623;
        }
        dt {
          color: #f6a623;
        }
      }
      &.wage-status-vacate {

        dd.wage-status-item-1 {
          background-color: #d0011b;
        }
        dt {
          color: #d0011b;
        }
      }
    }
  }
}
</style>


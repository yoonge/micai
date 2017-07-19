<template>
  <div class="wage-weekly">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="weekly-wrapper">
      <dl class="weekly-item" v-for="w in weeklyWage">
        <dt>{{year}} 年 {{month}} 月{{w.name}}</dt>
        <dd class="clearfix">
          <span class="pull-left">{{w.money}} 元</span>
          <span class="pull-right" v-if="w.money === '0.00'"><x-button class="btn-primary btn-disabled">预贷</x-button></span>
          <span class="pull-right" v-else><x-button class="btn-primary">预贷</x-button></span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import * as api from 'src/api.js'
import { Loading, XButton } from 'vux-components'

export default {
  name: 'WageWeekly',
  components: {
    Loading,
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
      year: '',
      month: '',
      weeklyWage: []
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('openId', u.openId)
    this.$set('cpUserId', u.cpUserId)
    this.$set('companyId', u.currentCompanyId)
    this.$set('companyName', u.currentCompanyName)
    this.getDate()
    this.getWeekSalary()
  },
  methods: {
    getDate () {
      let myDate = new Date()
      let year = myDate.getFullYear()
      let month = myDate.getMonth() + 1
      this.$set('year', year)
      this.$set('month', month)
    },
    getWeekSalary () {
      const that = this
      const dateStr = this.year + '-' + this.formatMonth
      this.$http({
        url: api.getWeekSalary,
        params: {
          month: dateStr,
          userId: that.cpUserId,
          companyId: that.companyId
        },
        method: 'GET'
      }).then(res => {
        // console.log(JSON.stringify(res.data))
        that.$set('weeklyWage', res.data.results)
        that.$set('loading', false)
      })
    }
  },
  computed: {
    formatMonth () {
      return this.month < 10 ? '0' + this.month : this.month
    }
  }
}
</script>

<style lang="less">
.wage-weekly {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  padding: 12px 24px 24px 32px;

  .weekly-wrapper {
    border-left: 1px solid #f0f0f0;

    .weekly-item {
      padding-top: 16px;
      padding-bottom: 8px;

      dt {
        color: #2aabfd;
        font-size: 16px;
        font-weight: normal;
        background-color: transparent;
        background-image: url(../assets/img/ui-icon-clock-blue@2x.png);
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 16px 16px;
        margin-left: -8px;
        padding-left: 36px;
      }
      dd {
        color: #4a4a4a;
        font-size: 18px;
        margin-top: 12px;
        padding-left: 28px;
      }
    }
  }
}
</style>


<template>
  <div class="wage-info">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="wage-info-title">
      <i class="ui-icon ui-icon-md ui-icon-arrow-left-white wage-i-left" @click="subMonth()"></i>
      <span class="info-year">{{yearData}}</span><span class="info-month">{{monthData}}</span>
      <i class="ui-icon ui-icon-md ui-icon-arrow-right-white wage-i-right" @click="addMonth()"></i>
    </div>
    <div class="wage-info-bill">
      <div class="bill-company">
        <span>{{companyName}}工资单</span>
      </div>
      <div class="bill-main" v-if="result">
        <div class="bill-article" v-for="(k,v) in wageInfo">
          <span class="bill-article-key">{{k}}</span>
          <span class="bill-article-val">{{v}}</span>
        </div>
      </div>
      <h3 class="nobody" v-if="nobody">暂无工资数据</h3>
    </div>
    <div class="bill-bg"></div>
  </div>  
</template>

<script>
import * as api from 'src/api.js'
import { Loading } from 'vux-components'

export default {
  name: 'WageMonthly',
  components: {
    Loading
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
      yearData: '',
      monthData: '',
      wageInfo: {},
      result: false,
      nobody: false
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('openId', u.openId)
    this.$set('cpUserId', u.cpUserId)
    this.$set('companyId', u.currentCompanyId)
    this.$set('companyName', u.currentCompanyName)
    this.getDate()
    this.getWageInfo()
    this.$set('yearData', this.year + '-')
    if (this.month < 10) {
      this.$set('monthData', '0' + this.month)
    } else {
      this.$set('monthData', this.month)
    }
  },
  methods: {
    getDate () {
      let myDate = new Date()
      let year = myDate.getFullYear()
      let month = myDate.getMonth()
      if (month === 0) {
        year = year - 1
        month = 12
      }
      this.$set('year', year)
      this.$set('month', month)
    },
    getWageInfo () {
      const that = this
      const dataStr = this.year + '-' + this.formatMonth
      this.$set('loading', true)
      this.$http({
        url: api.getWageInfo,
        params: {
          dateStr: dataStr,
          cpUserId: that.cpUserId,
          companyId: that.companyId
        },
        method: 'GET'
      }).then(res => {
        if (res.data.result) {
          this.$set('result', true)
          this.$set('nobody', false)
          let newData = res.data.billJson[0]
          let arr1 = []
          let arr2 = []
          let newobj = {}
          for (let key in newData[0]) {
            arr1.push(newData[0][key])
          }
          for (let val in newData[1]) {
            arr2.push(newData[1][val])
          }
          for (let i = 0; i < arr1.length; i++) {
            newobj[arr1[i]] = arr2[i]
          }
          that.$set('wageInfo', newobj)
        } else {
          this.$set('result', false)
          this.$set('nobody', true)
          let blankObj = {}
          that.$set('wageInfo', blankObj)
        }
        that.$set('loading', false)
      })
    },
    addMonth () {
      this.month ++
      if (this.month === 13) {
        this.month = 1
        this.year ++
      }
      this.getWageInfo()
      this.$set('yearData', this.year + '-')
      if (this.month < 10) {
        this.$set('monthData', '0' + this.month)
      } else {
        this.$set('monthData', this.month)
      }
    },
    subMonth () {
      this.month --
      if (this.month === 0) {
        this.month = 12
        this.year --
      }
      this.getWageInfo()
      this.$set('yearData', this.year + '-')
      if (this.month < 10) {
        this.$set('monthData', '0' + this.month)
      } else {
        this.$set('monthData', this.month)
      }
    }
  },
  computed: {
    formatMonth () {
      if (this.month < 10) {
        return '0' + this.month
      } else {
        return this.month
      }
    }
  }
}
</script>

<style lang="less">
.wage-info {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  background: url('../assets/img/wagebg.png') no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 22px;

  .wage-info-title {
    
    i {
      color: #FFF;
    }
    .wage-i-left {
      float: left;
      padding-left: 8%;
    }
    .wage-i-right {
      float: right;
      padding-right: 8%;
    }
    .info-year {
      font-size: 16px;
      color: #fff;
    }
    .info-month {
      font-size: 16px;
      color: #fff;
      font-weight: 300;
    }
  }

  .wage-info-bill {
    width: 75%;
    margin: 22px auto 0;
    background-color: #fff;
    border-bottom: 20px solid transparent;
    border-image: gradient(linear, 50% 0, 100% 100%, from(transparent), color-stop(.5, transparent), color-stop(.5, #d86707), to(#d86707));

    .bill-company {
      height: 53px;
      line-height: 53px;
      border-bottom: 1px solid #F3F3F3;
      color: #4B4B4B;
      font-size: 14px;
    }

    .bill-main {
      padding-top: 40px;
      text-align: center;

      .bill-article {
        font-weight: 300;

        .bill-article-key {
          display: inline-block;
          width: 46%;
          text-align: right;
          font-size: 14px;
          line-height: 21px;
          color: #4B4B4B;
          padding-right: 5px;
        }

        .bill-article-val {
          display: inline-block;
          width: 46%;
          padding-left: 5px;
          font-size: 14px;
          line-height: 21px;
          color: #51A5F7;
          text-align: left;
        }
      }
    }
    .nobody {
      color: #bdbdbd;
      font-size: 14px;
      font-weight: normal;
      text-align: center;
      background-image: url(../assets/img/no-data@2x.png);
      background-repeat: no-repeat;
      background-position: center 48px;
      background-size: 50% 50%;
      padding-top: 180px;
    }
  }
  .bill-bg {
    height: 80px;
    width: 78%;
    margin: 0 auto;
    background: url(../assets/img/billbg.png) 0 top no-repeat;
    background-size: 100%;
  }
}
</style>


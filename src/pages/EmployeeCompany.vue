<template>
  <div class="company-main">
    <div class="company-header">
      <span class="header-company">{{currentCompanyName}}</span>
      <span class="header-hook">
        <i class="ui-icon ui-icon-md ui-icon-check"></i>
      </span>
    </div>
    <div class="company-body">
      <div class="body-company" v-for="item in otherCompany" @click="switchCompany($event)">
        <span class="body-company-name" :data-cpid="item.ID">{{item.NAME}}</span>
      </div>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Toast } from 'vux-components'

export default {
  name: 'EmployeeCompany',
  components: {
    Toast
  },
  data () {
    return {
      telphone: '',
      currentCompanyId: '',
      currentCompanyName: '',
      allCompany: [],
      textToast: '',
      showToast: false
    }
  },
  ready () {
    this.fetchUserInfo()
    this.fetchAllCompany()
  },
  methods: {
    fetchUserInfo () {
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      this.$set('telphone', u.phone)
      this.$set('currentCompanyId', u.currentCompanyId)
      this.$set('currentCompanyName', u.currentCompanyName)
    },
    fetchAllCompany () {
      const that = this
      this.$http({
        url: api.getAllCompany,
        params: {
          userName: that.telphone
        },
        method: 'GET'
      }).then(res => {
        that.$set('allCompany', res.data.AllCompanyJson)
      }).catch(err => {
        console.error(err.data)
      })
    },
    switchCompany (e) {
      const that = this
      const u = JSON.parse(window.localStorage.getItem('userInfo'))
      const cps = that.allCompany
      const id = $(e.target).find('span.body-company-name').attr('data-cpid') - 1 + 1
      this.$http({
        url: api.SelectACompany,
        params: {
          companyId: id
        },
        method: 'GET'
      }).then(res => {
        if (res.data.result) {
          for (let i = 0; i < cps.length; i++) {
            if (cps[i]['ID'] === id) {
              that.$set('currentCompanyId', cps[i]['ID'])
              that.$set('currentCompanyName', cps[i]['NAME'])
              u.currentCompanyId = cps[i]['ID']
              u.currentCompanyName = cps[i]['NAME']
              window.localStorage.setItem('userInfo', JSON.stringify(u))
              break
            }
          }
          that.$route.router.go('/home')
        } else {
          that.$set('textToast', '操作失败，请检查您的网络状态后重试。')
          that.$set('showToast', true)
        }
      }).catch(err => {
        console.error(err.data)
      })
    }
  },
  computed: {
    otherCompany () {
      const ac = this.allCompany
      for (let i = 0; i < ac.length; i++) {
        if (ac[i]['ID'] === this.currentCompanyId) {
          ac.splice(i, 1)
        }
      }
      return ac
    }
  }
}
</script>

<style lang="less">
.company-main{
  width: 100%;
  height: 100%;
  padding-top: 14px;
  background-color: #eef3f6;

  .company-header{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    line-height: 48px;
    background-color: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

    .header-company{
      font-size: 15px;
      color: #51A5F7;
      margin-left: 17px;
    }

    .header-hook{
      display: inline-block;
      width: 24px;
      height: 100%;
      margin-right: 10px;
    }
  }

  .company-body{
    width: 100%;
    margin-top: 17px;
    background-color: #fff;
    border-top: 1px solid #ddd;

    .body-company{
      width: 100%;
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #ddd;

      .body-company-name{
        padding-left: 17px;
      }
    }
  }
}
</style>

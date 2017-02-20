<template>
  <div class="user-work">
    <a href="/home/edit/editUserInfo"><i class="ui-icon ui-icon-sm ui-icon-pen-blue-sm"></i>编辑</a>
    <loading :show="loading" :text="textLoading"></loading>
    <template v-if="result">
      <work-item :work_exp="workExp"></work-item>
    </template>
    <div class="btn-wrapper">
      <x-button class="btn-add-work-exp" @click="addWorkExp">添加工作经历</x-button>
    </div>
    <sticky></sticky>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Loading, Toast, Sticky, XButton } from 'vux-components'
import WorkItem from 'components/WorkItem'

export default {
  name: 'UserWork',
  components: {
    Loading,
    Toast,
    Sticky,
    XButton,
    WorkItem
  },
  data () {
    return {
      loading: false,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
      cpUserId: '',
      result: false,
      workExpList: [],
      workExp: {
        beginDate: '1900.01.01',
        endDate: '2020.12.31',
        company: '北京星河信果信息技术有限公司',
        xgPosition: '前端开发',
        majorDuty: '带领团队',
        referee: '玛法里奥',
        refereePhone: '13800138000',
        note: '无'
      }
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('cpUserId', u.cpUserId)
    this.fetchWorkExpList()
  },
  methods: {
    fetchWorkExpList () {
      const that = this
      that.$http({
        url: api.showEmployExperience,
        params: {
          memberLoginId: that.cpUserId
        },
        method: 'GET',
        beforeSend () {
          that.$set('loading', true)
        }
      }).then(res => {
        console.log('workExpList === ' + JSON.stringify(res.data))
        res.data.result ? that.$set('result', true) : that.$set('result', true)
      }).catch(err => {
        console.error(err.data)
      })
    },
    addWorkExp () {
      console.log('添加工作经历')
    }
  }
}
</script>

<style lang="less">
.btn-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 67px;
  border-top: 1px solid #f7f7f7;
  background-color: #fff;
  padding: 12px 18px;
  position: fixed;
  bottom: 0;

  .weui_btn {
    margin-top: 0;
  }
  .weui_btn:after {
    border: none;
    border-radius: 2px;
  }
  .weui_btn_default {
    color: #fff;
    border-radius: 2px;
    background-color: #38acfd;
  }
}
</style>
<template>
  <div class="user-work-list">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="work-item-wrapper">
      <work-item-edit-temp v-for="workExp in workExpList" :work_exp="workExp"></work-item-edit-temp>
    </div>
    <div class="btn-wrapper">
      <a v-link="'/home/edit/addUserWorkTemp'" class="btn-add-work-exp">添加更多工作经历</a>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Loading, Toast } from 'vux-components'
import WorkItemEditTemp from 'components/WorkItemEditTemp'

export default {
  name: 'UserWorkListTemp',
  components: {
    Loading,
    Toast,
    WorkItemEditTemp
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
      memberLoginId: '',
      cpUserIdTemp: '',
      auditStatus: null,
      workExpList: []
    }
  },
  ready () {
    let as = window.localStorage.getItem('auditStatus')
    this.$set('auditStatus', as)
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('memberLoginId', u.memberLoginId)
    let c = window.localStorage.getItem('cpUserIdTemp')
    this.$set('cpUserIdTemp', c)
    this.fetchWorkExpList()
  },
  methods: {
    fetchWorkExpList () {
      const that = this
      that.$http({
        url: api.showEmployExperience,
        params: {
          auditStatus: that.auditStatus,
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserIdTemp
        },
        method: 'GET'
      }).then(res => {
        // console.log('workExpList === ' + JSON.stringify(res.data))
        that.$set('workExpList', res.data.personalList)
        that.$set('loading', false)
      }).catch(err => {
        console.error(err.data)
      })
    }
  }
}
</script>

<style lang="less">
.user-work-list {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;

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
  .work-item-wrapper {
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    padding: 0 16px;
  }
  .btn-wrapper {
    padding-left: 0;
    padding-right: 0;
  }
  .btn-wrapper-fixed {
    box-sizing: border-box;
    width: 100%;
    height: 67px;
    border-top: 1px solid #f7f7f7;
    background-color: #fff;
    padding: 12px 18px;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
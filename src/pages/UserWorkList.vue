<template>
  <div class="user-work-list">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="work-item-wrapper">
      <work-item-edit v-for="workExp in workExpList" :work_exp="workExp"></work-item-edit>
    </div>
    <div class="btn-wrapper">
      <a v-link="'/home/edit/addUserWork'" class="btn-add-work-exp">添加更多工作经历</a>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Loading, Toast, Sticky, XButton } from 'vux-components'
import WorkItemEdit from 'components/WorkItemEdit'

export default {
  name: 'UserWorkList',
  components: {
    Loading,
    Toast,
    Sticky,
    XButton,
    WorkItemEdit
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
      cpUserId: '',
      workExpList: []
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
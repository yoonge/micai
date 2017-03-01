<template>
  <div class="user-work" :class="{'bottom-padding': userInfoStatus}">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="work-item-wrapper" v-if="result1">
      <a v-link="'/home/edit/userWorkList'" class="btn-link btn-link-edit"><i class="ui-icon ui-icon-sm ui-icon-pen-blue-sm"></i>编辑</a>
      <work-item v-for="workExp in workExpList" :work_exp="workExp"></work-item>
    </div>
    <div class="work-item-none" v-if="result2">
      您还没有添加工作经历
    </div>
    <div class="btn-wrapper" v-if="result2">
      <a v-link="'/home/edit/addUserWork'" class="btn-add-work-exp">现在去添加</a>
    </div>
    <div class="btn-wrapper-fixed" v-show="userInfoStatus">
      <x-button class="btn-send">发送</x-button>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Loading, Toast, XButton } from 'vux-components'
import WorkItem from 'components/WorkItem'

export default {
  name: 'UserWork',
  components: {
    Loading,
    Toast,
    XButton,
    WorkItem
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
      memberLoginId: '',
      cpUserId: '',
      userInfoStatus: false,
      result1: false,
      result2: false,
      workExpList: []
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('memberLoginId', u.memberLoginId)
    this.$set('cpUserId', u.cpUserId)
    this.fetchWorkExpList()
  },
  methods: {
    fetchWorkExpList () {
      const that = this
      that.$http({
        url: api.showEmployExperience,
        params: {
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserId
        },
        method: 'GET'
      }).then(res => {
        // console.log('工作经验列表 === ' + JSON.stringify(res.data))
        if (res.data.result) {
          that.$set('result1', true)
          that.$set('result2', false)
          that.$set('workExpList', res.data.personalList)
        } else {
          that.$set('result1', false)
          that.$set('result2', true)
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
.user-work {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;

  &.bottom-padding {
    padding-bottom: 51px;
  }
  
  .work-item-wrapper {
    width: 100%;
    background-color: #fff;
    padding-top: 20px;
    position: relative;

    .btn-link {
      color: #51a5f7;
      font-size: 15px;
      position: absolute;
      top: 8px;
      right: 12px;
    }
  }
  .work-item-none {
    width: 100%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    background-color: #fff;
  }
}
</style>
<template>
  <div class="user-education" :class="{'bottom-padding': userInfoStatus}">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="edu-info-wrapper" v-if="result1">
      <a v-link="'/home/edit/userEducationList'" class="btn-link btn-link-edit"><i class="ui-icon ui-icon-sm ui-icon-pen-blue-sm"></i>编辑</a>
      <edu-item v-for="eduInfo in eduInfoList" :edu_info="eduInfo"></edu-item>
    </div>
    <div class="edu-info-none" v-if="result2">
      您还没有添加教育经历
    </div>
    <div class="btn-wrapper" v-if="result2">
      <a v-link="'/home/edit/addUserEducation'" class="btn-add-work-exp">现在去添加</a>
    </div>
    <div class="btn-wrapper-fixed" v-show="userInfoStatus">
      <x-button class="btn-send" :class="{'btn-disabled': auditStatusTemp}" :disabled="auditStatusTemp" @click="sendAllPersonalInfo()">发送</x-button>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Loading, Toast, XButton } from 'vux-components'
import EduItem from 'components/EduItem'

export default {
  name: 'UserEducation',
  components: {
    Loading,
    Toast,
    XButton,
    EduItem
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
      memberLoginId: '',
      cpUserId: '',
      auditStatus: null,
      userInfoStatus: false,
      auditStatusTemp: false,
      result1: false,
      result2: false,
      eduInfoList: []
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('memberLoginId', u.memberLoginId)
    this.$set('cpUserId', u.cpUserId)
    this.fetchEduInfoList()
  },
  methods: {
    fetchEduInfoList () {
      const that = this
      let as = window.localStorage.getItem('auditStatus')
      that.$set('auditStatus', as)
      that.$http({
        url: api.showEducationInfo,
        params: {
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserId
        },
        method: 'GET'
      }).then(res => {
        // console.log('教育经历列表（编辑） === ' + JSON.stringify(res.data))
        if (res.data.result) {
          that.$set('result1', true)
          that.$set('result2', false)
          that.$set('eduInfoList', res.data.personalList)
          if ((as === '01' || as === '03') && res.data.threeTablesStatus !== '00') {
            that.$set('userInfoStatus', true)
          } else {
            that.$set('userInfoStatus', false)
          }
        } else {
          that.$set('result1', false)
          that.$set('result2', true)
        }
        that.$set('loading', false)
      }).catch(err => {
        console.error(err.data)
      })
    },
    sendAllPersonalInfo () {
      const that = this
      that.$http({
        url: api.sendAllPersonalInfo,
        params: {
          auditStatus: that.auditStatus,
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserId
        },
        method: 'GET',
        beforeSend () {
          that.$set('loading', true)
        }
      }).then(res => {
        console.log('发送结果 === ' + JSON.stringify(res.data))
        if (res.data.result) {
          that.$set('loading', false)
          that.$set('auditStatusTemp', true)
          that.$set('textToast', '发送成功，请耐心等待 HR 审核！')
          that.$set('showToast', true)
        } else {
          that.$set('loading', false)
          that.$set('textToast', '发送失败，请检查您的网络状态后重试。')
          that.$set('showToast', true)
        }
      }).catch(err => {
        console.error(err.data)
      })
    }
  }
}
</script>

<style lang="less">
.user-education {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;

  &.bottom-padding {
    padding-bottom: 67px;
  }
  
  .edu-info-wrapper {
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;

    .btn-link {
      color: #51a5f7;
      font-size: 15px;
      position: absolute;
      top: 8px;
      right: 12px;
      z-index: 9999;
    }
  }
  .edu-info-none {
    width: 100%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    background-color: #fff;
  }
}
</style>
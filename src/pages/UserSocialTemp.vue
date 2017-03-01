<template>
  <div class="user-social" :class="{'bottom-padding': userInfoStatus}">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="social-relationship-wrapper" v-if="result1">
      <a v-link="'/home/edit/userSocialRelationshipListTemp'" class="btn-link btn-link-edit"><i class="ui-icon ui-icon-sm ui-icon-pen-blue-sm"></i>编辑</a>
      <social-relationship v-for="socialRelationship in socialRelationshipList" :social_relationship="socialRelationship"></social-relationship>
    </div>
    <div class="social-relationship-none" v-if="result2">
      您还没有添加社会关系
    </div>
    <div class="btn-wrapper" v-if="result2">
      <a v-link="'/home/edit/addUserSocialRelationshipTemp'" class="btn-add-work-exp">现在去添加</a>
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
import SocialRelationship from 'components/SocialRelationship'

export default {
  name: 'UserSocial',
  components: {
    Loading,
    Toast,
    XButton,
    SocialRelationship
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
      userInfoStatus: false,
      auditStatusTemp: false,
      result1: false,
      result2: false,
      socialRelationshipList: []
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('memberLoginId', u.memberLoginId)
    let c = window.localStorage.getItem('cpUserIdTemp')
    this.$set('cpUserIdTemp', c)
    this.fetchSocialRelationshipList()
  },
  methods: {
    fetchSocialRelationshipList () {
      const that = this
      let as = window.localStorage.getItem('auditStatus')
      this.$set('auditStatus', as)
      that.$http({
        url: api.showRelaInfo,
        params: {
          auditStatus: that.auditStatus,
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserIdTemp
        },
        method: 'GET'
      }).then(res => {
        // console.log('工作经验列表 === ' + JSON.stringify(res.data))
        if (res.data.result) {
          that.$set('result1', true)
          that.$set('result2', false)
          that.$set('socialRelationshipList', res.data.personalList)
          if ((as === '01' || as === '03') && res.data.threeTablesStatus !== '00') {
            this.$set('userInfoStatus', true)
          } else {
            this.$set('userInfoStatus', false)
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
          xgCpUserBaseId: that.cpUserIdTemp
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
.user-social {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;

  &.bottom-padding {
    padding-bottom: 51px;
  }
  
  .social-relationship-wrapper {
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
  .social-relationship-none {
    width: 100%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    background-color: #fff;
  }
}
</style>
<template>
  <div class="userInfo-wrapper" :class="{'bottom-padding': userInfoStatus}">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="userInfo">
      <div class="userInfo-main">
        <div class="userInfo-main-compile" v-link="'/home/edit/editUserInfo'"><i class="ui-icon ui-icon-sm ui-icon-pen-blue-sm"></i>编辑</div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title userInfo-item-ident">姓名</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.memberName}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title userInfo-item-ident">性别</span>
          <span>：</span>
          <span class="userInfo-item-name" v-if="personalInfo.gender === '01'">男</span>
          <span class="userInfo-item-name" v-if="personalInfo.gender === '02'">女</span>
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">证件类型</span>
          <span>：</span>
          <span class="userInfo-item-name" v-if="personalInfo.certificationType === 'CN01'">身份证</span>
          <span class="userInfo-item-name" v-if="personalInfo.certificationType === 'CN02'">护照</span>
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">证件号码</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.certificationNumber}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title userInfo-item-ident">手机</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.mobile}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title userInfo-item-ident">邮箱</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.email}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">社保账号</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.socialSecurityNumber}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">开户银行</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.depositBank}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">公积金账号</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.accumulationFundNumber}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">银行账号</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.bankAccount}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">参加工作时间</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.firstJobDate}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">户口性质</span>
          <span>：</span>
          <span class="userInfo-item-name" v-if="personalInfo.residenceType === '01'">本地城镇</span>
          <span class="userInfo-item-name" v-if="personalInfo.residenceType === '02'">本地农村</span>
          <span class="userInfo-item-name" v-if="personalInfo.residenceType === '03'">外地城镇</span>
          <span class="userInfo-item-name" v-if="personalInfo.residenceType === '04'">外地农村</span>
          <span class="userInfo-item-name" v-if="personalInfo.residenceType === '05'">其他</span>
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">紧急联系电话</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.emergencyPhoneNumber}}</span>
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title userInfo-item-ident">民族</span>
          <span>：</span>
          <span class="userInfo-item-name" v-if="personalInfo.nationality === '01'">汉族</span>
          <span class="userInfo-item-name" v-if="personalInfo.nationality === '02'">蒙古族</span>
          <span class="userInfo-item-name" v-if="personalInfo.nationality === '03'">藏族</span>
          <span class="userInfo-item-name" v-if="personalInfo.nationality === '04'">满族</span>
          <span class="userInfo-item-name" v-if="personalInfo.nationality === '05'">回族</span>
          <span class="userInfo-item-name" v-if="personalInfo.nationality === '06'">维吾尔族</span>
          <span class="userInfo-item-name" v-if="personalInfo.nationality === '07'">朝鲜族</span>
          <span class="userInfo-item-name" v-if="personalInfo.nationality === '08'">其他</span>
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title userInfo-item-ident">住址</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.address}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">政治面貌</span>
          <span>：</span>
          <span class="userInfo-item-name" v-if="personalInfo.politicalStatus === '01'">群众</span>
          <span class="userInfo-item-name" v-if="personalInfo.politicalStatus === '02'">共产党员</span>
          <span class="userInfo-item-name" v-if="personalInfo.politicalStatus === '03'">民族党派</span>
          <span class="userInfo-item-name" v-if="personalInfo.politicalStatus === '04'">无党派</span>
          <span class="userInfo-item-name" v-if="personalInfo.politicalStatus === '05'">共产党预备党员</span>
          <span class="userInfo-item-name" v-if="personalInfo.politicalStatus === '06'">其他</span>
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title userInfo-item-ident">籍贯</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.nativeProvince}}{{personalInfo.nativeCity}}</span>
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">婚姻状况</span>
          <span>：</span>
          <span class="userInfo-item-name" v-if="personalInfo.marriageStatus === '01'">未婚</span>
          <span class="userInfo-item-name" v-if="personalInfo.marriageStatus === '02'">已婚</span>
          <span class="userInfo-item-name" v-if="personalInfo.marriageStatus === '03'">离异</span>
          <span class="userInfo-item-name" v-if="personalInfo.marriageStatus === '04'">其他</span>
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">出生日期</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.birthday}}</span> 
        </div>
      </div>
    </div>
    <div class="btn-wrapper-fixed" v-show="userInfoStatus">
      <x-button class="btn-send" :class="{'btn-disabled': auditStatusTemp}" :disabled="auditStatusTemp" @click="sendAllPersonalInfo()">发送</x-button>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Toast, Loading, XButton } from 'vux-components'

export default {
  name: 'UserInfo',
  components: {
    Toast,
    Loading,
    XButton
  },
  data () {
    return {
      showToast: false,
      textToast: '',
      loading: true,
      textLoading: 'Loading...',
      memberLoginId: '',
      cpUserId: '',
      auditStatus: null,
      userInfoStatus: false,
      auditStatusTemp: false,
      personalInfo: {}
    }
  },
  ready () {
    this.fetchPersonalInfo()
  },
  methods: {
    fetchPersonalInfo () {
      const that = this
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      that.$set('memberLoginId', u.memberLoginId)
      that.$set('cpUserId', u.cpUserId)
      that.$http({
        url: api.showPersonalInfo,
        params: {
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserId
        },
        method: 'GET'
      }).then(res => {
        // console.log('获取个人信息数据 === ' + JSON.stringify(res.data))
        let as = res.data.auditStatus
        that.$set('auditStatus', as)
        window.localStorage.setItem('auditStatus', as)
        if ((as === '01' || as === '03') && res.data.threeTablesStatus !== '00') {
          that.$set('userInfoStatus', true)
        } else {
          that.$set('userInfoStatus', false)
        }
        if (res.data.result) that.$set('personalInfo', res.data.personalList[0])
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
        console.log('UserInfo 发送结果 === ' + JSON.stringify(res.data))
        if (res.data.result) {
          that.$set('loading', false)
          that.$set('auditStatusTemp', true)
          that.$set('textToast', '发送成功，请耐心等待 HR 审核！')
          that.$set('showToast', true)
          window.localStorage.setItem('auditStatus', null)
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
.userInfo-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;

  &.bottom-padding {
    padding-bottom: 67px;
  }
}
.userInfo {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  background-color: #eef3f6;

  .userInfo-main {
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    margin: 0 auto;
    padding: 12px 20px;
    position: relative;

    .userInfo-main-item {
      padding-top: 5px;
      padding-bottom: 5px;

      .userInfo-item-title {
        display: inline-block;
        font-size: 14px;
        color: #353535;
        text-align: justify; 
        text-justify: distribute-all-lines; /*ie6-8*/ 
        text-align-last: justify; /*ie9*/ 
        -moz-text-align-last: justify; /*ff*/ 
        -webkit-text-align-last: justify; /*chrome 20+*/ 
      }

      .userInfo-item-ident {
        width: 56px;
        text-align: justify; 
        text-justify: distribute-all-lines; /*ie6-8*/ 
        text-align-last: justify; /*ie9*/ 
        -moz-text-align-last: justify; /*ff*/ 
        -webkit-text-align-last: justify; /*chrome 20+*/ 
      }

      .userInfo-item-name {
        color: #444343;
        font-size: 13px;
        font-weight: lighter;
      }
    }

    .userInfo-main-compile {
      color: #51a5f7;
      font-size: 15px;
      position: absolute;
      top: 8px;
      right: 12px;
    }
  }
}
</style>
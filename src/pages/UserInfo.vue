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
          <span class="userInfo-item-name">{{personalInfo.gender}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">证件类型</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.certificationType}}</span> 
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
          <span class="userInfo-item-name">{{personalInfo.residenceType}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">紧急联系电话</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.emergencyCall}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title userInfo-item-ident">民族</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.nationality}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title userInfo-item-ident">住址</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.address}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">政治面貌</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.politicalStatus}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title userInfo-item-ident">籍贯</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.nativeProvince}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">婚姻状况</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.marriageStatus}}</span> 
        </div>
        <div class="userInfo-main-item">
          <span class="userInfo-item-title">出生日期</span>
          <span>：</span>
          <span class="userInfo-item-name">{{personalInfo.birthday}}</span> 
        </div>
      </div>
    </div>
    <div class="user-info-btn" v-show="userInfoStatus">
      <x-button>发送</x-button>
    </div>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Loading, XButton } from 'vux-components'

export default {
  name: 'UserInfo',
  components: {
    Loading,
    XButton
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      cpUserId: '',
      userInfoStatus: false,
      personalInfo: {}
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('cpUserId', u.cpUserId)
    this.fetchPersonalInfo()
  },
  methods: {
    fetchPersonalInfo () {
      const that = this
      that.$http({
        url: api.showPersonalInfo,
        params: {
          memberLoginId: that.cpUserId
        },
        method: 'GET'
      }).then(res => {
        if (res.data.result) that.$set('personalInfo', res.data.personalList)
        that.$set('loading', false)
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
    padding-bottom: 51px;
  }
}
.userInfo {
  width: 100%;
  padding-top: 4%;
  padding-bottom: 4%;
  background-color: #eef3f6;

  .userInfo-main {
    position: relative;
    box-sizing: border-box;
    width: 92%;
    background-color: #fff;
    margin: 0 auto;
    padding-left: 20px;
    padding-right : 20px;

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
      top: 12px;
      right: 12px;
    }
  }
}
.user-info-btn {
  box-sizing: border-box;
  width: 100%;
  height: 66px;
  border-top: 1px solid #f7f7f7;
  background-color: #fff;
  padding: 12px 18px;
  position: fixed;
  bottom: 0;

  .weui_btn {
    margin-top: 0;
  }

  .weui_btn_default {
    color: #fff;
    background-color: #38acfd;
  }
}
</style>
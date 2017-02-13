<template>
  <div>
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
    <div class="user-info-btn" v-show="btnShow">
      <x-button>发送</x-button>
    </div>
  </div>
</template>

<script lang="babel">
import { XButton } from 'vux-components'

export default {
  name: 'UserInfo',
  components: {
    XButton
  },
  data () {
    return {
      personalInfo: {},
      btnShow: false
    }
  },
  ready () {
    this.fetchDataInfo()
  },
  methods: {
    fetchDataInfo () {
      let o = JSON.parse(window.localStorage.getItem('userData'))
      console.log(o)
      if (o !== null) {
        this.$set('personalInfo', o)
        this.$set('btnShow', true)
      }
    }
  }
}
</script>

<style lang="less">
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
        font-size: 13px;
        color: #444343;
        font-weight: lighter;
        padding-left: ;
      }
    }

    .userInfo-main-compile {
      position: absolute;
      top: 12px;
      right: 12px;
      color: #51a5f7;
      font-size: 15px;
    }
  }
}
.user-info-btn {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #f7f7f7;
  width: 100%;
  height: 67px;
  box-sizing: border-box;
  padding: 12px 18px;

  .weui_btn {
    margin-top: 0;
  }

  .weui_btn_default {
    background-color: #38acfd;
    color: #fff;
  }
}
</style>
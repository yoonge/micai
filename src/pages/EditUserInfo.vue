<template>
  <div>
    <div class="edit-user-info">
      <group>
        <x-input title="姓名" :value.sync="personalInfo.memberName" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></x-input>
      </group>
      <group>
        <popup-picker title="性别" :value.sync="personalInfo.gender" :data="genders"></popup-picker>
      </group>
      <group>
        <popup-picker title="证件类型" :value.sync="personalInfo.certificationType" :data="certificates"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></popup-picker>
      </group>
      <group>
        <x-input title="证件号码" :value.sync="personalInfo.certificationNumber" placeholder="请输入" :show-clear="false" class="editCertificationNumber" @on-change="checkIdNumber"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></x-input>
      </group>
      <group>
        <x-input name="mobile" title="手机" :value.sync="personalInfo.mobile" placeholder="请输入" :show-clear="false" keyboard="number" @on-change="checkMobile" class="editMobile"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></x-input>
      </group>
      <group>
        <x-input title="邮箱" :value.sync="personalInfo.email" placeholder="请输入" :show-clear="false" @on-change="checkEmail" class="editEmail" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></x-input>
      </group>
      <group>
        <x-input title="社保账号" :value.sync="personalInfo.socialSecurityNumber" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></x-input>
      </group>
      <group>
        <x-input title="公积金账号" :value.sync="personalInfo.accumulationFundNumber" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></x-input>
      </group>
      <group>
        <x-input title="开户银行" :value.sync="personalInfo.depositBank" placeholder="例如：北京银行" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></x-input>
      </group>
      <group>
        <x-input title="银行账号" :value.sync="personalInfo.bankAccount" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></x-input>
      </group>
      <group>
        <datetime title="参加工作时间" :value.sync="personalInfo.firstJobDate" confirm-text="确定" cancel-text="取消"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></datetime>
      </group>
      <group>
        <popup-picker title="户口性质" :value.sync="personalInfo.residenceType" :data="accounts"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></popup-picker>
      </group>
      <group>
        <x-input title="紧急联系电话" :value.sync="personalInfo.emergencyCall" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></x-input>
      </group>
      <group>
        <popup-picker title="民族" :value.sync="personalInfo.nationality" :data="nations"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></popup-picker>
      </group>
      <group>
        <x-input title="住址" :value.sync="personalInfo.address" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></x-input>
      </group>
      <group>
        <popup-picker title="政治面貌" :value.sync="personalInfo.politicalStatus" :data="politics"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></popup-picker>
      </group>
      <group>
        <popup-picker title="婚姻状况" :value.sync="personalInfo.marriageStatus" :data="marriages"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></popup-picker>
      </group>
      <group>
        <x-input title="籍贯" :value.sync="personalInfo.nativeProvince" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></x-input>
      </group>
      <group>
        <datetime title="出生日期" :value.sync="personalInfo.birthday" :min-year="minyear" confirm-text="确认" cancel-text="取消"><i class="ui-icon ui-icon-sm ui-icon-pen-ugly-sm"></i></datetime>
      </group>
    </div>
    <div class="edit-user-info-btn">
      <x-button @click="submitInfo" :disabled="checkBlank" :class="{ editBtnDisable: checkBlank }">保存</x-button>
    </div>
  </div>
  
</template>

<script lang="babel">
import $ from 'jquery'
import { Datetime, Group, XButton, XInput, PopupPicker, XAddress, Cell } from 'vux'

export default {
  name: 'EditUserInfo',
  components: {
    Datetime,
    Group,
    XButton,
    XInput,
    PopupPicker,
    XAddress,
    Cell
  },
  data () {
    return {
      personalInfo: {
        memberName: '',
        gender: [],
        certificationType: [],
        certificationNumber: '',
        mobile: '',
        email: '',
        socialSecurityNumber: '',
        accumulationFundNumber: '',
        depositBank: '',
        bankAccount: '',
        firstJobDate: '',
        residenceType: [],
        emergencyCall: '',
        nationality: [],
        address: '',
        politicalStatus: [],
        marriageStatus: [],
        nativeProvince: '',
        birthday: ''
      },
      genders: [['男', '女']],
      certificates: [['身份证', '护照']],
      accounts: [['本地城镇', '本地农村', '外地城镇', '外地农村']],
      nations: [['汉族', '蒙古族', '藏族', '满足', '回族', '维吾尔族', '朝鲜族']],
      politics: [['群众', '共产党员', '民族党派', '无党派', '共产党预备党员']],
      marriages: [['未婚', '已婚', '离异']],
      minyear: 1900
    }
  },
  methods: {
    submitInfo () {
      window.localStorage.setItem('userData', JSON.stringify(this.personalInfo))
      this.$router.go('/home/user/userInfo')
    },
    checkMobile () {
      let reg = /^1(3|4|5|7|8)\d{9}$/
      if (!reg.test(this.personalInfo.mobile)) {
        $('.editMobile .weui_icon_warn').eq(0).css({'display': 'block'})
      } else {
        $('.editMobile .weui_icon_warn').eq(0).css({'display': 'none'})
      }
    },
    checkEmail () {
      let reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
      if (!reg.test(this.personalInfo.email)) {
        $('.editEmail .weui_icon_warn').eq(0).css({'display': 'block'})
      } else {
        $('.editEmail .weui_icon_warn').eq(0).css({'display': 'none'})
      }
    },
    checkIdNumber () {
      if (this.personalInfo.certificationType[0] === '身份证') {
        let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
        if (!reg.test(this.personalInfo.certificationNumber)) {
          $('.editCertificationNumber .weui_icon_warn').eq(0).css({'display': 'block'})
          console.log('错误')
        } else {
          $('.editCertificationNumber .weui_icon_warn').eq(0).css({'display': 'none'})
          console.log('正确了')
        }
      }
    },
    isIdCardNo (num) {
      const len = num.length
      let re
      if (len === 15) {
        re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/)
      } else if (len === 18) {
        re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/)
      } else {
        return false
      }
      const a = num.match(re)
      let D, B
      if (a !== null) {
        if (len === 15) {
          D = new Date('19' + a[3] + '/' + a[4] + '/' + a[5])
          B = D.getYear() === a[3] && (D.getMonth() + 1) === a[4] && D.getDate() === a[5]
        } else {
          D = new Date(a[3] + '/' + a[4] + '/' + a[5])
          B = D.getFullYear() === a[3] && (D.getMonth() + 1) === a[4] && D.getDate() === a[5]
        }
        if (!B) {
          return false
        }
      }
      if (!re.test(num)) {
        return false
      }
      return true
    }
  },
  computed: {
    checkBlank () {
      const aU = this.personalInfo.memberName !== ''
      const bU = this.personalInfo.gender !== []
      const cU = this.personalInfo.certificationType !== []
      const dU = this.personalInfo.certificationNumber !== ''
      const eU = this.personalInfo.mobile !== ''
      const fU = this.personalInfo.residenceType !== []
      const gU = this.personalInfo.nationality !== []
      const hU = this.personalInfo.address !== ''
      if (aU && bU && cU && dU && eU && fU && gU && hU) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less">
.edit-user-info-btn {
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

.editBtnDisable {
  background-color: #c8cfd4!important;
}

.edit-user-info {
  position: relative;
  width: 100%;
  padding-left: 12px;
  padding-bottom: 66px;
  box-sizing: border-box;
  background-color: #fff;

  .ui-icon {
    position: absolute;
    top: 50%;
    right: 4%;
    margin-top: -8px;
  }

  input::-webkit-input-placeholder {
    color: #444343;
    opacity:1;
    font-size: 13px;
    font-weight: lighter;
    text-align: right;
  }

  .weui_cell {
    padding: 12px 40px 12px 2px!important;
  }

  .weui_cells {
    margin-top: 0;
  }

  .weui_label {
    color: #363636;
    font-size: 15px;
    line-height: 21px;
  }

  .weui_cells:before {
    border: 0px!important;
  }

  .weui_input {
    font-size: 13px;
    color: #444343;
    font-weight: lighter;
  }

  .weui_cell_bd > p {
    color: #363636;
    font-size: 15px;
    line-height: 21px;
  }

  .vux-popup-picker-value {
    font-size: 13px;
    color: #444343;
    font-weight: lighter;
  }

  .weui_cell_ft.with_arrow:after {
    width: 15px;
    height: 15px;
    background: url(../assets/img/user-arrow-right.png);
    background-size: 15px 15px;
    transform: rotate(0deg);
    border: none;
    position: absolute;
    top: 50%;
    right: 4%;
    margin-top: -8px;
  }

  .vux-popup-picker-header {
    color: #51A5F7;
  }

  .weui_cell_ft {
    font-size: 13px;
    color: #444343;
    font-weight: lighter;
  }
}

.dp-header .dp-item {
  color: #51A5F7;
  font-size: 15px;
}
</style>
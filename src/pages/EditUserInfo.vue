<template>
  <div class="edit-wrapper">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="edit-user-info">
      <group class="required clearfix">
        <x-input title="姓名" :value.sync="personalInfo.memberName" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i><i class="ui-icon weui_icon weui_icon_warn" style="display: none;"></i></x-input>
      </group>
      <group class="required clearfix">
        <popup-picker title="性别" :value.sync="personalInfo.gender" :data="genders"></popup-picker>
      </group>
      <group class="required clearfix">
        <popup-picker title="证件类型" :value.sync="personalInfo.certificationType" :data="certificates"></popup-picker>
      </group>
      <group class="required clearfix">
        <x-input title="证件号码" :value.sync="personalInfo.certificationNumber" placeholder="请输入" :show-clear="false" class="editCertificationNumber" @on-change="checkIdNumber"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm" v-show="idNumberStatus"></i><i class="ui-icon weui_icon weui_icon_warn" v-show="!idNumberStatus"></i></x-input>
      </group>
      <group class="required clearfix">
        <x-input name="mobile" title="手机" :value.sync="personalInfo.mobile" placeholder="请输入" :show-clear="false" keyboard="number" @on-change="checkMobile" class="editMobile"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i><i class="ui-icon weui_icon weui_icon_warn" style="display: none;"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="邮箱" :value.sync="personalInfo.email" placeholder="请输入" :show-clear="false" @on-change="checkEmail" class="editEmail" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="社保账号" :value.sync="personalInfo.socialSecurityNumber" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="公积金账号" :value.sync="personalInfo.accumulationFundNumber" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="开户银行" :value.sync="personalInfo.depositBank" placeholder="例如：北京银行" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="银行账号" :value.sync="personalInfo.bankAccount" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <datetime title="参加工作时间" :value.sync="personalInfo.firstJobDate" format="YYYY.MM.DD" confirm-text="确定" cancel-text="取消"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
      </group>
      <group class="required">
        <popup-picker title="户口性质" :value.sync="personalInfo.residenceType" :data="accounts"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></popup-picker>
      </group>
      <group class="clearfix">
        <x-input title="紧急联系电话" :value.sync="personalInfo.emergencyPhoneNumber" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="required clearfix">
        <popup-picker title="民族" :value.sync="personalInfo.nationality" :data="nations"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></popup-picker>
      </group>
      <group class="required clearfix">
        <x-input title="住址" :value.sync="personalInfo.address" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i><i class="ui-icon weui_icon weui_icon_warn" style="display: none;"></i></x-input>
      </group>
      <group class="clearfix">
        <popup-picker title="政治面貌" :value.sync="personalInfo.politicalStatus" :data="politics"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></popup-picker>
      </group>
      <group class="clearfix">
        <popup-picker title="婚姻状况" :value.sync="personalInfo.marriageStatus" :data="marriages"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></popup-picker>
      </group>
      <group class="clearfix">
        <address title="籍贯" :value.sync="personalInfo.addressValue" raw-value :list="addressList" hide-district></address>
      </group>
      <group class="clearfix">
        <datetime title="出生日期" :value.sync="personalInfo.birthday" :min-year="minyear" format="YYYY.MM.DD" confirm-text="完成" cancel-text="取消"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
      </group>
    </div>
    <div class="btn-wrapper">
      <x-button @click="savePersonalInfo" :disabled="checkBlank" :class="{editBtnDisable: checkBlank}">保存</x-button>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import addressList from 'src/addressList.js'
import { Loading, Toast, Address, Datetime, Group, XButton, XInput, PopupPicker, XAddress, Cell } from 'vux-components'

export default {
  name: 'EditUserInfo',
  components: {
    Loading,
    Toast,
    Address,
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
      loading: true,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
      cpUserId: '',
      personalInfo: {
        accumulationFundNumber: '',
        address: '',
        bankAccount: '',
        birthday: '',
        certificationNumber: '',
        certificationType: [],
        depositBank: '',
        email: '',
        emergencyPhoneNumber: '',
        firstJobDate: '',
        gender: [],
        marriageStatus: [],
        memberName: '',
        mobile: '',
        nationality: [],
        addressValue: [],
        politicalStatus: [],
        residenceType: [],
        socialSecurityNumber: ''
      },
      personalInfoJSON: [{}],
      genders: [['男', '女']],
      certificates: [['身份证', '护照']],
      accounts: [['本地城镇', '本地农村', '外地城镇', '外地农村']],
      nations: [['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '朝鲜族', '满族', '侗族', '瑶族', '白族', '土家族', '哈尼族', '哈萨克族', '傣族', '黎族', '傈僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族', '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族', '毛南族', '仡佬族', '锡伯族', '阿昌族', '普米族', '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族', '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族']],
      politics: [['群众', '共产党员', '民族党派', '无党派', '共产党预备党员']],
      marriages: [['未婚', '已婚', '离异']],
      addressList: addressList,
      minyear: 1900,
      mobileStatus: true,
      emailStatus: true,
      idNumberStatus: true
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
      this.$http({
        url: api.showPersonalInfo,
        params: {
          memberLoginId: that.cpUserId
        },
        method: 'GET'
      }).then(res => {
        if (res.data.result) that.$set('personalInfoJSON', res.data.personalList)
        let p1 = that.personalInfo // 表单双向绑定数据
        let p2 = that.personalInfoJSON[0] // 与后端交互的数据
        if (p2) {
          let tempArr = []
          for (let key in p2) {
            // console.log(key + ' === ' + p2[key].toString())
            switch (key) {
              case 'gender':
              case 'certificationType':
              case 'residenceType':
              case 'nationality':
              case 'politicalStatus':
              case 'marriageStatus':
                p1[key].push(p2[key])
                break
              case 'nativeProvinceCode':
                p2[key] !== '' ? tempArr.splice(0, 0, p2[key]) : tempArr = []
                break
              case 'nativeCityCode':
                p2[key] !== '' ? tempArr.push(p2[key]) : tempArr = []
                break
              default:
                p1[key] = p2[key]
                break
            }
          }
          p1['addressValue'] = tempArr
          // console.log('转换后的数据 === ' + JSON.stringify(p1))
        }
        that.$set('loading', false)
      }).catch(err => {
        console.error(err.data)
      })
    },
    savePersonalInfo () {
      const that = this
      let jsonArray = []
      let p1 = that.personalInfo // 表单双向绑定数据
      let p2 = that.personalInfoJSON[0] // 与后端交互的数据
      for (let key in p1) {
        // console.log(key + ' === ' + JSON.stringify(p1[key]))
        switch (key) {
          case 'gender':
          case 'certificationType':
          case 'residenceType':
          case 'nationality':
          case 'politicalStatus':
          case 'marriageStatus':
            p2[key] = p1[key][0]
            break
          case 'addressValue':
            p2['nativeProvinceCode'] = p1[key][0]
            p2['nativeCityCode'] = p1[key][1]
            break
          default:
            p2[key] = p1[key]
            break
        }
      }
      jsonArray[0] = p2
      // console.log('jsonArray === ' + JSON.stringify(jsonArray))
      that.$http({
        url: api.addPersonalInfo,
        params: {
          memberLoginId: that.cpUserId,
          json: JSON.stringify(jsonArray)
        },
        method: 'GET'
      }).then(res => {
        // console.log('savePersonalInfo res.data === ' + JSON.stringify(res.data))
        if (res.data.result) {
          that.$set('loading', false)
          that.$router.go('/home/user/userInfo')
        } else {
          that.$set('loading', false)
          that.$set('textToast', '保存失败，请检查网络后重试！')
          that.$set('showToast', true)
        }
      }).catch(err => {
        console.error(err.data)
      })
    },
    checkMobile () {
      let reg = /^1(3|4|5|7|8)\d{9}$/
      reg.test(this.personalInfo.mobile) ? this.$set('mobileStatus', true) : this.$set('mobileStatus', false)
    },
    checkEmail () {
      let reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
      reg.test(this.personalInfo.email) ? this.$set('emailStatus', true) : this.$set('emailStatus', false)
    },
    checkIdNumber () {
      if (this.personalInfo.certificationType[0] === '身份证') {
        let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
        reg.test(this.personalInfo.certificationNumber) ? this.$set('idNumberStatus', true) : this.$set('idNumberStatus', false)
      }
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
.edit-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #eff4f7;
  padding-bottom: 16px;
  position: relative;
}

.editBtnDisable {
  background-color: #c8cfd4!important;
}

.edit-user-info {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  padding-left: 12px;
  position: relative;

  .ui-icon {
    margin-top: -8px;
    position: absolute;
    top: 50%;
    right: 4%;

    &.weui_icon_warn:before {
      font-size: 16px;
    }
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
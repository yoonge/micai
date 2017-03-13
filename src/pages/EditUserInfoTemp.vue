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
        <x-input name="mobile" title="手机" :value.sync="personalInfo.mobile" placeholder="请输入" :show-clear="false" @on-change="checkMobile"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm" v-show="mobileStatus"></i><i class="ui-icon weui_icon weui_icon_warn" v-show="!mobileStatus"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="邮箱" :value.sync="personalInfo.email" placeholder="请输入" :show-clear="false" @on-change="checkEmail" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm" v-show="emailStatus"></i><i class="ui-icon weui_icon weui_icon_warn" v-show="!emailStatus"></i></x-input>
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
        <x-input title="住址" :value.sync="personalInfo.address" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
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
import $ from 'jquery'
import * as api from 'src/api.js'
import addressList from 'src/addressList.js'
import { Loading, Toast, Address, Datetime, Group, XButton, XInput, PopupPicker, XAddress, Cell } from 'vux-components'

export default {
  name: 'EditUserInfoTemp',
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
      memberLoginId: '',
      cpUserIdTemp: '',
      auditStatus: null,
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
      accounts: [['本地城镇', '本地农村', '外地城镇', '外地农村', '其他']],
      nations: [['汉族', '蒙古族', '藏族', '满族', '回族', '维吾尔族', '朝鲜族', '其他']],
      politics: [['群众', '共产党员', '民族党派', '无党派', '共产党预备党员', '其他']],
      marriages: [['未婚', '已婚', '离异', '其他']],
      addressList: addressList,
      minyear: 1900,
      mobileStatus: true,
      emailStatus: true,
      idNumberStatus: true
    }
  },
  ready () {
    let as = window.localStorage.getItem('auditStatus')
    this.$set('auditStatus', as)
    this.fetchPersonalInfo()
  },
  methods: {
    fetchPersonalInfo () {
      const that = this
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      that.$set('memberLoginId', u.memberLoginId)
      let c = window.localStorage.getItem('cpUserIdTemp')
      that.$set('cpUserIdTemp', c)
      that.$http({
        url: api.showPersonalInfo,
        params: {
          auditStatus: that.auditStatus,
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserIdTemp
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
                switch (p2[key]) {
                  case '01':
                    p1[key] = ['男']
                    break
                  case '02':
                    p1[key] = ['女']
                    break
                }
                break
              case 'certificationType':
                switch (p2[key]) {
                  case 'CN01':
                    p1[key] = ['身份证']
                    break
                  case 'CN02':
                    p1[key] = ['护照']
                    break
                }
                break
              case 'residenceType':
                switch (p2[key]) {
                  case '01':
                    p1[key] = ['本地城镇']
                    break
                  case '02':
                    p1[key] = ['本地农村']
                    break
                  case '03':
                    p1[key] = ['外地城镇']
                    break
                  case '04':
                    p1[key] = ['外地农村']
                    break
                  case '05':
                    p1[key] = ['其他']
                    break
                }
                break
              case 'nationality':
                switch (p2[key]) {
                  case '01':
                    p1[key] = ['汉族']
                    break
                  case '02':
                    p1[key] = ['蒙古族']
                    break
                  case '03':
                    p1[key] = ['藏族']
                    break
                  case '04':
                    p1[key] = ['满族']
                    break
                  case '05':
                    p1[key] = ['回族']
                    break
                  case '06':
                    p1[key] = ['维吾尔族']
                    break
                  case '07':
                    p1[key] = ['朝鲜族']
                    break
                  case '08':
                    p1[key] = ['其他']
                    break
                }
                break
              case 'politicalStatus':
                switch (p2[key]) {
                  case '01':
                    p1[key] = ['群众']
                    break
                  case '02':
                    p1[key] = ['共产党员']
                    break
                  case '03':
                    p1[key] = ['民族党派']
                    break
                  case '04':
                    p1[key] = ['无党派']
                    break
                  case '05':
                    p1[key] = ['共产党预备党员']
                    break
                  case '06':
                    p1[key] = ['其他']
                    break
                }
                break
              case 'nativeProvinceCode':
                p2[key] !== '' ? tempArr.splice(0, 0, p2[key]) : tempArr = []
                break
              case 'nativeCityCode':
                p2[key] !== '' ? tempArr.push(p2[key]) : tempArr = []
                break
              case 'marriageStatus':
                switch (p2[key]) {
                  case '01':
                    p1[key] = ['未婚']
                    break
                  case '02':
                    p1[key] = ['已婚']
                    break
                  case '03':
                    p1[key] = ['离异']
                    break
                  case '04':
                    p1[key] = ['其他']
                    break
                }
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
            switch (p1[key][0]) {
              case '男':
                p2[key] = '01'
                break
              case '女':
                p2[key] = '02'
                break
            }
            break
          case 'certificationType':
            switch (p1[key][0]) {
              case '身份证':
                p2[key] = 'CN01'
                break
              case '护照':
                p2[key] = 'CN02'
                break
            }
            break
          case 'residenceType':
            switch (p1[key][0]) {
              case '本地城镇':
                p2[key] = '01'
                break
              case '本地农村':
                p2[key] = '02'
                break
              case '外地城镇':
                p2[key] = '03'
                break
              case '外地农村':
                p2[key] = '04'
                break
              case '其他':
                p2[key] = '05'
                break
            }
            break
          case 'nationality':
            switch (p1[key][0]) {
              case '汉族':
                p2[key] = '01'
                break
              case '蒙古族':
                p2[key] = '02'
                break
              case '藏族':
                p2[key] = '03'
                break
              case '满族':
                p2[key] = '04'
                break
              case '回族':
                p2[key] = '05'
                break
              case '维吾尔族':
                p2[key] = '06'
                break
              case '朝鲜族':
                p2[key] = '07'
                break
              case '其他':
                p2[key] = '08'
                break
            }
            break
          case 'politicalStatus':
            switch (p1[key][0]) {
              case '群众':
                p2[key] = '01'
                break
              case '共产党员':
                p2[key] = '02'
                break
              case '民族党派':
                p2[key] = '03'
                break
              case '无党派':
                p2[key] = '04'
                break
              case '共产党预备党员':
                p2[key] = '05'
                break
              case '其他':
                p2[key] = '06'
                break
            }
            break
          case 'addressValue':
            p2['nativeProvinceCode'] = p1[key][0]
            p2['nativeCityCode'] = p1[key][1]
            break
          case 'marriageStatus':
            switch (p1[key][0]) {
              case '未婚':
                p2[key] = '01'
                break
              case '已婚':
                p2[key] = '02'
                break
              case '离异':
                p2[key] = '03'
                break
              case '其他':
                p2[key] = '04'
                break
            }
            break
          default:
            p2[key] = p1[key]
            break
        }
      }
      jsonArray[0] = p2
      // console.log('jsonArray === ' + JSON.stringify(jsonArray))
      that.$http({
        url: api.addAndEditPersonalInfo,
        params: {
          auditStatus: that.auditStatus,
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserIdTemp,
          json: JSON.stringify(jsonArray)
        },
        method: 'GET'
      }).then(res => {
        // console.log('savePersonalInfo res.data === ' + res.data)
        if (res.data.result) {
          that.$set('loading', false)
          that.$router.go('/home/userTemp/userInfoTemp')
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
      reg.test(this.personalInfo.email) || this.personalInfo.email === '' ? this.$set('emailStatus', true) : this.$set('emailStatus', false)
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
      const aU = $.trim(this.personalInfo.memberName) !== ''
      const bU = this.personalInfo.gender !== []
      const cU = this.personalInfo.certificationType !== []
      const dU = $.trim(this.personalInfo.certificationNumber) !== '' && this.idNumberStatus
      const eU = $.trim(this.personalInfo.mobile) !== '' && this.mobileStatus
      const fU = this.personalInfo.residenceType !== []
      const gU = this.personalInfo.nationality !== []
      const hU = $.trim(this.personalInfo.address) !== ''
      if (aU && bU && cU && dU && eU && fU && gU && hU && this.emailStatus) {
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

    &.weui_icon_warn {
      margin-top: -10px;

      &:before {
        font-size: 16px;
      }
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
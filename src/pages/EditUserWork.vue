<template>
  <div class="edit-wrapper">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="edit-user-info">
      <group class="clearfix">
        <datetime title="开始日期" :value.sync="workExpItem.beginDate" confirm-text="完成" cancel-text="取消"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
      </group>
      <group class="clearfix">
        <datetime title="结束日期" :value.sync="workExpItem.endDate" confirm-text="完成" cancel-text="取消"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
      </group>
      <group class="clearfix">
        <x-input title="公司" :value.sync="workExpItem.company" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="职位" :value.sync="workExpItem.xgPosition" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <popup-picker title="带领团队" :value.sync="workExpItem.majorDuty" :data="majorDuty"></popup-picker>
      </group>
      <group class="clearfix">
        <x-input title="证明人" :value.sync="workExpItem.referee" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="证明电话" :value.sync="workExpItem.refereePhone" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="备注" :value.sync="workExpItem.note" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
    </div>
    <div class="btn-wrapper">
      <x-button @click="saveWorkExpItem" :disabled="checkBlank" :class="{editBtnDisable: checkBlank}">保存</x-button>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
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
      workExpItem: {
        beginDate: '',
        endDate: '',
        company: '',
        xgPosition: '',
        majorDuty: [],
        referee: '',
        refereePhone: '',
        note: ''
      },
      personalInfoJSON: [{}],
      majorDuty: [['是', '否']],
      minyear: 1900
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('cpUserId', u.cpUserId)
    this.fetchWorkExpItem()
  },
  methods: {
    fetchWorkExpItem () {
      const that = this
      this.$http({
        url: api.showEmployExperience,
        params: {
          memberLoginId: that.cpUserId
        },
        method: 'GET'
      }).then(res => {
        console.log('添加工作经验返回的数据 === ' + JSON.stringify(res.data))
        if (res.data.result) that.$set('personalInfoJSON', res.data.personalList)
        // let p1 = that.workExpItem // 表单双向绑定数据
        // let p2 = that.personalInfoJSON[0] // 与后端交互的数据
        that.$set('loading', false)
      }).catch(err => {
        console.error(err.data)
      })
    },
    saveWorkExpItem () {
      const that = this
      let jsonArray = []
      let p1 = that.personalInfo // 表单双向绑定数据
      let p2 = that.personalInfoJSON[0] // 与后端交互的数据
      for (let key in p1) {
        // console.log('key === ' + JSON.stringify(p1[key]))
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
        method: 'GET',
        beforeSend () {
          that.$set('loading', true)
        }
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
      const aU = this.workExpItem.beginDate !== ''
      const bU = this.workExpItem.endDate !== ''
      const cU = this.workExpItem.company !== ''
      const dU = this.workExpItem.xgPosition !== ''
      const eU = this.workExpItem.majorDuty !== []
      const fU = this.workExpItem.referee !== ''
      const gU = this.workExpItem.refereePhone !== ''
      if (aU && bU && cU && dU && eU && fU && gU) {
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

  .btn-wrapper {
    box-sizing: border-box;
    width: 100%;
    background-color: #eff4f7;
    padding: 16px;
  }
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
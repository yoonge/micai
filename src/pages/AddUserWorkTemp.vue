<template>
  <div class="edit-wrapper">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="edit-user-info">
      <group class="required clearfix">
        <datetime title="开始日期" :value.sync="workExpItem.beginDate" :min-year="minyear" format="YYYY.MM" confirm-text="完成" cancel-text="取消" @on-change="checkBeginDate()"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
      </group>
      <group class="required clearfix">
        <datetime title="结束日期" :value.sync="workExpItem.endDate" :min-year="minyear" format="YYYY.MM" confirm-text="完成" cancel-text="取消" @on-change="checkEndDate()"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
      </group>
      <group class="required clearfix">
        <x-input title="公司" :value.sync="workExpItem.company" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="required clearfix">
        <x-input title="职位" :value.sync="workExpItem.xgPosition" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <popup-picker title="带领团队" :value.sync="workExpItem.majorDuty" :data="majorDutyStatus"></popup-picker>
      </group>
      <group class="clearfix">
        <x-input title="证明人" :value.sync="workExpItem.referee" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="证明电话" :value.sync="workExpItem.refereePhone" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <x-input title="备注" :value.sync="workExpItem.note" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
    </div>
    <div class="btn-wrapper">
      <x-button @click="saveWorkExpItem" :disabled="checkBlank" :class="{editBtnDisable: checkBlank}">保存</x-button>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Loading, Toast, Address, Datetime, Group, XButton, XInput, PopupPicker, XAddress, Cell } from 'vux-components'

export default {
  name: 'AddUserWorkTemp',
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
      loading: false,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
      memberLoginId: '',
      cpUserIdTemp: '',
      auditStatus: null,
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
      workExpItemJSON: {},
      majorDutyStatus: [['是', '否']],
      minyear: 1900
    }
  },
  ready () {
    let as = window.localStorage.getItem('auditStatus')
    this.$set('auditStatus', as)
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('memberLoginId', u.memberLoginId)
    let c = window.localStorage.getItem('cpUserIdTemp')
    this.$set('cpUserIdTemp', c)
  },
  methods: {
    saveWorkExpItem () {
      const that = this
      let jsonArray = []
      let w1 = that.workExpItem // 表单双向绑定数据
      let w2 = that.workExpItemJSON // 与后端交互的数据
      for (let key in w1) {
        console.log('key === ' + JSON.stringify(w1[key]))
        if (key === 'majorDuty') {
          w1[key][0] === '是' ? w2[key] = '00' : w2[key] = '01'
        } else {
          w2[key] = w1[key]
        }
      }
      jsonArray[0] = w2
      // console.log('workExpItemJSON === ' + JSON.stringify(jsonArray))
      that.$http({
        url: api.addEmployExperience,
        params: {
          auditStatus: that.auditStatus,
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserIdTemp,
          json: JSON.stringify(jsonArray)
        },
        method: 'GET',
        beforeSend () {
          that.$set('loading', true)
        }
      }).then(res => {
        // console.log('saveWorkExpItem res.data === ' + JSON.stringify(res.data))
        if (res.data.result) {
          that.$set('loading', false)
          that.$router.go('/home/userTemp/userWorkTemp')
        } else {
          that.$set('loading', false)
          that.$set('textToast', '保存失败，请检查网络后重试！')
          that.$set('showToast', true)
        }
      }).catch(err => {
        console.error(err.data)
      })
    },
    checkBeginDate () {
      let b1 = this.workExpItem.beginDate.slice(0, 4)
      let b2 = this.workExpItem.beginDate.slice(-2)
      let e = this.workExpItem.endDate
      if (e !== '') {
        let e1 = e.slice(0, 4)
        let e2 = e.slice(-2)
        if (b1 > e1 || (b1 === e1 && b2 > e2)) {
          this.workExpItem.beginDate = ''
          this.$set('textToast', '开始日期不能大于结束日期！')
          this.$set('showToast', true)
        }
      }
    },
    checkEndDate () {
      let e1 = this.workExpItem.endDate.slice(0, 4)
      let e2 = this.workExpItem.endDate.slice(-2)
      let b = this.workExpItem.beginDate
      if (b !== '') {
        let b1 = b.slice(0, 4)
        let b2 = b.slice(-2)
        if (e1 < b1 || (e1 === b1 && e2 < b2)) {
          this.workExpItem.endDate = ''
          this.$set('textToast', '结束日期不能小于开始日期！')
          this.$set('showToast', true)
        }
      }
    }
  },
  computed: {
    checkBlank () {
      const aU = this.workExpItem.beginDate !== ''
      const bU = this.workExpItem.endDate !== ''
      const cU = $.trim(this.workExpItem.company) !== ''
      const dU = $.trim(this.workExpItem.xgPosition) !== ''
      if (aU && bU && cU && dU) {
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
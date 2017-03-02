<template>
  <div class="edit-wrapper">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="edit-user-info">
      <group class="required clearfix">
        <datetime title="开始日期" :value.sync="workExpItem.beginDate" :min-year="minyear" format="YYYY.MM" confirm-text="完成" cancel-text="取消"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
      </group>
      <group class="required clearfix">
        <datetime title="结束日期" :value.sync="workExpItem.endDate" :min-year="minyear" format="YYYY.MM" confirm-text="完成" cancel-text="取消"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
      </group>
      <group class="required clearfix">
        <x-input title="公司" :value.sync="workExpItem.company" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="required clearfix">
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
  name: 'EditUserWork',
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
      cpUserId: '',
      xgEmployExpId: '',
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
      workExpList: [{}],
      majorDuty: [['是', '否']],
      minyear: 1900
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('memberLoginId', u.memberLoginId)
    this.$set('cpUserId', u.cpUserId)
    this.$set('xgEmployExpId', this.$route.params.workExpId)
    this.fetchWorkExpItem()
  },
  methods: {
    fetchWorkExpItem () {
      const that = this
      this.$http({
        url: api.showEmployExperience,
        params: {
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserId
        },
        method: 'GET'
      }).then(res => {
        // console.log('编辑工作经验返回的数据 === ' + JSON.stringify(res.data))
        if (res.data.result) that.$set('workExpList', res.data.personalList)
        let tempJSON = {}
        let w1 = that.workExpItem // 表单双向绑定数据
        let w2 = that.workExpList // 与后端交互的数据
        for (let key in w2) {
          // console.log('看看 key 的值 === ' + w2[key]['id'])
          if (w2[key]['id'] === that.xgEmployExpId) {
            tempJSON = w2[key]
          }
        }
        // console.log('当前编辑的条目 === ' + JSON.stringify(tempJSON))
        for (let key in tempJSON) {
          if (key === 'majorDuty') {
            tempJSON[key] === '00' ? w1[key] = ['是'] : w1[key] = ['否']
          } else {
            w1[key] = tempJSON[key]
          }
        }
        // console.log('转换后 === ' + JSON.stringify(w1))
        that.$set('loading', false)
      }).catch(err => {
        console.error(err.data)
      })
    },
    saveWorkExpItem () {
      const that = this
      let tempArray = [{}] // 提交给后端的 JSON
      let w1 = that.workExpItem // 表单双向绑定数据
      for (let key in w1) {
        // console.log('key === ' + JSON.stringify(w1[key]))
        if (key === 'majorDuty') {
          w1[key][0] === '是' ? tempArray[0][key] = '00' : tempArray[0][key] = '01'
        } else {
          tempArray[0][key] = w1[key]
        }
      }
      // console.log('tempArray === ' + JSON.stringify(tempArray))
      that.$http({
        url: api.editEmployExperience,
        params: {
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserId,
          xgEmployExpId: that.xgEmployExpId,
          json: JSON.stringify(tempArray)
        },
        method: 'GET',
        beforeSend () {
          that.$set('loading', true)
        }
      }).then(res => {
        // console.log('saveWorkExpItem res.data === ' + JSON.stringify(res.data))
        if (res.data.result) {
          that.$set('loading', false)
          that.$router.go('/home/edit/userWorkList')
        } else {
          that.$set('loading', false)
          that.$set('textToast', '保存失败，请检查网络后重试！')
          that.$set('showToast', true)
        }
      }).catch(err => {
        console.error(err.data)
      })
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
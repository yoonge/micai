<template>
  <div class="edit-wrapper">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="edit-user-info">
      <group class="required clearfix">
        <datetime title="入学日期" :value.sync="eduInfoItem.beginDate" :min-year="minyear" format="YYYY.MM" confirm-text="完成" cancel-text="取消" @on-change="checkBeginDate()"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
      </group>
      <group class="required clearfix">
        <datetime title="毕业日期" :value.sync="eduInfoItem.endDate" :min-year="minyear" format="YYYY.MM" confirm-text="完成" cancel-text="取消" @on-change="checkEndDate()"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
      </group>
      <group class="required clearfix">
        <x-input title="学校" :value.sync="eduInfoItem.school" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="required clearfix">
        <popup-picker title="学历" :value.sync="eduInfoItem.educationExp" :data="educationExpList"></popup-picker>
      </group>
      <group class="clearfix">
        <x-input title="专业" :value.sync="eduInfoItem.major" placeholder="请输入" :show-clear="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
      <group class="clearfix">
        <popup-picker title="是否最高学历" :value.sync="eduInfoItem.isHighestEdu" :data="eduStatus"></popup-picker>
      </group>
      <group class="clearfix">
        <popup-picker title="学位" :value.sync="eduInfoItem.degree" :data="degreeList"></popup-picker>
      </group>
      <group class="clearfix">
        <popup-picker title="是否最高学位" :value.sync="eduInfoItem.isHighestDegree" :data="degreeStatus"></popup-picker>
      </group>
      <group class="clearfix">
        <popup-picker title="教育类型" :value.sync="eduInfoItem.educationType" :data="eduTypes"></popup-picker>
      </group>
      <group class="clearfix">
        <x-input title="备注" :value.sync="eduInfoItem.note" placeholder="请输入" :show-clear="false" :required="false"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></x-input>
      </group>
    </div>
    <div class="btn-wrapper">
      <x-button @click="saveEduInfoItem" :disabled="checkBlank" :class="{editBtnDisable: checkBlank}">保存</x-button>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Loading, Toast, Datetime, Group, XButton, XInput, PopupPicker, Cell } from 'vux-components'

export default {
  name: 'AddUserEducation',
  components: {
    Loading,
    Toast,
    Datetime,
    Group,
    XButton,
    XInput,
    PopupPicker,
    Cell
  },
  data () {
    return {
      loading: false,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
      memberLoginId: '',
      cpUserId: '',
      auditStatus: null,
      eduInfoItem: {
        beginDate: '',
        endDate: '',
        school: '',
        educationExp: [],
        major: '',
        isHighestEdu: [],
        degree: [],
        isHighestDegree: [],
        educationType: [],
        note: ''
      },
      eduInfoItemJSON: {},
      educationExpList: [['博士研究生', '硕士研究生', '本科', '专科', '高职及中专', '高中', '初中', '小学', '其他']],
      eduStatus: [['是', '否']],
      degreeList: [['学士', '硕士', '博士', '其他']],
      degreeStatus: [['是', '否']],
      eduTypes: [['全日制', '非全日制']],
      minyear: 1900
    }
  },
  ready () {
    let as = window.localStorage.getItem('auditStatus')
    this.$set('auditStatus', as)
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('memberLoginId', u.memberLoginId)
    this.$set('cpUserId', u.cpUserId)
  },
  methods: {
    saveEduInfoItem () {
      const that = this
      let jsonArray = []
      let e1 = that.eduInfoItem // 表单双向绑定数据
      let e2 = that.eduInfoItemJSON // 与后端交互的数据
      for (let key in e1) {
        // console.log('key === ' + JSON.stringify(e1[key]))
        switch (key) {
          case 'educationExp':
            switch (e1[key][0]) {
              case '博士研究生':
                e2[key] = '01'
                break
              case '硕士研究生':
                e2[key] = '02'
                break
              case '本科':
                e2[key] = '03'
                break
              case '专科':
                e2[key] = '04'
                break
              case '高职及中专':
                e2[key] = '05'
                break
              case '高中':
                e2[key] = '06'
                break
              case '初中':
                e2[key] = '07'
                break
              case '小学':
                e2[key] = '08'
                break
              default:
                e2[key] = '09'
                break
            }
            break
          case 'degree':
            switch (e1[key][0]) {
              case '学士':
                e2[key] = '01'
                break
              case '硕士':
                e2[key] = '02'
                break
              case '博士':
                e2[key] = '03'
                break
              default:
                e2[key] = '04'
                break
            }
            break
          case 'isHighestEdu':
          case 'isHighestDegree':
            e1[key][0] === '是' ? e2[key] = '00' : e2[key] = '01'
            break
          case 'educationType':
            e1[key][0] === '全日制' ? e2[key] = '01' : e2[key] = '02'
            break
          default:
            e2[key] = e1[key]
            break
        }
      }
      jsonArray[0] = e2
      // console.log('eduInfoItemJSON === ' + JSON.stringify(jsonArray))
      that.$http({
        url: api.addEducationInfo,
        params: {
          auditStatus: that.auditStatus,
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserId,
          json: JSON.stringify(jsonArray)
        },
        method: 'GET',
        beforeSend () {
          that.$set('loading', true)
        }
      }).then(res => {
        // console.log('saveEduInfoItem res.data === ' + JSON.stringify(res.data))
        if (res.data.result) {
          that.$set('loading', false)
          that.$router.go('/home/edit/userEducationList')
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
      let b1 = this.eduInfoItem.beginDate.slice(0, 4)
      let b2 = this.eduInfoItem.beginDate.slice(-2)
      let e = this.eduInfoItem.endDate
      if (e !== '') {
        let e1 = e.slice(0, 4)
        let e2 = e.slice(-2)
        if (b1 > e1 || (b1 === e1 && b2 > e2)) {
          this.eduInfoItem.beginDate = ''
          this.$set('textToast', '开始日期不能大于结束日期！')
          this.$set('showToast', true)
        }
      }
    },
    checkEndDate () {
      let e1 = this.eduInfoItem.endDate.slice(0, 4)
      let e2 = this.eduInfoItem.endDate.slice(-2)
      let b = this.eduInfoItem.beginDate
      if (b !== '') {
        let b1 = b.slice(0, 4)
        let b2 = b.slice(-2)
        if (e1 < b1 || (e1 === b1 && e2 < b2)) {
          this.eduInfoItem.endDate = ''
          this.$set('textToast', '结束日期不能小于开始日期！')
          this.$set('showToast', true)
        }
      }
    }
  },
  computed: {
    checkBlank () {
      const aU = this.eduInfoItem.beginDate !== ''
      const bU = this.eduInfoItem.endDate !== ''
      const cU = $.trim(this.eduInfoItem.school) !== ''
      const dU = this.eduInfoItem.educationExp !== []
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
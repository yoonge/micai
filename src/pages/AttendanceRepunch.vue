<template>
  <div class="edit-wrapper">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="edit-inner">
      <div class="edit-inner-group">
        <group class="required clearfix">
          <datetime title="补卡时间" :value.sync="workExpItem.beginDate" :min-year="minyear" format="YYYY-MM-DD HH:mm" confirm-text="完成" cancel-text="取消"><i class="ui-icon ui-icon-sm ui-icon-pen-gray-sm"></i></datetime>
        </group>
      </div>
      <div class="edit-inner-group">
        <group class="required clearfix">
          <cell title="缺卡原因"></cell> 
        </group> 
        <group class="group-textarea required clearfix">
          <x-textarea :rows="6" placeholder="请填写缺卡原因"></x-textarea>
        </group>
      </div>
    </div>
    <div class="approval-flow">
      <h3>审批人：</h3>
      <dl class="clearfix">
        <dd class="user-item">   
          <user-item></user-item>
        </dd>
        <dd class="user-item">
          <user-item></user-item>
        </dd>
        <dt><i class="ui-icon ui-icon-circle-plus"></i></dt>
      </dl>
    </div>
    <group class="group-text-cell clearfix">
      <cell value="点击头像可删除"></cell>
    </group>
    <div class="btn-wrapper">
      <x-button>提交</x-button>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
// import $ from 'jquery'
// import * as api from 'src/api.js'
import { Loading, Toast, Address, Datetime, Group, XButton, XInput, XTextarea, PopupPicker, XAddress, Cell } from 'vux-components'
import UserItem from 'components/UserItem'

export default {
  name: 'AttendanceRepunch',
  components: {
    Loading,
    Toast,
    Address,
    Datetime,
    Group,
    XButton,
    XInput,
    XTextarea,
    PopupPicker,
    XAddress,
    Cell,
    UserItem
  },
  data () {
    return {
      loading: false,
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
      vacationType: [['年假', '事假', '病假']],
      minyear: 1900,
      bgColors: [
        '#40affc',
        '#28c196',
        '#fd8474',
        '#fd9448'
      ]
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('memberLoginId', u.memberLoginId)
    this.$set('cpUserId', u.cpUserId)
  },
  computed: {
    // lastname () {
    //   return this.address_info.name.toString().slice(-2)
    // },
    bgColor () {
      const r = Math.floor(Math.random() * 4)
      return this.bgColors[r]
    }
  }
}
</script>
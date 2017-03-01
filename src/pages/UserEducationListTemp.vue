<template>
  <div class="user-education-list">
    <loading :show="loading" :text="textLoading"></loading>
    <div class="edu-item-wrapper">
      <edu-item-edit-temp v-for="eduInfo in eduInfoList" :edu_info="eduInfo"></edu-item-edit-temp>
    </div>
    <div class="btn-wrapper">
      <a v-link="'/home/edit/addUserEducationTemp'" class="btn-add-work-exp">添加更多教育经历</a>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Loading, Toast } from 'vux-components'
import EduItemEditTemp from 'components/EduItemEditTemp'

export default {
  name: 'UserEducationListTemp',
  components: {
    Loading,
    Toast,
    EduItemEditTemp
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
      eduInfoList: []
    }
  },
  ready () {
    let as = window.localStorage.getItem('auditStatus')
    this.$set('auditStatus', as)
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('memberLoginId', u.memberLoginId)
    let c = window.localStorage.getItem('cpUserIdTemp')
    this.$set('cpUserIdTemp', c)
    this.fetchEduInfoList()
  },
  methods: {
    fetchEduInfoList () {
      const that = this
      that.$http({
        url: api.showEducationInfo,
        params: {
          auditStatus: that.auditStatus,
          memberLoginId: that.memberLoginId,
          xgCpUserBaseId: that.cpUserIdTemp
        },
        method: 'GET'
      }).then(res => {
        // console.log('教育经历列表（修改） === ' + JSON.stringify(res.data))
        that.$set('eduInfoList', res.data.personalList)
        that.$set('loading', false)
      }).catch(err => {
        console.error(err.data)
      })
    }
  }
}
</script>

<style lang="less">
.user-education-list {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;

  .edu-item-wrapper {
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    padding: 0 16px;
  }
  .btn-wrapper {
    padding-left: 0;
    padding-right: 0;
  }
  .btn-wrapper-fixed {
    box-sizing: border-box;
    width: 100%;
    height: 67px;
    border-top: 1px solid #f7f7f7;
    background-color: #fff;
    padding: 12px 18px;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
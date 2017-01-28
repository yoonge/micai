<template>
  <div class="map-party-search-result">
    <loading :show="loading" :text="textLoading"></loading>
    <div v-show="result">
      <template v-for="cp_user in cp_users">
        <employee-item :employee_info="cp_user" v-on:showtoast="showtoast"></employee-item>
      </template>
    </div>
    <div class="map-result-nobody" v-show="nobody">
      <img src="../assets/img/search-no.png">
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Loading, Toast } from 'vux-components'
import EmployeeItem from 'components/EmployeeItem'

export default {
  name: 'MapPartySearchResult',
  components: {
    Loading,
    Toast,
    EmployeeItem
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
      currentCompanyId: '',
      currentPartyId: '',
      result: false,
      nobody: false,
      cp_users: []
    }
  },
  ready () {
    $('body').removeAttr('class').addClass('list-view')
    this.fetchUserInfo()
    this.doMapPartySearch()
  },
  methods: {
    fetchUserInfo () {
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      let p = window.localStorage.getItem('currentPartyId')
      this.$set('currentCompanyId', u.currentCompanyId)
      this.$set('currentPartyId', p)
    },
    doMapPartySearch () {
      this.$http({
        url: api.hrMapPartySearch,
        params: {
          companyId: this.currentCompanyId,
          partyId: this.currentPartyId
        },
        method: 'GET'
      }).then(res => {
        const cpUsers = res.data.cpUsers
        if (cpUsers.length !== 0) {
          this.$set('result', true)
          this.$set('cp_users', cpUsers)
        } else {
          this.$set('nobody', true)
        }
        this.$set('loading', false)
      }).catch(err => {
        console.error(err.data)
      })
    },
    showtoast (iArg) {
      if (iArg) {
        this.$set('textToast', '添加成功！')
      } else {
        this.$set('textToast', '添加失败！')
      }
      this.$set('showToast', true)
    }
  }
}
</script>

<style lang="less">
.list-view {
  background-color: #eef3f6;
}
.map-result-nobody {
  font-weight: normal;
  text-align: center;
  padding-top: 148px;

  img{
    width: 158px;
    height: 138px;
  }
}
</style>





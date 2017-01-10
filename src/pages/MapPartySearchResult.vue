<template>
  <div class="map-party-search-result">
    <loading :show="loading" :text="textLoading"></loading>
    <div v-show="result">
      <template v-for="cp_user in cp_users">
        <employee-item :employee_info="cp_user" :has_detail="has_detail"></employee-item>
      </template>
    </div>
    <h3 class="nobody" v-show="nobody">该部门还没有员工。</h3>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Loading } from 'vux-components'
import EmployeeItem from 'components/EmployeeItem'

export default {
  name: 'MapPartySearchResult',
  components: {
    Loading,
    EmployeeItem
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      has_detail: true,
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
    }
  }
}
</script>

<style lang="less">
.list-view {
  background-color: #eef3f6;
}
.nobody {
  text-align: center;
  padding-top: 24px;
}
</style>





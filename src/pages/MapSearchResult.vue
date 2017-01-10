<template>
  <div class="map-search-result">
    <loading :show="loading" :text="textLoading"></loading>
    <div v-show="result">
      <template v-for="employee in employees">
        <employee-item :employee_info="employee" :has_detail="has_detail"></employee-item>
      </template>
    </div>
    <h3 class="nobody" v-show="nobody">未查询到此员工。</h3>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Loading } from 'vux-components'
import EmployeeItem from 'components/EmployeeItem'

export default {
  name: 'MapSearchResult',
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
      mapSearchKeyword: '',
      result: false,
      nobody: false,
      employees: []
    }
  },
  ready () {
    $('body').removeAttr('class').addClass('list-view')
    this.fetchUserInfo()
    this.doMapSearch()
  },
  methods: {
    fetchUserInfo () {
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      this.$set('currentCompanyId', u.currentCompanyId)
      let m = window.localStorage.getItem('mapSearchKeyword')
      this.$set('mapSearchKeyword', m)
    },
    doMapSearch () {
      this.$http({
        url: api.hrMapSearch,
        params: {
          companyId: this.currentCompanyId,
          name: this.mapSearchKeyword
        },
        method: 'GET'
      }).then(res => {
        if (res.data.result) {
          this.$set('result', res.data.result)
          this.$set('employees', res.data.userList)
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





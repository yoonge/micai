<template>
  <div class="map-search-result">
    <loading :show="loading" :text="textLoading"></loading>
    <div v-show="result">
      <template v-for="employee in employees">
        <employee-item :employee_info="employee" v-on:showtoast="showtoast"></employee-item>
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
  name: 'MapSearchResult',
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





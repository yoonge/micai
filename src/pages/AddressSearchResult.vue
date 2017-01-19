<template>
  <div class="address-list">
    <loading :show="loading" :text="textLoading"></loading>
    <div v-if="result">
      <template v-for="address_item in address_list">
        <address-item :address_info="address_item"></address-item>
      </template>
    </div>
    <h3 v-if="nobody" class="nobody">抱歉，您通讯录还没有此人！</h3>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Loading } from 'vux-components'
import AddressItem from 'components/AddressItem'

export default {
  name: 'AddressList',
  components: {
    Loading,
    AddressItem
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      currentCompanyId: '',
      address_list: [],
      addressSearchKeyword: '',
      result: false,
      nobody: false
    }
  },
  ready () {
    $('body').removeAttr('class').addClass('list-view')
    this.fetchUserInfo()
    this.fetchAddressList()
  },
  methods: {
    fetchUserInfo () {
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      this.$set('currentCompanyId', u.currentCompanyId)
      let a = window.localStorage.getItem('addressSearchKeyword')
      this.$set('addressSearchKeyword', a)
    },
    fetchAddressList () {
      const that = this
      this.$http({
        url: api.searchSinglePhone,
        params: {
          companyId: that.currentCompanyId,
          employee: that.addressSearchKeyword
        },
        method: 'GET'
      }).then(res => {
        if (res.data.result) {
          that.$set('result', true)
          that.$set('address_list', res.data.userList)
        } else {
          that.$set('nobody', true)
        }
        that.$set('loading', false)
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
  font-weight: normal;
  text-align: center;
  padding-top: 24px;
}
</style>
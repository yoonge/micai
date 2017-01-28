<template>
  <div class="address-list">
    <loading :show="loading" :text="textLoading"></loading>
    <div v-if="result">
      <template v-for="address_item in address_list">
        <address-item :address_info="address_item"></address-item>
      </template>
    </div>
    <div v-if="nobody" class="address-result-nobody">
      <img src="../assets/img/phone-no.png">
      <p>没有找到小伙伴额～</p>
    </div>
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
.address-result-nobody{
  text-align: center;
  padding-top: 154px;
  img{
    width: 116px;
    height: 100px;
  }
  p{
    padding-top: 20px;
    color: #BDBDBD;
    font-size: 16px;
    line-height: 22px;
  }
}
</style>
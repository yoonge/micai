<template>
  <div class="map-page">
    <form class="map-searchbox" @submit="saveMapSearchKeyword()">
      <span class="map-search-icon"></span>
      <input type="search" placeholder="请输入员工姓名或工号" class="map-search-input" v-model="mapSearchKeyword">
    </form>
    <div class="map-no">
      <img src="~assets/img/map2.png" alt="" class="map-no-img">
      <span class="map-no-title">没有加入公司</span>
    </div>
    <div class="chart-wrapper">
      <div id="chart"></div>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import 'orgchart'
import * as api from 'src/api.js'
import { Toast } from 'vux-components'

export default {
  name: 'MapView',
  components: {
    Toast
  },
  data () {
    return {
      textToast: '',
      showToast: false,
      currentCompanyId: '',
      hrMapInfo: {},
      mapSearchKeyword: ''
    }
  },
  ready () {
    $('body').removeAttr('class').addClass('map-view')
    this.fetchUserInfo()
    this.fetchHrMapInfo()
  },
  methods: {
    fetchUserInfo () {
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      this.$set('currentCompanyId', u.currentCompanyId)
    },
    fetchHrMapInfo () {
      const that = this
      this.$http({
        url: api.hrMapInfo,
        params: {
          companyId: that.currentCompanyId
        },
        methed: 'GET'
      }).then(res => {
        this.$set('hrMapInfo', res.data)
        this.parseDataScoure()
      }).catch(err => {
        console.error(err.data)
      })
    },
    parseDataScoure () {
      const that = this
      const ceo = this.hrMapInfo.partyEntity.managerName === null ? this.hrMapInfo.partyEntity.managerName : '负责人：' + this.hrMapInfo.partyEntity.managerName
      let dataJson = {
        'name': this.hrMapInfo.partyEntity.name,
        'title': ceo,
        'children': []
      }
      this.recursionData(this.hrMapInfo.list, dataJson)
      $('#chart').orgchart({
        'data': dataJson,
        'nodeContent': 'title',
        'nodeID': 'id',
        'createNode': function ($node, data) {
          $node.attr('id', data.id)
          $node.on('click', function () {
            if ($(this).parents('tr').hasClass('nodes')) {
              window.localStorage.setItem('currentPartyId', data.id)
              that.$route.router.go('/home/map/mapPartySearchResult')
            } else {
              that.$set('textToast', '不支持查询公司节点，请选择部门。')
              that.$set('showToast', true)
            }
          })
        }
      })
    },
    recursionData (data, json) {
      for (let i in data) {
        json['children'][i] = {}
        json['children'][i]['id'] = data[i].parent.ID
        json['children'][i]['name'] = data[i].parent.NAME
        if (data[i].parent.MANAGER_NAME !== null) json['children'][i]['title'] = '负责人：' + data[i].parent.MANAGER_NAME
        if (data[i].childList !== null) {
          json['children'][i]['children'] = []
          this.recursionData(data[i].childList.list, json['children'][i])
        } else {
          json['children'][i]['id'] = data[i].parent.ID
          json['children'][i]['name'] = data[i].parent.NAME
          if (data[i].parent.MANAGER_NAME !== null) json['children'][i]['title'] = '负责人：' + data[i].parent.MANAGER_NAME
        }
      }
    },
    saveMapSearchKeyword () {
      window.localStorage.setItem('mapSearchKeyword', this.mapSearchKeyword)
      this.$route.router.go('/home/map/mapSearchResult')
    }
  }
}
</script>

<style lang="less">
.map-view {
  background-image: url(~assets/img/map-bg.png);
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 100% 100%;
}
.map-page {
  width: 100%;
  padding-top: 20px;
  text-align: center;
}
.map-searchbox {
  position: relative;
}
.map-search-icon {
  position: absolute;
  top: 8px;
  left: 35px;
  color:#ffffff;
  background: url(~assets/img/search-lg.png);
  background-size: 100% 100%;
  width:24px;
  height:24px;
}
.map-search-input {
  background-color:rgba(255,255,255,0.36);
  border-radius:2px;
  width:90%;
  height:37px;
  border:none;
  padding-left: 75px;
  color:#fff;
}
::-webkit-input-placeholder {
  font-size:16px;
  color:#ffffff;
  text-align:left;
}
.map-no {
  display: none;
}
.map-no-img {
  margin-top: 6.125rem;
  width: 13.688rem;
}
.map-no-title {
  display: block;
  opacity:0.7;
  font-size:16px;
  color:#ffffff;
  letter-spacing:-0.19px;
  text-align:center;
  margin-top: 1.062rem;
}
.chart-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
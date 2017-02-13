<template>
  <div class="map-page">
    <loading :show="loading" :text="textLoading"></loading>
    <form class="map-searchbox" @submit="saveMapSearchKeyword()">
      <span class="map-search-icon"></span>
      <input type="search" placeholder="请输入员工姓名或工号" class="map-search-input" v-model="mapSearchKeyword">
    </form>
    <div v-show="mapAccord">
      <img src="~assets/img/map2.png" class="map-no-img">
      <span class="map-no-title">没有加入公司</span>
    </div>
    <div class="chart-wrapper" v-show="mapYinc">
      <div id="chart"></div>
    </div>
    <toast :show.sync="showToast" type="text" width="12em">{{textToast}}</toast>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import 'orgchart'
import * as api from 'src/api.js'
import { Loading, Toast } from 'vux-components'

export default {
  name: 'MapView',
  components: {
    Loading,
    Toast
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      textToast: '',
      showToast: false,
      partyId: '',
      currentCompanyId: '',
      hrMapInfo: {},
      mapSearchKeyword: '',
      mapAccord: false,
      mapYinc: false
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
      this.$set('partyId', u.partyId)
      this.$set('currentCompanyId', u.currentCompanyId)
    },
    fetchHrMapInfo () {
      const that = this
      if (this.currentCompanyId !== '') {
        this.$http({
          url: api.hrMapInfo,
          params: {
            companyId: that.currentCompanyId
          },
          methed: 'GET'
        }).then(res => {
          this.$set('hrMapInfo', res.data)
          this.parseDataScoure()
          that.$set('mapYinc', true)
        }).catch(err => {
          console.error(err.data)
        })
      } else {
        this.$set('mapAccord', true)
      }
      this.$set('loading', false)
    },
    parseDataScoure () {
      const that = this
      const ceo = this.hrMapInfo.partyEntity.managerName === null ? this.hrMapInfo.partyEntity.managerName : '负责人：' + this.hrMapInfo.partyEntity.managerName
      let dataJson = {
        'name': this.hrMapInfo.partyEntity.name + ' ' + this.hrMapInfo.partyTotalCount + '人',
        'title': ceo,
        'children': []
      }
      this.recursionData(this.hrMapInfo.list, dataJson)
      $('#chart').orgchart({
        'data': dataJson,
        'nodeContent': 'title',
        'nodeID': 'id',
        'createNode': function ($node, data) {
          $node.attr('data-id', data.id)
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
      $('.nodes .node').each(function () {
        if ($(this).attr('data-id') === that.partyId.toString()) {
          $(this).addClass('active')
        }
      })
    },
    recursionData (data, json) {
      for (let i in data) {
        json['children'][i] = {}
        json['children'][i]['id'] = data[i].parent.ID
        json['children'][i]['name'] = data[i].parent.NAME + ' ' + data[i].totalCount + '人'
        if (data[i].parent.MANAGER_NAME !== null) json['children'][i]['title'] = '负责人：' + data[i].parent.MANAGER_NAME
        if (data[i].childList !== null) {
          json['children'][i]['children'] = []
          this.recursionData(data[i].childList.list, json['children'][i])
        } else {
          json['children'][i]['id'] = data[i].parent.ID
          json['children'][i]['name'] = data[i].parent.NAME + ' ' + data[i].totalCount + '人'
          if (data[i].parent.MANAGER_NAME !== null) json['children'][i]['title'] = '负责人：' + data[i].parent.MANAGER_NAME
        }
      }
    },
    saveMapSearchKeyword () {
      let msk = $.trim(this.mapSearchKeyword)
      if (msk !== '') {
        window.localStorage.setItem('mapSearchKeyword', msk)
        this.$route.router.go('/home/map/mapSearchResult')
      } else {
        this.$set('textToast', '搜索关键词不能为空。')
        this.$set('showToast', true)
        return false
      }
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
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 20px;
}
.map-searchbox {
  position: relative;
}
.map-search-icon {
  color: #fff;
  width: 24px;
  height: 24px;
  background: url(~assets/img/search-lg.png);
  background-size: 100% 100%;
  position: absolute;
  top: 8px;
  left: 35px;
}
.map-search-input {
  color: #fff;
  width: 90%;
  height: 37px;
  border: none;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, .36);
  padding-left: 75px;
}
::-webkit-input-placeholder {
  font-size: 16px;
  color: #fff;
  text-align: left;
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
  min-height: 90%;
  overflow: auto;
}
.map-info {
  color: #FFF;
  padding-top: 10px;

  .map-department {
    padding-right: 5px;
  }
  .map-username {
    padding-left: 5px;
  }
}
</style>
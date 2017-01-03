<template>
  <div class="mappage">
    <div class="map-searchbox">
      <span class="map-search-icon"></span>
      <input type="search" placeholder="请输入员工姓名或工号" class="map-search" v-model="mapSearch">
    </div>
    <div class="map-no">
      <img src="~assets/img/map2.png" alt="" class="map-no-img">
      <span class="map-no-title">没有加入公司</span>
    </div>
    <div class="nicescroll">
      <ul id="org-spy" class="map-hide">
        <li data-actor="Christian Bale">
          <div class="orgWarp">
              <div class="orgName">星河互联</div>
              <div class="orgNum hide">管理者：XXX</div>
              <div class="scroll-down"></div>
          </div>
          <ul>
            <li>
              <div class="orgWarp">
                <div class="orgName">市场部 15人</div>
                <div class="orgNum">管理者：李娜</div>
                <div class="scroll-down"></div>
              </div>
              <ul>
                  <li>
                    <div class="orgWarp org-small">
                      <div class="orgName">销售部 5人</div>
                      <div class="orgNum">管理者：杨琳</div>
                      <div class="scroll-down"></div>
                    </div>
                  </li>
                  <li>
                    <div class="orgWarp org-selected org-small">
                      <div class="orgName">品牌部 3人</div>
                      <div class="orgNum">管理者：陈东</div>
                      <div class="scroll-down"></div>
                    </div>
                  </li>
                  <li>
                    <div class="orgWarp org-small">
                      <div class="orgName">销售部 5人</div>
                      <div class="orgNum">管理者：杨琳</div>
                      <div class="scroll-down"></div>
                    </div>
                  </li>
              </ul>
            </li>
            <li>
              <div class="orgWarp">
                <div class="orgName">市场部15人</div>
                <div class="orgNum">管理者：李娜</div>
                <div class="scroll-down"></div>
              </div>
              <ul>
                <li>
                  <div class="orgWarp org-small">
                    <div class="orgName">销售部 5人</div>
                    <div class="orgNum">管理者：杨琳</div>
                    <div class="scroll-down"></div>
                  </div>
                </li>
                <li>
                  <div class="orgWarp org-small">
                    <div class="orgName">品牌部 3人</div>
                    <div class="orgNum">管理者：陈东</div>
                    <div class="scroll-down"></div>
                  </div>
                </li>
                <li>
                  <div class="orgWarp org-small">
                    <div class="orgName">销售部 5人</div>
                    <div class="orgNum">管理者：杨琳</div>
                    <div class="scroll-down"></div>
                  </div>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <!-- <ul id="org-spy" class="map-hide">
        <li data-actor="Christian Bale">
          <div class="orgWarp">
              <div class="orgName">{{ info.partyEntity.name }}</div>
              <div class="orgNum hide">管理者：{{ info.partyEntity.managerName}}</div>
              <div class="scroll-down"></div>
          </div>
          <ul v-for="item in info.list">
            <li>
              <div class="orgWarp">
                <div class="orgName">{{ item.parent.NAME }} {{ item.totalCount }}</div>
                <div class="orgNum">管理者：{{ item.parent.MANAGER_NAME }}</div>
                <div class="scroll-down"></div>
              </div>
              <ul v-if="item.childList">
                  <li>
                    <div class="orgWarp org-small">
                      <div class="orgName">销售部 5人</div>
                      <div class="orgNum">管理者：杨琳</div>
                      <div class="scroll-down"></div>
                    </div>
                  </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul> -->
      <div class="org-spy"></div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
// import '../../static/jquery.nicescroll.js'
// import '../../static/jquery.orgchart.js'
import * as api from 'src/api.js'

export default {
  name: 'MapView',
  data () {
    return {
      info: {},
      mapSearch: ''
    }
  },
  ready () {
    // this.$nextTick(() => {
    //   $('.nicescroll').niceScroll({
    //     touchbehavior: true,
    //     cursoropacitymax: 0,
    //     cursordragontouch: true,
    //     preventmultitouchscrolling: false
    //   })
    //   $('#org-spy').orgChart({
    //     container: $('.org-spy'),
    //     interactive: false
    //   })
    // })
  },
  methods: {
    getMapInfo () {
      this.$http({
        url: api.getMapInfo,
        methed: 'GET'
      }).then(res => {
        this.$set('info', res.data)
        console.log(res.data)
      }).catch(err => {
        console.error(err.data)
      })
    },
    mapSearch () {
      this.$http({
        url: api.mapSearch,
        methed: 'GET'
      }).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.error(err.data)
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset';
@import '../styles/reset';
@import '../styles/icon';
@import '../styles/orgchart';

.map-hide{
  display: none;
}
.map-no{
  display: none;
}
.app{
  width: 100%;
  height: 100%;
}
.mappage{
  width: 100%;
  height: 100%;
  padding-top: 20px;
  background: url(~assets/img/map-bg.png) no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
.map-searchbox{
  position: relative;
}
.map-search-icon{
  position: absolute;
  top: 8px;
  left: 35px;
  color:#ffffff;
  background: url(~assets/img/search-lg.png);
  background-size: 100% 100%;
  width:24px;
  height:24px;
}
.map-search{
  background-color:rgba(255,255,255,0.36);
  border-radius:2px;
  width:90%;
  height:37px;
  border:none;
  padding-left: 75px;
  color:#fff;
}
::-webkit-input-placeholder{
  font-size:16px;
  color:#ffffff;
  text-align:left;
}
.map-no-img{
  margin-top: 6.125rem;
  width: 13.688rem;
}
.map-no-title{
  display: block;
  opacity:0.7;
  font-size:16px;
  color:#ffffff;
  letter-spacing:-0.19px;
  text-align:center;
  margin-top: 1.062rem;
}
.nicescroll{
    height: 400px;
}
.scroll-down{
    position: absolute;
    top: 64px;
    left: 54px;
    background:#c5eaff;
    border:1px solid #addefd;
    width:27px;
    height:27px;
    border-radius:100%;
    background-image: url(~assets/img/down.png);
    background-size: 17px 10px;
    background-repeat: no-repeat;
    background-position: 4px 9px;
}
</style>
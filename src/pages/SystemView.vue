<template>
  <div class="system-view"  :class="{ systemBg: nobody }">
    <loading :show="loading" :text="textLoading"></loading>
    <div v-show="result">
      <div class="wrapper">
        <div class="system-poster" :style="{width: systemWidth}">
          <template v-for="item in info">
            <a :href="item.institution_url" class="system-poster-item" :style="{backgroundColor: item.color}">
              <p class="system-item-title">{{item.institution_name}}</p>
              <p class="system-item-date">{{item.issue_time}}</p>
            </a>
          </template>
        </div>
        <div class="system-white-side"></div>
      </div>
      <!-- <scroller lock-y :scrollbar-x="false" v-ref:scroller>
        <div class="system-poster" :style="{width: systemWidth}">
          <template v-for="item in info">
            <a :href="item.institution_url" class="system-poster-item" :style="{backgroundColor: item.color}">
              <p class="system-item-title">{{item.institution_name}}</p>
              <p class="system-item-date">{{item.issue_time}}</p>
            </a>
          </template>
        </div>
      </scroller> -->
      <div class="system-bg"></div>
      <section class="system-list">
        <!-- <template v-for="item in info">
          <a :href="item.institution_url" class="system-list-item">
            <flexbox :gutter="0">
              <flexbox-item class="system-list-avatar">
                <span :style="{backgroundColor: item.color}">{{item.firstWord}}</span>
              </flexbox-item>
              <flexbox-item class="system-list-summary">
                <flexbox>
                  <flexbox-item class="system-list-title">{{item.institution_name}}</flexbox-item>
                  <flexbox-item class="system-list-date">{{item.issue_time}}</flexbox-item>
                  <flexbox-item class="system-list-arrow"><i class="ui-icon ui-icon-sm ui-icon-arrow-right-sm"></i></flexbox-item>
                </flexbox>
              </flexbox-item>
            </flexbox>
          </a>
        </template> -->
        <template v-for="item in info">
          <a :href="item.institution_url" class="system-list-item">
              <div class="system-list-avatar">
                <span :style="{backgroundColor: item.color}">{{item.firstWord}}</span>
              </div>
              <div class="system-list-summary">
                  <div class="system-list-title">{{item.institution_name}}</div>
                  <div class="system-list-arrow"><i class="ui-icon ui-icon-sm ui-icon-arrow-right-sm"></i></div>
                  <div class="system-list-date">{{item.issue_time}}</div>
              </div>
          </a>
        </template>
      </section>
    </div>
    <div class="nobaby" v-show="nobody">
      <img src="../assets/img/system-no.png">
      <p class="nobaby-p">还没有添加企业制度</p>
    </div>
  </div>
</template>

<script lang="babel">
import * as api from 'src/api.js'
import { Loading, Flexbox, FlexboxItem } from 'vux-components'

export default {
  name: 'SystemView',
  components: {
    Loading,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      companyId: '',
      info: [],
      colors: [
        '#38adff',
        '#feb354',
        '#ec6f6f',
        '#17c295',
        '#666666',
        '#323029',
        '#c2175e'
      ],
      result: false,
      nobody: false
    }
  },
  ready () {
    let u = JSON.parse(window.localStorage.getItem('userInfo'))
    this.$set('companyId', u.currentCompanyId)
    this.fetchDocumentAddress()
  },
  methods: {
    fetchDocumentAddress () {
      const that = this
      this.$http({
        url: api.getDocumentAddress,
        params: {
          companyId: that.companyId
        },
        method: 'GET'
      }).then(res => {
        if (res.data.result) {
          this.$set('info', res.data.institution_info)
          for (let i = 0; i < this.info.length; i++) {
            this.info[i]['color'] = this.colors[i]
            this.info[i]['firstWord'] = this.info[i].institution_name.substr(0, 1)
          }
          this.$set('result', true)
          // this.$nextTick(() => {
          //   this.$refs.scroller.reset()
          // })
        } else {
          this.$set('nobody', true)
        }
        this.$set('loading', false)
      }).catch(err => {
        console.error(err.data)
      })
    }
  },
  computed: {
    systemWidth () {
      const l = this.info.length
      return 154 * l + 'px'
    }
  }
}
</script>

<style lang="less">
.systemBg {
  background-color: #eef3f6;
}
.system-white-side{
  position: absolute;
  top: 205px;
  width: 100%;
  height: 20px;
  background-color: #fff;
  z-index: 9999;
}
.wrapper{
  width: 100%;
  height: 227px;
  overflow-x: auto;
  overflow-y: hidden;
}
.system-view {
  width: 100%;
  height: 100%;

  .system-poster {
    height: 197px;
    padding-top: 30px;

    .system-poster-item {
      color: #fff;
      box-sizing: border-box;
      display: inline-block;
      width: 114px;
      height: 157px;
      text-align: center;
      background: #38adff url(~assets/img/system.png) no-repeat center 23px;
      background-size: 50%;
      box-shadow: 0 6px 9px rgba(0, 0, 0, .09);
      margin-left: 20px;
      margin-right: 20px;
      padding-top: 96px;

      .system-item-title {
        font-size: 14px;
        line-height: 20px;
      }
      .system-item-date {
        font-size: 12px;
        line-height: 18px;
      }
    }
  }

  .system-bg {
    width: 100%;
    height: 16px;
    background-color: #eef3f6;
  }

  .system-list {
    width: 100%;
    border-top: 1px solid #e7e7e7;

    .system-list-item {
      display: block;
      width: 100%;
      height: 66px;
      line-height: 66px;

      .system-list-avatar {
        float: left;
        box-sizing: border-box;
        padding-left: 16px;

        > span {
          color: #fff;
          font-size: 20px;
          display: inline-block;
          width: 43px;
          height: 43px;
          line-height: 43px;
          text-align: center;
          border-radius: 50%;
        }
      }
      .system-list-summary {
        height: 66px;
        width: 80%;
        float: right;
        border-bottom: 1px solid #f7f7f7;

        .system-list-title {
          color: #323232;
          font-size: 16px;
          float: left;
        }
        .system-list-date {
          font-size: 14px;
          color: #bdbdbd;
          float: right;
          padding-right: 4%;
        }
        .system-list-arrow {
          float: right;
          padding-right: 6%;

          .ui-icon-sm {
            vertical-align: -3px;
          }
        }
      }
    }
  }

  .nobaby{
    padding-top: 170px;
    text-align: center;

    img{
      width: 120px;
      height: 168px;
    }

    p{
      color: #b1b6b8;
      font-size: 18px;
      padding-top: 12px;
    }
  }
}
</style>
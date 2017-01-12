<template>
  <div class="xg-homepage">
    <header class="xg-header">
      <loading :show="loading" :text="textLoading"></loading>
      <div class="xg-avatar">
        <img :src="headImg" :alt="telphone">
      </div>
      <div class="xg-info">
        <p class="xg-info-company">{{homepageInfo.companyName}}</p>
        <p class="xg-info-title">{{homepageInfo.jobTitle}}</p>
        <a class="xg-info-arrow" v-link="'/home/employee'">
          <i class="ui-icon ui-icon-md ui-icon-arrow-right"></i>
        </a>
      </div>
      <a class="xg-message" v-link="'/home/employee'">
        <i class="ui-icon ui-icon-md ui-icon-ring"></i>
      </a>
    </header>
    <div class="xg-main">
      <flexbox :gutter="0">
        <flexbox-item class="xg-item">
          <a class="xg-item-human-map" v-link="'/home/map'">
            <i class="ui-icon ui-icon-xlg ui-icon-human-map"></i>
          </a>
          <p>人力地图</p>
        </flexbox-item>
        <flexbox-item class="xg-item">
          <a class="xg-item-address-book" v-link="'/home/address'">
            <i class="ui-icon ui-icon-xlg ui-icon-address-book"></i>
          </a>
          <p>通讯录</p>
        </flexbox-item>
        <flexbox-item class="xg-item">
          <a class="xg-item-enterprise-system" v-link="'/home/employee'">
            <i class="ui-icon ui-icon-xlg ui-icon-enterprise-system"></i>
          </a>
          <p>企业制度</p>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0">
        <flexbox-item class="xg-item">
          <a class="xg-item-article-wages" v-link="'/home/employee'">
            <i class="ui-icon ui-icon-xlg ui-icon-article-wages"></i>
          </a>
          <p>工资条</p>
        </flexbox-item>
        <flexbox-item></flexbox-item>
        <flexbox-item></flexbox-item>
      </flexbox>
    </div>
    <footer class="xg-footer">
      <i class="ui-icon ui-icon-lg ui-icon-plus"></i>
      <span class="xg-footer-more">更多功能即将上线</span>
    </footer>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Flexbox, FlexboxItem, Loading } from 'vux-components'

export default {
  name: 'Homepage',
  components: {
    Flexbox,
    FlexboxItem,
    Loading
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...',
      telphone: '',
      openId: '',
      headImg: '',
      homepageInfo: {}
    }
  },
  ready () {
    this.fetchHomepageInfo()
    $('body').removeAttr('class').addClass('homepage')
  },
  methods: {
    fetchHomepageInfo () {
      const that = this
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      this.$set('openId', u.openId)
      this.$set('telphone', u.phone)
      this.$set('headImg', u.headImg)
      this.$http({
        url: api.getHomepageInfo,
        params: {
          openId: that.openId,
          phone: that.telphone
        },
        method: 'GET'
      }).then(res => {
        console.log(res.data)
        u.cpUserId = res.data.cpUserId
        u.currentCompanyId = res.data.companyId
        u.currentCompanyName = res.data.companyName
        window.localStorage.setItem('userInfo', JSON.stringify(u))
        that.$set('homepageInfo', res.data)
        that.$set('loading', false)
      }).catch(err => {
        console.error(err.data)
      })
    }
  }
}
</script>

<style lang="less">
.xg-homepage {
  background-color: #eef3f6;
}
.xg-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 215px;
  text-align: center;
  background: linear-gradient(right, #2e84ed 0%, #1cb8fb 100%);
  position: relative;
  padding-top: 36px;

  .xg-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 76px;
    height: 76px;
    border-radius: 100%;
    background-color: #fff;
    background-image: url(~assets/img/avatar-default@2x.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 72px 72px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, .5);
    text-align: center;
    vertical-align:middle;

    > img {
      width: 72px;
      border: 2px solid #fff;
      border-radius: 50%;
    }
  }

  .xg-info {
    position: relative;

    .xg-info-company {
      color: #fff;
      font-size: 17px;
      width: 166px;
      line-height: 17px;
      text-overflow:ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: 17px auto 7px;
    }
    .xg-info-title {
      color: #fff;
      font-size: 14px;
      line-height: 14px;
      margin: 0 auto;
      opacity: 0.7;
    }
    .xg-info-arrow {
      position: absolute;
      top: 22px;
      right: -20px;
      width: 24px;
      height: 24px;
    }
  }
  .xg-message {
    display: inline-block;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 16px;
    right: 20px;
  }
}
.xg-main {
  width: 100%;
  background-color: #fff;
  padding-bottom: 32px;
}
.xg-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 32px;
  
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  > p {
    color: #7d7d7d;
    font-size: 14px;
    line-height: 20px;
    padding-top: 12px;
  }
}
.xg-item-human-map {
  background: linear-gradient(top, #01a3ff 0%, #03d0ff 100%);
  box-shadow: 0px 0px 4px #02a8ff;
}
.xg-item-address-book {
  background: linear-gradient(top, #ffa52f 0%, #ffcc56 100%);
  box-shadow: 0px 0px 4px #ffa932;
}
.xg-item-enterprise-system {
  background: linear-gradient(top, #2fd1cf 0%, #66e8e5 100%);
  box-shadow: 0px 0px 4px #35d4d2;
}
.xg-item-article-wages {
  background: linear-gradient(top, #288ff4 0%, #71aafb 100%);
  box-shadow: 0px 0px 4px #bfd9f3;
}

.xg-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #fff;
  margin-top: 16px;

  .xg-footer-more {
    color: #d6d6d6;
    font-size: 18px;
    line-height: 25px;
    padding-left: 10px;
  }
}
</style>





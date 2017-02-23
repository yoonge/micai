<template>
  <div class="address-item-wrapper clearfix">
    <div class="address-item">
      <div class="address-item-summary">
        <div class="address-avatar">
          <span :style="{'background-color': bgColor}">{{lastname}}</span>
        </div>
        <div class="address-info">
          <dl>
            <dt>{{address_info.name}}<span>{{address_info.jobTitle}}</span></dt>
            <dd>{{address_info.mobile}}</dd>
          </dl>
        </div>
        <div class="address-more">
          <ul class="clearfix">
            <li><a href="tel:{{address_info.mobile}}"><i class="ui-icon ui-icon-lg ui-icon-telphone"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="babel">
import { Flexbox, FlexboxItem } from 'vux-components'

export default {
  name: 'AddressItem',
  components: {
    Flexbox,
    FlexboxItem
  },
  props: {
    address_info: {}
  },
  data () {
    return {
      showDetail: false,
      bgColors: [
        '#40affc',
        '#28c196',
        '#fd8474',
        '#fd9448'
      ]
    }
  },
  computed: {
    lastname () {
      return this.address_info.name.toString().slice(-2)
    },
    bgColor () {
      const r = Math.floor(Math.random() * 4)
      return this.bgColors[r]
    }
  }
}
</script>

<style lang="less">
.address-item-wrapper {
  width: 100%;
  border-top: 1px solid #e4e4e4;

  + .address-item-wrapper {
    border-top: none;
  }

  .address-item {
    border-bottom: 1px solid #e4e4e4;
    background-color: #fff;

    .address-item-summary {
      height: 70px;
      overflow: hidden;

      .address-avatar {
        float: left;
        height: 45px;
        padding: 13px 12px 12px 15px;

        span {
          color: #fff;
          font-size: 16px;
          display: inline-block;
          width: 45px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          border-radius: 50%;
        }
      }

      .address-info {
        float: left;
        padding: 13px 0 12px;

        dl {
          width: 100%;

          dt {
            color: #323232;
            font-size: 16px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            span {
              color: #bdbdbd;
              font-size: 14px;
              margin-left: 8px;
            }
          }
          dd {
            color: #bdbdbd;
            font-size: 14px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .address-more {
    height: 70px;
    text-align: right;

    ul li {
      float: right;
      height: 32px;
      line-height: 32px;
      overflow: hidden;
      padding: 19px 36px 19px 12px;

      > a {
        display: inline-block;
        height: 32px;
        line-height: 32px;
      }
    }
  }
}
</style>
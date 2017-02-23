<template>
  <div class="employee-item-wrapper clearfix">
    <div class="employee-item">
      <div class="employee-item-summary">
        <div class="employee-avatar">
          <span :style="{backgroundColor: bgColor}">{{lastname}}</span>
        </div>
        <div class="employee-info">
          <dl>
            <dt>{{employee_info.name}}<span>{{employee_info.jobTitle}}</span></dt>
            <dd>{{employee_info.email}}</dd>
          </dl>
        </div>
        <div class="employee-more">
          <ul class="clearfix">
            <li @click="toggleDetail()"><i :class="['ui-icon', 'ui-icon-sm', 'ui-icon-arrow-down-sm', {'ui-icon-arrow-up-sm': showDetail}]"></i></li>
            <li><a href="tel:{{employee_info.mobile}}"><i class="ui-icon ui-icon-lg ui-icon-telphone"></i></a></li>
          </ul>
        </div>
      </div>
      <div class="employee-detail" v-show="showDetail">
        <div>
          <ul class="employee-detail-list">
            <li class="employee-detail-email">{{employee_info.email}}</li>
            <li class="employee-detail-address">{{employee_info.address}}</li>
            <li class="employee-detail-mobile">{{employee_info.mobile}}</li>
            <input type="hidden" data-id="{{employee_info.cpUserId}}">
          </ul>
          <button v-if="1 === status" type="button" class="btn-add-to-address" @click="addToAddressList($event)">添加到通讯录</button>
          <button v-if="0 === status" type="button" class="btn-added">已添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import * as api from 'src/api.js'
import { Flexbox, FlexboxItem } from 'vux-components'

export default {
  name: 'EmployeeItem',
  components: {
    Flexbox,
    FlexboxItem
  },
  props: {
    employee_info: {}
  },
  data () {
    return {
      showDetail: false,
      bgColors: [
        '#40affc',
        '#28c196',
        '#fd8474',
        '#fd9448'
      ],
      status: null
    }
  },
  ready () {
    this.$set('status', this.employee_info.status)
  },
  methods: {
    toggleDetail () {
      this.showDetail === false ? this.$set('showDetail', true) : this.$set('showDetail', false)
    },
    addToAddressList (e) {
      let u = JSON.parse(window.localStorage.getItem('userInfo'))
      const rcpuId = $(e.target).prev('ul.employee-detail-list').find('input[type="hidden"]').attr('data-id')
      this.$http({
        url: api.savePhoneBook,
        params: {
          cpuId: u.cpUserId,
          rcpuId: rcpuId
        },
        method: 'GET'
      }).then(res => {
        if (res.data.result) {
          this.$set('status', 0)
          this.$emit('showtoast', true)
        } else {
          this.$emit('showtoast', false)
        }
      })
    }
  },
  computed: {
    lastname () {
      return this.employee_info.name.toString().slice(-2)
    },
    bgColor () {
      const r = Math.floor(Math.random() * 4)
      return this.bgColors[r]
    }
  }
}
</script>

<style lang="less">
.employee-item-wrapper {
  width: 100%;
  border-top: 1px solid #e4e4e4;

  + .employee-item-wrapper {
    border-top: none;
  }

  .employee-item {
    border-bottom: 1px solid #e4e4e4;
    background-color: #fff;

    .employee-item-summary {
      height: 70px;
      overflow: hidden;

      .employee-avatar {
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

      .employee-info {
        width: 42%;
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
    .employee-detail {
      position: relative;
      padding-bottom: 32px;

      .btn-add-to-address {
        color: #38acfd;
        font-size: 14px;
        height: 32px;
        line-height: 32px;
        border-radius: 2px;
        border: 1px solid #38acfd;
        background-color: #fff;
        padding: 0 12px;
        position: absolute;
        right: 12px;
        bottom: 12px;
      }

      .btn-added {
        color: #c1c1c1;
        font-size: 14px;
        height: 32px;
        line-height: 32px;
        border-radius: 2px;
        border: 1px solid #c1c1c1;
        background-color: #fff;
        padding: 0 12px;
        position: absolute;
        right: 12px;
        bottom: 12px;
      }

      .employee-detail-list {
        color: #333;
        line-height: 32px;
        border-top: 1px solid #e4e4e4;
        padding: 12px 12px 12px 72px;

        > li {
          word-break: break-all;
          background-repeat: no-repeat;
          background-position: left 3px;
          background-size: 24px 24px;
          padding-left: 30px;

          &.employee-detail-email {
            background-image: url(~assets/img/ui-icon-email@2x.png);
          }
          &.employee-detail-address {
            background-image: url(~assets/img/ui-icon-address@2x.png);
          }
          &.employee-detail-mobile {
            background-image: url(~assets/img/ui-icon-mobile@2x.png);
          }
        }
      }
    }
  }
  .employee-more {
    float: right;
    height: 70px;
    text-align: right;

    ul li {
      float: right;
      height: 32px;
      line-height: 32px;
      overflow: hidden;
      padding: 19px 12px;
    }
  }
}
</style>
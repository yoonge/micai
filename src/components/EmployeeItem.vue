<template>
  <div class="employee-item-wrapper clearfix">
    <div class="employee-item">
      <flexbox :gutter="0" class="employee-item-summary">
        <flexbox-item class="employee-avatar">
          <span>{{lastname}}</span>
        </flexbox-item>
        <flexbox-item class="employee-info">
          <dl>
            <dt>{{employee_info.name}}<span>{{employee_info.jobTitle}}</span></dt>
            <dd>{{employee_info.email}}</dd>
          </dl>
        </flexbox-item>
        <flexbox-item class="employee-more">
          <ul class="clearfix">
            <li v-if="has_detail" class="employee-detail-toggle"><i class="ui-icon ui-icon-sm ui-icon-arrow-down-sm"></i></li>
            <li><i class="ui-icon ui-icon-lg ui-icon-telphone"></i></li>
          </ul>
        </flexbox-item>
      </flexbox>
      <div v-if="has_detail" class="employee-detail">
        <flexbox :gutter="0">
          <flexbox-item style="flex: 0 0 72px;"></flexbox-item>
          <flexbox-item>
            <ul class="employee-detail-list">
              <li class="employee-detail-email">{{employee_info.email}}</li>
              <li class="employee-detail-address">{{employee_info.address}}</li>
              <li class="employee-detail-mobile">{{employee_info.phone}}</li>
            </ul>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script lang="babel">
import $ from 'jquery'
import { Flexbox, FlexboxItem } from 'vux-components'

export default {
  name: 'EmployeeItem',
  components: {
    Flexbox,
    FlexboxItem
  },
  props: {
    has_detail: '',
    employee_info: {}
  },
  ready () {
    $('body').on('click', 'li.employee-detail-toggle', function () {
      const ico = $(this).find('i.ui-icon')
      const ed = $(this).parents('div.employee-item').find('div.employee-detail')
      if (ico.hasClass('ui-icon-arrow-up-sm')) {
        ico.removeClass('ui-icon-arrow-up-sm').addClass('ui-icon-arrow-down-sm')
      } else {
        ico.removeClass('ui-icon-arrow-down-sm').addClass('ui-icon-arrow-up-sm')
      }
      $(ed).toggle()
    })
  },
  computed: {
    lastname () {
      return this.employee_info.name.toString()[0]
    }
  }
}
</script>

<style lang="less">
.employee-item-wrapper {
  width: 100%;

  .employee-item {
    border-bottom: 1px solid #e4e4e4;
    background-color: #fff;

    .employee-item-summary {
      height: 70px;
      overflow: hidden;

      .employee-avatar {
        flex: 0 0 45px;
        height: 45px;
        padding: 13px 12px 12px 15px;

        span {
          color: #fff;
          font-size: 20px;
          display: inline-block;
          width: 45px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          border-radius: 50%;
          background-color: #4ad1ba;
          margin-right: 12px;
        }
      }

      .employee-info {
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
      display: none;

      .employee-detail-list {
        color: #333;
        line-height: 32px;
        border-top: 1px solid #e4e4e4;
        padding: 12px 12px 12px 0;

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
    flex: 0 0 96px;
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
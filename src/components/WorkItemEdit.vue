<template>
  <div class="work-item-edit">
    <a v-link="'/home/edit/editUserWork/' + work_exp.id" class="btn-link btn-link-edit"><i class="ui-icon ui-icon-sm ui-icon-pen-blue-sm"></i>修改</a>
    <dl>
      <dd>{{work_exp.beginDate}} - {{work_exp.endDate}}</dd>
      <dd>{{work_exp.company}} / {{work_exp.xgPosition}}</dd>
      <dd v-if="work_exp.majorDuty == '00'">带领团队</dd>
      <dd>证明人：<span>{{work_exp.referee}}</span></dd>
      <dd>证明电话：<span>{{work_exp.refereePhone}}</span></dd>
      <dd>备注：<span>{{work_exp.note}}</span></dd>
    </dl>
  </div>
</template>

<script lang="babel">
import { Flexbox, FlexboxItem } from 'vux-components'

export default {
  name: 'WorkItemEdit',
  components: {
    Flexbox,
    FlexboxItem
  },
  props: {
    work_exp: {}
  },
  data () {
    return {
      xgEmployeeExpId: ''
    }
  }
}
</script>

<style lang="less">
.work-item-edit {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  padding: 16px 0;
  position: relative;

  + .work-item-edit {
    border-top: 1px dashed rgba(151, 151, 151, .2);
  }

  .btn-link {
    color: #51a5f7;
    font-size: 15px;
    position: absolute;
    top: 12px;
    right: -4px;
  }

  dl {
    font-size: 14px;

    dd {
      line-height: 18px;
      padding-top: 6px;
      padding-bottom: 6px;

      span {
        font-weight: lighter;
      }
    }
  }
}
</style>
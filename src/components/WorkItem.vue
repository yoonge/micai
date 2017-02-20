<template>
  <div class="work-item">
    <dl>
      <dt>{{work_exp.beginDate}} - {{work_exp.endDate}}</dt>
      <dd>{{work_exp.company}} / {{work_exp.xgPosition}}</dd>
      <dd>{{work_exp.majorDuty}}</dd>
      <dd>证明人：{{work_exp.referee}}</dd>
      <dd>证明电话：{{work_exp.refereePhone}}</dd>
      <dd>备注：{{work_exp.note}}</dd>
    </dl>
  </div>
</template>

<script lang="babel">
export default {
  name: 'WorkItem',
  props: {
    work_exp: {}
  }
}
</script>

<style lang="less">
.work-item {
  width: 100%;

  dl {
    font-size: 13px;
    line-height: 16px;
    border-left: 1px solid #f5f5f5;

    dt {
      background: url(../assets/img/ui-icon-list@2x.png) no-repeat left top;
      background-size: 16px 16px;
      padding-left: 20px;
    }
  }
}
</style>
<template>
  <div class="work-item">
    <dl>
      <dt>{{work_exp.beginDate}} - {{work_exp.endDate}}</dt>
      <dd>{{work_exp.company}} / {{work_exp.xgPosition}}</dd>
      <dd v-if="work_exp.majorDuty === '00'">带领团队</dd>
      <dd>证明人：<span>{{work_exp.referee}}</span></dd>
      <dd>证明电话：<span>{{work_exp.refereePhone}}</span></dd>
      <dd>备注：<span>{{work_exp.note}}</span></dd>
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
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  padding: 0 16px 0 24px;

  dl {
    font-size: 14px;
    border-left: 1px solid #f5f5f5;
    padding-left: 15px;
    padding-bottom: 12px;

    dt {
      font-weight: lighter;
      line-height: 17px;
      background: url(../assets/img/ui-icon-list@2x.png) no-repeat left top;
      background-size: 16px 16px;
      margin-left: -24px;
      padding-left: 24px;
      padding-bottom: 10px;
    }
    dd {
      line-height: 18px;
      padding-bottom: 6px;

      &:last-child {
        padding-bottom: 20px;
      }
      span {
        font-weight: lighter;
      }
    }
  }
}
</style>
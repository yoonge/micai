<template>
  <div class="edu-item">
    <dl>
      <dd><span>{{edu_info.beginDate}} - {{edu_info.endDate}}</span></dd>
      <dd>{{edu_info.school}}</dd>
      <dd>
        <span v-if="edu_info.educationExp === '01'">博士研究生</span>
        <span v-if="edu_info.educationExp === '02'">硕士研究生</span>
        <span v-if="edu_info.educationExp === '03'">本科</span>
        <span v-if="edu_info.educationExp === '04'">专科</span>
        <span v-if="edu_info.educationExp === '05'">高职及中专</span>
        <span v-if="edu_info.educationExp === '06'">高中</span>
        <span v-if="edu_info.educationExp === '07'">初中</span>
        <span v-if="edu_info.educationExp === '08'">小学</span>
        <span v-if="edu_info.educationExp === '09'">其他</span>
        <span> · {{edu_info.major}}</span>
        <span v-if="edu_info.isHighestEdu === '00'"> · 最高学历</span>
      </dd>
      <dd>
        <span>{{edu_info.degree}} · </span>
        <span v-if="edu_info.educationType === '01'">全日制</span>
        <span v-else>非全日制</span>
        <span v-if="edu_info.isHighestDegree === '00'"> · 最高学位</span>
      </dd>
      <dd>备注：<span>{{edu_info.note}}</span></dd>
    </dl>
  </div>
</template>

<script lang="babel">
export default {
  name: 'EduItem',
  props: {
    edu_info: {}
  }
}
</script>

<style lang="less">
.edu-item {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  padding: 16px 0;
  position: relative;

  + .edu-item {
    border-top: 1px dashed rgba(151, 151, 151, .2);
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
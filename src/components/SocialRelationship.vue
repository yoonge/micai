<template>
  <div class="social-relationship">
    <dl>
      <dd>
        <template v-if="social_relationship.relationType === '01'">父亲</template>
        <template v-if="social_relationship.relationType === '02'">母亲</template>
        <template v-if="social_relationship.relationType === '03'">配偶</template>
        <template v-if="social_relationship.relationType === '04'">子女</template>
        <template v-if="social_relationship.relationType === '05'">兄弟姐妹</template>
        <template v-if="social_relationship.relationType === '06'">朋友</template>
        <template v-if="social_relationship.relationType === '07'">同事</template>
        <template v-if="social_relationship.relationType === '08'">其他</template>
         {{social_relationship.name}}
      </dd>
      <dd>{{social_relationship.phoneNo}}</dd>
      <dd>通讯地址：<span>{{social_relationship.address}}</span></dd>
      <dd>出生日期：<span>{{social_relationship.birthday}}</span></dd>
      <dd>工作单位：<span>{{social_relationship.workUnit}}</span></dd>
      <dd>职位：<span>{{social_relationship.xgPosition}}</span></dd>
      <dd>备注：<span>{{social_relationship.note}}</span></dd>
    </dl>
  </div>
</template>

<script lang="babel">
export default {
  name: 'SocialRelationship',
  props: {
    social_relationship: {}
  }
}
</script>

<style lang="less">
.social-relationship {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  padding: 16px 0;
  position: relative;

  + .social-relationship {
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
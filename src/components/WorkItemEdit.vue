<template>
  <div class="work-item">
  </div>
</template>

<script lang="babel">
import { Flexbox, FlexboxItem } from 'vux-components'

export default {
  name: 'WorkItem',
  components: {
    Flexbox,
    FlexboxItem
  },
  props: {
    work_info: {}
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style lang="less">
.work-item {
  width: 100%;
  border-top: 1px solid #e4e4e4;
}
</style>
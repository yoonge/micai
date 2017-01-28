<template>
  <div class="employee">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'Employee'
}
</script>

<style lang="less">
.employee {
  width: 100%;
  height: 100%;
}
</style>
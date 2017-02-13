<template>
  <div class="edit">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'Edit'
}
</script>

<style lang="less">
.edit {
  width: 100%;
  height: 100%;
}
</style>

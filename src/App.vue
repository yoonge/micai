<template>
  <div class="app">
    <router-view
      transition="slide"
      transition-mode="out-in"> 
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'App'
}
</script>
<template>
  <div class="user-avatar">
    <span :style="{'background-color': bgColor}">张三</span>
  </div>
</template>

<script lang="babel">
export default {
  name: 'UserItem',
  data () {
    return {
      bgColors: [
        '#40affc',
        '#28c196',
        '#fd8474',
        '#fd9448'
      ]
    }
  },
  computed: {
    // lastname () {
    //   return this.address_info.name.toString().slice(-2)
    // },
    bgColor () {
      const r = Math.floor(Math.random() * 4)
      return this.bgColors[r]
    }
  }
}
</script>

<style lang="less">
.user-avatar {
  float: left;
  height: 45px;
  padding: 13px 0 12px;

  span {
    color: #fff;
    font-size: 16px;
    display: inline-block;
    width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-radius: 50%;
  }
}
</style>
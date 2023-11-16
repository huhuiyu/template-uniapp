<template>
  <view class="d-flex d-flex-center p-1">
    <image class="main-img" mode="widthFix" src="/static/logo.png"></image>
  </view>
  <view class="text-center p-1">
    <text class="title">{{title}}</text>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'

  const title = ref('网站建设中')
</script>

<style lang="scss" scoped>
  .main-img {
    width: 30vw;
  }
</style>
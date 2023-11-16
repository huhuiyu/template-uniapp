<template>
  <view>
    <input type="text" v-model="echo" />
    <button type="primary" @click="send">发送</button>
  </view>
  <view>
    {{result}}
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import {
    api,
    tools
  } from '../../script/api.js'


  const echo = ref('')
  const result = ref({})

  const send = () => {

    api.get('/test/echo', {
      echo: echo.value
    }, (data) => {
      result.value = data
    })
  }
</script>

<style>

</style>
<template>
  <div>
    <CustomerCar :custIcon="customerIcon" :custDown="custDown" :custRight="custRight" :setUrl="setUrl"></CustomerCar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import customerIcon from './assets/img/customerImg/imgpsh_fullsize_anim .png'
const custDown = ref('50%')
const custRight = ref('0')
const setUrl = "http://localhost:1337"
</script>

<style lang="scss" scoped></style>

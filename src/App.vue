<template>
  <div>
    <CustomerCar :setUrl="setUrl">
      <template #custIcon>
        <div class="messsage-btn-img">
          <img src="../../src/assets/img/customerImg/custtomer.png" alt="" />
        </div>
      </template>
    </CustomerCar>
  </div>
</template>

<script setup>
const setUrl = 'http://localhost:1337'
</script>

<style lang="scss" scoped></style>

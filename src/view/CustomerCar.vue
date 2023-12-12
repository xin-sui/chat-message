<template>
  <div v-if="store.showChatMessage" @click="toggleSelect">
    <slot name="custIcon"></slot>
  </div>
  <div v-show="!store.showChatMessage">
    <div class="overlay"></div>
    <transition name="select-message-fade" mode="out-in">
      <CustMessage></CustMessage>
    </transition>
  </div>
</template>
<script>
export default { name: 'CustomerCar' }
</script>
<script setup>
import CustMessage from '../components/customer/CustMessage.vue'
import { nextTick } from 'vue'
import { useMessageStore } from '@/store/useMessageStore'
import { gsap } from 'gsap'
const store = useMessageStore()

const toggleSelect = () => {
  store.showChatMessage = !store.showChatMessage
  const animate = gsap.timeline()
  nextTick(() => {
    animate.fromTo(
      '.message-container',
      { opacity: 0, x: 200 },
      {
        duration: 0.5,
        opacity: 1,
        x: 0
      }
    )
  })
}
</script>

<style scoped>
.overlay {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.7);
  /* 黑色半透明 */
  z-index: 999;
  /* 确保在其他内容之上 */
}
@media screen and (max-width: 768px) {
  .overlay {
    display: block;
  }
}
</style>

<template>
  <div v-if="store.showChatMessage" @click="toggleSelect" class="message-icon right-box">
    <slot name="custIcon"></slot>
  </div>
  <div class="overlay" v-show="!store.showChatMessage">
    <transition name="select-message-fade" mode="out-in">
      <CustMessage></CustMessage>
    </transition>
  </div>
</template>
<script>
export default { name: 'CustomerCar' }
</script>
<script setup>
// import Select from '../components/customer/CustSelect.vue'
import CustMessage from '../components/customer/CustMessage.vue'
import { nextTick } from 'vue'
import { useMessageStore } from '../store/useMessageStore'
import { gsap } from 'gsap'
const props = defineProps(['custIcon', 'custDown', 'custRight', 'setUrl'])
const store = useMessageStore()
store.setSocketUrl = props.setUrl
// nextTick(() => {
//   gsap.from('.right-box', { duration: 1, x: 200 })
// })
const toggleSelect = () => {
  store.showChatMessage = !store.showChatMessage
  // nextTick(() => {
  //   gsap.to('.message-container', {
  //     duration: 1,
  //     x: -200,
  //   });
  // })
  const animate = gsap.timeline()
  nextTick(() => {
    animate.fromTo(
      '.message-container',
      { opacity: 0, x: 200 },
      {
        duration: 0.5,
        opacity: 1,
        x: 0
        // onComplete: () => {
        //   // 在动画完成后，可以添加其他逻辑
        // }
      }
    )
  })
}
</script>

<style scoped>
/*.right-box {
  position: fixed;
  right: 0%;
  bottom: 50%;
  pointer-events: all;
  cursor: pointer;
}*/

/*.messsage-btn-img {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.messsage-btn-img img {
  width: 5.6875em;
  height: 8.875em;
  object-fit: contain;
}*/

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 黑色半透明 */
  z-index: 999;
  /* 确保在其他内容之上 */
}
</style>

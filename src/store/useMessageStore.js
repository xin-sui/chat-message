import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import img1 from '../assets/img/customerImg/customer-img.png'
import img2 from '../assets/img/customerImg/customer-img.png'
import img3 from '../assets/img/customerImg/customer-img.png'
import socket from '../socket'
export const useMessageStore = defineStore('message', () => {
  const toCustomer = ref(true)
  const isChatVisible = ref(true)
  const localImagePaths = [img1, img2, img3]
  const userMessage = ref([])
  const chatContainerRef = ref('')
  const serverCode = ref({
    msg: '',
    code: null
  }) //接收服务器反馈状态0不放行 1放行
  let isEmailBox = ref(false)
  const toggleEmail = () => {
    isEmailBox.value = !isEmailBox.value
  }
  watch(serverCode.value, (newQuestion) => {
    if (newQuestion.code == 0) {
      toCustomer.value = true
      socket.disconnect()
    } else {
      toCustomer.value = false
      userMessage.value = []
    }
  })
  socket.on('private message', (msg) => {
    userMessage.value.push({
      id: userMessage.value.length + 1,
      content: msg,
      receiver: true
    })
  })

  return {
    toCustomer,
    isChatVisible,
    localImagePaths,
    userMessage,
    serverCode,
    chatContainerRef,
    toggleEmail,
    isEmailBox
  }
})

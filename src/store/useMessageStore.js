import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import img1 from '../assets/img/customerImg/customer-img.png'
import img2 from '../assets/img/customerImg/customer-img2.png'
import img3 from '../assets/img/customerImg/customer-img3.png'
import { socket } from '../socket'
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
  let setSocketUrl = ref('')

  watch(serverCode.value, (newQuestion) => {
    if (newQuestion.code == 0) {
      toCustomer.value = true
      userMessage.value = []
      isEmailBox.value = false
      socket.disconnect()
    } else {
      toCustomer.value = false
    }
  })

  return {
    toCustomer,
    isChatVisible,
    localImagePaths,
    userMessage,
    serverCode,
    chatContainerRef,
    isEmailBox,
    setSocketUrl
  }
})

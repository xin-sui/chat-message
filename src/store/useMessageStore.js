import { ref } from 'vue'
import { defineStore } from 'pinia'
import img1 from '../assets/img/customerImg/customer-img.png'

export const useMessageStore = defineStore('message', () => {
  const toCustomer = ref(true)
  const showChatMessage = ref(true)
  const localImagePaths = img1
  const userMessage = ref([])

  //是否显示邮箱
  let isEmailBox = ref(false)
  //设置接口
  let setSocketUrl = ref('')
  //切换表情
  const toggleEmjiIcon = ref(true)
  const inputNewMessage = ref('')
  return {
    toCustomer,
    showChatMessage,
    localImagePaths,
    userMessage,
    isEmailBox,
    setSocketUrl,
    toggleEmjiIcon,
    inputNewMessage
  }
})

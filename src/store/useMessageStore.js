import { ref } from 'vue'
import { defineStore } from 'pinia'
import img1 from '../assets/img/customerImg/customer-img.png'

export const useMessageStore = defineStore('message', () => {
  const toCustomer = ref(true)
  const isChatVisible = ref(true)
  const localImagePaths = img1
  const userMessage = ref([])

  //是否显示邮箱
  let isEmailBox = ref(false)
  //设置接口
  let setSocketUrl = ref('')

  return {
    toCustomer,
    isChatVisible,
    localImagePaths,
    userMessage,
    isEmailBox,
    setSocketUrl
  }
})

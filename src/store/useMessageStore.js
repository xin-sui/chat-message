import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', () => {
  const toCustomer = ref(true)
  const userMessage = ref([
    // {
    //   content: '你好',
    //   from: 'c86cd3ae3acdd04dab29cf3ad1307fff',
    //   receiver: false,
    //   timestamp: 1701076218952
    // },
    // {
    //   content: '你好',
    //   from: 'c86cd3ae3acdd04dab29cf3ad1307fff',
    //   receiver: false,
    //   timestamp: 1701076221421
    // },
    // {
    //   content: '你好',
    //   from: 'c86cd3ae3acdd04dab29cf3ad1307fff',
    //   receiver: false,
    //   timestamp: 1701076229191
    // },
    // {
    //   content: '你好',
    //   from: 'c86cd3ae3acdd04dab29cf3ad1307fff',
    //   receiver: true,
    //   timestamp: 1701076231289
    // },
    // {
    //   content: '你好',
    //   from: 'c86cd3ae3acdd04dab29cf3ad1307fff',
    //   receiver: false,
    //   timestamp: 1701076232628
    // },
    // {
    //   content: '你好',
    //   from: 'c86cd3ae3acdd04dab29cf3ad1307fff',
    //   receiver: false,
    //   timestamp: 1701076233763
    // },
    // {
    //   content: '你好',
    //   from: 'c86cd3ae3acdd04dab29cf3ad1307fff',
    //   receiver: false,
    //   timestamp: 1701076235002
    // },
    // {
    //   content: '你好',
    //   from: 'c86cd3ae3acdd04dab29cf3ad1307fff',
    //   receiver: false,
    //   timestamp: 1701076236704
    // }
  ])
  const showChatMessage = ref(true)
  //控制邮箱显示与隐藏
  const showEmailBox = ref(false)
  //设置接口
  let setSocketUrl = ref('')
  //切换表情
  const toggleEmjiIcon = ref(false)
  const inputNewMessage = ref('')
  return {
    toCustomer,
    userMessage,
    showEmailBox,
    setSocketUrl,
    toggleEmjiIcon,
    inputNewMessage,
    showChatMessage
  }
})

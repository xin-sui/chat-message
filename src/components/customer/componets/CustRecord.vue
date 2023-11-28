<template>
  <div ref="chatContainerRef" class="chat-message-log">
    <div class="message" v-for="(message, index) in store.userMessage" :key="index"
      :class="{ 'receiver-message': message.receiver, 'sender-message': !message.receiver }">
      <img v-if="message.receiver" class="avatar" src="../../../assets/img/customerImg/customer-img.png"
        :alt="message.altText" />

      <div class="message-content">
        <div :class="{
          'message-text': true,
          'message-text-left': message.receiver,
          'message-text-right': !message.receiver
        }">
          {{ message.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMessageStore } from '@/store/useMessageStore'
import { nextTick, ref, watchEffect } from 'vue';
const store = useMessageStore()
//聊天滚动
const chatContainerRef = ref(null)
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainerRef.value) {
      chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
    }
  })

}
watchEffect(() => {
  if (store.userMessage.length) {
    scrollToBottom()
  }
})
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: flex-start;
  margin: 0.625em;
}

.avatar {
  width: 4.125em;
  height: 4.125em;
  margin-right: 0.5em;
  margin-left: 0.5em;
}

.message-text {
  padding: 1.5em;
  background-color: #e1e1e1;
  font-size: 0.9375em;
  /*white-space: pre-wrap;*/
  word-wrap: break-word;
}

.message-content {
  max-width: 80%;
}

.message-text-right {
  border-radius: 1.5em 0em 1.5em 1.5em;
  background-color: #ffffff;
  color: #474747;
}

.message-text-left {
  border-radius: 0 1.5em 1.5em 1.5em;
  background-color: #33bcea;
  color: #ffffff;
}

.receiver-message {
  justify-content: flex-start;
}

.sender-message {
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
}

.chat-message-log {
  display: flex;
  max-height: 34.5em;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
}

.chat-message-log::-webkit-scrollbar {
  width: 0.5em !important;
  /* 设置滚动条宽度 */
}

.chat-message-log::-webkit-scrollbar-thumb {
  background-color: #d9d9d9 !important;
  /* 设置滚动条滑块的颜色 */
  border-radius: 4px !important;
  /* 设置滚动条滑块的圆角 */
}

.chat-message-log::-webkit-scrollbar-thumb:hover {
  background-color: #80a5cc !important;
  /* 设置滚动条滑块在悬停时的颜色 */
}
</style>

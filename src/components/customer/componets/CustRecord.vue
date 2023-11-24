<template>
  <div
    class="message"
    v-for="(message, index) in store.userMessage"
    :key="index"
    :class="{ 'receiver-message': message.receiver, 'sender-message': !message.receiver }"
  >
    <img
      v-if="message.receiver"
      class="avatar"
      :src="store.localImagePaths[0]"
      :alt="message.altText"
    />

    <div class="message-content">
      <div
        :class="{
          'message-text': true,
          'message-text-left': message.receiver,
          'message-text-right': !message.receiver
        }"
      >
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMessageStore } from '@/store/useMessageStore'
const store = useMessageStore()
console.log(store.userMessage)
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
</style>

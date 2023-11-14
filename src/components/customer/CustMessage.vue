<template>
  <CustomerLayout>
    <template #headerLeft>
      <svg
        @click="goBack"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.8125 11.0006L17.1842 2.25369C17.7365 1.73726 17.7365 0.901474 17.1842 0.3867C16.6318 -0.1289 15.7357 -0.1289 15.1833 0.3867L4.81207 10.0673C4.26056 10.5829 4.26056 11.4191 4.81207 11.9331L15.1833 21.6133C15.4604 21.8711 15.8224 22 16.1846 22C16.5467 22 16.9088 21.8711 17.1842 21.6125C17.7365 21.0969 17.7365 20.2623 17.1842 19.7467L7.8125 11.0006Z"
          fill="#929292"
        />
      </svg>
    </template>
    <template #content>
      <div class="chat-container" ref="chatContainerRef" @change="showEmojiChange">
        <div
          v-for="(message, index) in store.userMessage"
          :key="index"
          class="message"
          :class="{ 'receiver-message': message.receiver, 'sender-message': !message.receiver }"
        >
          <img
            v-if="message.receiver"
            class="avatar"
            :src="store.localImagePaths[0]"
            :alt="message.altText"
          />
          <!-- <img
            v-if="message.receiver"
            class="avatar"
            :src="store.localImagePaths[0]"
            :alt="message.altText"
          /> -->
          <img
            v-else
            src="../../assets/img/customerImg/user.png"
            class="avatar-user"
            alt=""
            srcset=""
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
      </div>
      <div class="emijon-box" v-show="isShowEmojio">
        <Picker :showPreview="false" :data="emojiIndex" set="twitter" @select="showEmoji" />
      </div>
      <div class="chat-function functon-phone" :class="{ 'function-color': isShowEmojio }">
        <div class="chat-function-left">
          <p>phone：123-456-789</p>
        </div>
        <div class="chat-function-right">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1362_50027)">
              <path
                d="M10.2347 11.6572C9.23774 11.6572 8.24084 11.2777 7.48176 10.5186C7.27559 10.3125 7.27559 9.97735 7.48176 9.7712C7.68793 9.56506 8.02303 9.56506 8.2292 9.7712C9.33506 10.877 11.1333 10.877 12.2392 9.7712L16.0831 5.92723C17.1889 4.82139 17.1889 3.02311 16.0831 1.91727C14.9773 0.811433 13.179 0.811433 12.0732 1.91727L8.8297 5.16075C8.62353 5.36691 8.28842 5.36691 8.08225 5.16075C7.87611 4.9546 7.87611 4.61947 8.08225 4.41331L11.3257 1.16985C12.8439 -0.348284 15.3135 -0.348284 16.8306 1.16985C18.3476 2.68797 18.3487 5.15759 16.8306 6.67469L12.9866 10.5186C12.2275 11.2777 11.2316 11.6572 10.2347 11.6572ZM3.89153 18.0004C2.89459 18.0004 1.89765 17.6209 1.13859 16.8618C-0.379529 15.3437 -0.379529 12.8741 1.13859 11.357L4.98255 7.51302C6.50069 5.99489 8.97031 5.99489 10.4874 7.51302C10.6935 7.71918 10.6935 8.05429 10.4874 8.26046C10.2812 8.4666 9.94609 8.4666 9.73997 8.26046C8.63411 7.15462 6.83582 7.15462 5.72999 8.26046L1.88601 12.1044C0.78017 13.2102 0.78017 15.0086 1.88601 16.1144C2.99183 17.2202 4.79013 17.2202 5.89597 16.1144L9.13943 12.8709C9.3456 12.6647 9.68073 12.6647 9.88687 12.8709C10.093 13.077 10.093 13.4121 9.88687 13.6183L6.64342 16.8618C5.88435 17.6209 4.8874 18.0004 3.89046 18.0004H3.89153Z"
                fill="#929292"
                stroke="#929292"
                stroke-width="0.2"
              />
            </g>
            <defs>
              <clipPath id="clip0_1362_50027">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.6"
              y="0.6"
              width="18.8"
              height="12.8"
              rx="2.4"
              stroke="#929292"
              stroke-width="1.2"
            />
            <rect
              x="1"
              y="2.08789"
              width="1.2"
              height="9.89859"
              transform="rotate(-65 1 2.08789)"
              fill="#929292"
            />
            <rect
              width="1.2"
              height="9.89694"
              transform="matrix(-0.422618 -0.906308 -0.906308 0.422618 18.9375 2.08789)"
              fill="#929292"
            />
          </svg>
        </div>
      </div>
      <div class="bottom-box">
        <img
          style="width: 3.5em; height: 3.5em"
          :class="{ 'bottom-emoji': switchICon, 'bottom-dwon': !switchICon }"
          :src="switchICon"
          alt=""
          srcset=""
          @click="showEmojiChange"
        />

        <input
          class="bottom-inp"
          @keydown.enter="sendMessage"
          v-model="newMessage"
          placeholder="输入内容..."
          type="text"
        />
        <div class="send-container">
          <img
            class="bottom-send"
            src="@/assets/img/customerImg/send.png"
            alt="图标描述"
            @click="sendMessage"
          />
        </div>
      </div>
    </template>
  </CustomerLayout>
</template>

<script setup>
import CustomerLayout from './CustomerLayout.vue'
import { onMounted, ref, nextTick } from 'vue'
import { useMessageStore } from '@/store/useMessageStore'
import { socket } from '@/socket'
// import { gsap } from 'gsap'
import data from 'emoji-mart-vue-fast/data/all.json'
// Import default CSS
import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'
import emjioIcon from '@/assets/img/customerImg/expression.png'
import downArrow from '@/assets/img/customerImg/down.png'
let emojiIndex = ref('')
emojiIndex.value = new EmojiIndex(data)

const store = useMessageStore()
const newMessage = ref('')
const isShowEmojio = ref(false)
const switchICon = ref(emjioIcon)
const isSwitchICon = ref(true)
const chatContainerRef = ref(null)
const sendMessage = () => {
  if (newMessage.value) {
    store.userMessage.push({
      id: store.userMessage.length + 1,
      content: newMessage.value,
      receiver: false
    })
    scrollToBottom()
    socket.emit('private message', newMessage.value)
    newMessage.value = ''
  }
}

const goBack = () => {
  if (store.isEmailBox == false) {
    store.toCustomer = true
  }
}
// const animate = gsap.timeline()
// nextTick(() => {
//     animate.fromTo(
//         '.message-container',
//         { opacity: 0, y: 0 },
//         {
//             duration: 0.5, opacity: 1, y: 0, onComplete: () => {
//                 // 在动画完成后，可以添加其他逻辑

//             }
//         });
// });
const showEmoji = (emoji) => {
  console.log(emoji)
  newMessage.value += emoji.native
}

const showEmojiChange = () => {
  if (isSwitchICon.value) {
    switchICon.value = downArrow
    isSwitchICon.value = false
  } else {
    switchICon.value = emjioIcon
    isSwitchICon.value = true
  }
  isShowEmojio.value = !isShowEmojio.value
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainerRef.value) {
      chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
    }
  })
}

onMounted(() => {
  // 页面加载完成后滚动到底部
  scrollToBottom()
})
socket.on('private message', (msg) => {
  console.log(msg)
  store.userMessage.push({
    id: store.userMessage.length + 1,
    content: msg,
    receiver: true
  })
  scrollToBottom()
})
socket.on('gpt message', async (stream) => {
  // 如果遇到换行符，将接收消息添加到消息数组中
  store.userMessage.push({
    id: store.userMessage.length + 1,
    content: stream,
    receiver: true
  })

  scrollToBottom()
})
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  /* 添加滚动条 */
  flex: 1;
  background-color: #f1fbff;
  width: 100%;
}

/* 自定义滚动条 */
.chat-container::-webkit-scrollbar {
  width: 0.5em;

  /* 设置滚动条宽度 */
}

/* 滚动条滑块 */
.chat-container::-webkit-scrollbar-thumb {
  background-color: #d9d9d9 !important;
  /* 设置滚动条滑块的颜色 */
  border-radius: 4px;
  /* 设置滚动条滑块的圆角 */
}

/* 滚动条滑块悬停时的样式 */
.chat-container::-webkit-scrollbar-thumb:hover {
  background-color: #80a5cc !important;
  /* 设置滚动条滑块在悬停时的颜色 */
}

.message {
  display: flex;
  align-items: flex-start;
  margin: 0.625em;
}

.avatar {
  width: 7.125em;
  height: 7.125em;
  margin-right: 0.5em;
  margin-left: 0.5em;
}

.avatar-user {
  width: 2em;
  /* height: 1.5em; */
  margin-right: 1.5em;
  margin-left: 0.5em;
  margin-bottom: 2.75em;
}

.message-text {
  padding: 1.5em;
  background-color: #e1e1e1;
  font-size: 0.9375em;
  /*white-space: pre-wrap;*/
  word-wrap: break-word;
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

.bottom-box {
  display: flex;
  height: 9em;
  align-items: center;
  position: relative;
}

.bottom-inp {
  width: 100%;
  height: 100%;
  border: none;
  padding-left: 7em;
  border-radius: 0 0 3em 3em;
  width: 75%;
}

.bottom-inp::-ms-input-placeholder {
  /* 输入内容... */
  width: 5.75em;
  height: 1.6875em;

  /* web/web正文文本 */
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 400;
  font-size: 1.125em;
  line-height: 1.6875em;
  /* identical to box height, or 150% */
  letter-spacing: 0.04em;

  /* 灰度/3 */
  color: #929292;
}

.bottom-emoji {
  width: 4.5em;
  height: 4.5em;
}

.bottom-emoji,
.bottom-dwon {
  position: absolute;
  left: 2em;
  /* 调整图标在输入框内的位置 */
  /* 其他样式 */
}

.bottom-dwon {
  width: 1.25em;
  height: 1.25em;
}

.send-container {
  position: absolute;
  right: 3em;
  /* 调整图像容器的位置
  top: 50%;
    transform: translateY(-50%);
  让图像容器垂直居中 */

  border-radius: 3.125em;
  /* 圆角 */
  background-color: var(--app-color-button-bg);
  /* 背景颜色 */
  width: 12em;
  height: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-send {
  width: 3.5em;
  height: 3.5em;
}

input:focus {
  border-color: #f1fbff;
  border-top-color: #b2dff1;
  /* 设置边框颜色为蓝色 */
  border-width: 0.0625em;
  /* 设置边框宽度 */
  /* border-style: solid; */
  /* 设置边框样式为实线 */
  outline: none;
  /* 去除默认的外部轮廓样式 */
  border-radius: none;
}

.chat-function {
  width: 100%;
  display: flex;
  padding: 0.625em 2em;
  align-items: center;
  justify-content: space-between;
  background-color: #f1fbff;
}

.function-color {
  background-color: #ffffff !important;
}

.chat-function-left {
  display: flex;
  flex: 11;
}

.chat-function-left p {
  color: #929292;
  font-size: 0.875em;
}

.chat-function-right {
  display: flex;
  align-items: center;
  flex: 2;
  justify-content: space-between;
}

.function-right-img {
  width: 1.125em;
}

.emijon-box {
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 17%;
}

.emoji-mart {
  width: 100% !important;
  height: 100% !important;
  border-radius: 0.9375em 0.9375em 0 0;
}

@media screen and (max-width: 48em) {
  .functon-phone {
    background-color: #ffffff;
    z-index: 9999;
    box-shadow: 0 -0.3125em 0.3125em rgba(0, 0, 0, 0.1);
    /* 顶部阴影样式 */
  }

  .bottom-box {
    border-top: none;
    margin: 0 3em;
  }

  .bottom-inp {
    width: 100%;
    height: 6.5em;
    padding-left: 6em;
    background-color: #f0f0f0 !important;
    border-radius: 3.125em;
  }

  .bottom-emoji {
    width: 4.5em;
    height: 4.5em;
  }

  .send-container {
    right: 0;
    width: 13em;
    height: 6em;
  }
  .chat-function {
    padding: 0.625em 3em;
  }
}
</style>

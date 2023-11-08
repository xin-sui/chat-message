<template>
    <CustomerLayout>
        <template #headerLeft>
            <img class="header-left-img" src="../../assets/img/customerImg/leftIcon.png" @click="goBack" alt="" srcset="" />
        </template>
        <template #content>
            <div class="chat-container" ref="chatContainerRef" @change="showEmojiChange">

                <div v-for="(message, index) in store.userMessage" :key="index" class="message"
                    :class="{ 'receiver-message': message.receiver, 'sender-message': !message.receiver }">
                    <img v-if="message.receiver" class="avatar" :src="store.localImagePaths[0]" :alt="message.altText" />
                    <img v-else src="../../assets/img/customerImg/user.png" class="avatar-user" alt="" srcset="" />
                    <div class="message-content">
                        <div
                            :class="{ 'message-text': true, 'message-text-left': message.receiver, 'message-text-right': !message.receiver }">
                            {{ message.content }}
                        </div>
                    </div>
                </div>

            </div>
            <div class="emijon-box" v-show="isShowEmojio">
                <Picker :showPreview="false" :data="emojiIndex" set="twitter" @select="showEmoji" />
            </div>

        </template>

        <template #bottom>
            <div class="chat-function functon-phone  " :class="{ 'function-color': isShowEmojio, }">
                <div class="chat-function-left">
                    <p>phone：123-456-789</p>
                </div>
                <div class="chat-function-right">

                    <img class="function-right-img" src="@/assets/img/customerImg/link.png" alt="" srcset="">
                    <img class="function-right-img" src="@/assets/img/customerImg/message.png" @click="store.toggleEmail"
                        alt="" srcset="">
                </div>
            </div>

            <div class="bottom-box">

                <img :class="{ 'bottom-emoji': switchICon, 'bottom-dwon': !switchICon }" :src="switchICon" alt="" srcset=""
                    @click="showEmojiChange">

                <input class="bottom-inp" @keydown.enter="sendMessage" v-model="newMessage" placeholder="输入内容..."
                    type="text" name="" id="" />
                <div class="send-container">
                    <img class="bottom-send" src="@/assets/img/customerImg/send.png" alt="图标描述" @click="sendMessage" />
                </div>


            </div>

        </template>

    </CustomerLayout>
</template>

<script setup>
import CustomerLayout from './CustomerLayout.vue';
import { onMounted, ref, nextTick } from 'vue';
import { useMessageStore } from '@/store/useMessageStore';
import { socket } from '@/socket'
import { gsap } from "gsap";
import data from "emoji-mart-vue-fast/data/all.json";
// Import default CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import emjioIcon from '@/assets/img/customerImg/expression.png'
import downArrow from '@/assets/img/customerImg/down.png'
let emojiIndex = ref('')
emojiIndex.value = new EmojiIndex(data)
socket.on("connect_error", (err) => {
    console.warn(err);
});
const store = useMessageStore()
const newMessage = ref("");
const isShowEmojio = ref(false)
const switchICon = ref(emjioIcon)
const isSwitchICon = ref(true)
const chatContainerRef = ref(null);
const sendMessage = () => {
    if (newMessage.value) {
        store.userMessage.push({
            id: store.userMessage.length + 1,
            content: newMessage.value,
            receiver: false
        })
        scrollToBottom();
        socket.emit("private message", newMessage.value);
        newMessage.value = "";
    }
};


const goBack = () => {
    if (store.isEmailBox == false) {
        store.toCustomer = true
    }

}
const animate = gsap.timeline()
nextTick(() => {
    animate.fromTo(
        '.message-container',
        { opacity: 0, y: 0 },
        {
            duration: 0.5, opacity: 1, y: 0, onComplete: () => {
                // 在动画完成后，可以添加其他逻辑

            }
        });
});
const showEmoji = (emoji) => {
    console.log(emoji);
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
            chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight;
        }
    });
};

onMounted(() => {
    // 页面加载完成后滚动到底部
    scrollToBottom();
});
socket.on('private message', (msg) => {
    console.log(msg)
    store.userMessage.push({
        id: store.userMessage.length + 1,
        content: msg,
        receiver: true
    })
    scrollToBottom();
})
socket.on('gpt message', async stream => {

    // 如果遇到换行符，将接收消息添加到消息数组中
    store.userMessage.push({
        id: store.userMessage.length + 1,
        content: stream,
        receiver: true,
    });
    scrollToBottom();

})

</script>

<style scoped>
.header-left-img {
    width: 22px;
}

.chat-container {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    /* 添加滚动条 */
    flex: 13 1 auto;
    background-color: #F1FBFF;
    width: 100%;

}

/* 自定义滚动条 */
.chat-container::-webkit-scrollbar {
    width: 8px;

    /* 设置滚动条宽度 */
}

/* 滚动条滑块 */
.chat-container::-webkit-scrollbar-thumb {

    background-color: #D9D9D9 !important;
    /* 设置滚动条滑块的颜色 */
    border-radius: 4px;
    /* 设置滚动条滑块的圆角 */
}

/* 滚动条滑块悬停时的样式 */
.chat-container::-webkit-scrollbar-thumb:hover {

    background-color: #80A5CC !important;
    /* 设置滚动条滑块在悬停时的颜色 */
}

.message {
    display: flex;
    margin: 10px;
}

.avatar {
    width: 50px;
    height: 50px;
    margin-right: 8px;
    margin-left: 8px;
}

.avatar-user {
    width: 8px;
    height: 8px;
    margin-right: 8px;
    margin-left: 8px;
    margin-bottom: 28px;
}

.message-text {
    padding: 8px;
    background-color: #e1e1e1;
    font-size: 15px;
}

.message-text-right {
    border-radius: 8px 0px 8px 8px;
    background-color: #FFFFFF;
    color: #474747;
}

.message-text-left {
    border-radius: 0 8px 8px 8px;
    background-color: #33BCEA;
    color: #FFFFFF;
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
    align-items: center;
    justify-content: center;
    position: relative;
    height: 90px;
    width: 100%;
}

.bottom-inp {
    width: 100%;
    height: 50px;
    border: none;
    padding-left: 50px;
    padding-right: 110px;
    border-radius: 50px;
    /* 保证文本不被图像遮挡 */
}

.bottom-emoji {
    width: 26px;
    height: 26px;
}

.bottom-emoji,
.bottom-dwon {
    position: absolute;
    left: 20px;
    /* 调整图标在输入框内的位置 */
    /* 其他样式 */
}

.bottom-dwon {
    width: 20px;
    height: 20px;
}

.send-container {
    position: absolute;
    right: 20px;
    /* 调整图像容器的位置 */
    top: 50%;
    /* 让图像容器垂直居中 */
    transform: translateY(-50%);
    border-radius: 50px;
    /* 圆角 */
    background-color: var(--app-color-button-bg);
    /* 背景颜色 */
    width: 88px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bottom-send {
    width: 26px;
    height: 22px;
}

input:focus {
    border-color: #F1FBFF;
    border-top-color: #B2DFF1;
    /* 设置边框颜色为蓝色 */
    border-width: 1px;
    /* 设置边框宽度 */
    /* border-style: solid; */
    /* 设置边框样式为实线 */
    outline: none;
    /* 去除默认的外部轮廓样式 */
    border-radius: 20px;
}



.chat-function {
    width: 100%;
    display: flex;
    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
    background-color: #F1FBFF;
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
}

.chat-function-right {
    display: flex;
    align-items: center;
    flex: 2;
    justify-content: space-between;
}

.function-right-img {
    width: 18px;
}

.emijon-box {
    position: absolute;
    width: 100%;
    height: 50%;
    bottom: 0;
}

.emoji-mart {
    width: 100% !important;
    height: 100% !important;
    border-radius: 15px 15px 0 0;
}



@media screen and (max-width: 768px) {

    .functon-phone {
        background-color: #ffffff;
        z-index: 9999;
        box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.1);
        /* 顶部阴影样式 */
    }

    .bottom-box {
        border-top: none;
    }

    .bottom-inp {
        width: 95%;
        background-color: #F0F0F0 !important;
        border-radius: 50px;
    }

    .bottom-emoji {
        left: 20px;
    }

    .send-container {
        right: 11px;
    }

    .bottom-inp {
        height: 40px;
    }
}
</style>

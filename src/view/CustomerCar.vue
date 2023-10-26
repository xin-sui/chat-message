<template>
    <div v-if="store.isChatVisible" @click="toggleSelect" class="message-icon right-box ">
        <div class="messsage-btn-img">
            <img src="../../src/assets/img/customerImg/imgpsh_fullsize_anim .png" alt="" />
        </div>
    </div>
    <div class="overlay" v-else>
        <transition name="select-message-fade" mode="out-in">
            <component :is="store.toCustomer?Select:Message"></component>
        </transition>
    </div>
</template>

<script setup>
import Select from '../components/customer/CustSelect.vue';
import Message from '../components/customer/CustMessage.vue';
import { nextTick } from 'vue';
import { useMessageStore } from '../store/useMessageStore';
import { gsap } from "gsap";
const store = useMessageStore()
nextTick(() => {
    gsap.from('.right-box', { duration: 1, x: 200 });
});
const toggleSelect = (() => {
    store.isChatVisible = !store.isChatVisible;
    nextTick(() => {
        gsap.fromTo('.message-container', { scale: 1.5 }, {
            duration: 1,
            scale: 1
        });
    })
})
</script>

<style scoped>
.right-box {
    position: fixed;
    height: 100%;
    right: 0px;
    bottom: 24px;
    max-width: 92px;
    max-height: 50%;
    pointer-events: all;
    /* 让右侧的 right-box 元素接收点击事件 */
}

.messsage-btn-img {
    width: 92px;
    height: 142px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.messsage-btn-img img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

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

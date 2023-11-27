<template>
    <div v-if="showChatFunBox" class="chat-function-box" :style="{ backgroundColor: funColor.value }">

        <div class="chat-function">

            <svg v-if="closeIcon" style="cursor: pointer" width="10" height="10" viewBox="0 0 10 10" fill="none"
                xmlns="http://www.w3.org/2000/svg" @click="closeIconChange">
                <rect width="1.47486" height="12.6667" rx="0.73743"
                    transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 10 1.04297)" fill="white" />
                <rect y="1.04297" width="1.47486" height="12.6667" rx="0.73743" transform="rotate(-45 0 1.04297)"
                    fill="white" />
            </svg>

            <slot name="title"> </slot>
            <div @click="toggleEmail">
                <slot name="email-icon">
                    <svg style="cursor: pointer" width="20" height="14" viewBox="0 0 20 14" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.6" y="0.6" width="18.8" height="12.8" rx="2.4" stroke="#929292" stroke-width="1.2" />
                        <rect x="1" y="2.08789" width="1.2" height="9.89859" transform="rotate(-65 1 2.08789)"
                            fill="#929292" />
                        <rect width="1.2" height="9.89694"
                            transform="matrix(-0.422618 -0.906308 -0.906308 0.422618 18.9375 2.08789)" fill="#929292" />
                    </svg>
                </slot>
            </div>


        </div>

    </div>
</template>

<script setup>
import { ref, computed, nextTick, watchEffect } from 'vue'
import { useMessageStore } from '@/store/useMessageStore'
import { gsap } from 'gsap'
const store = useMessageStore()
const showChatFunBox = ref(true)
const emit = defineEmits(['before-close'])
const props = defineProps({
    backColor: {
        type: String,
        default: '#DCF2F8'
    },
    closeIcon: {
        type: Boolean,
        default: false
    },
    animate: {
        type: Boolean,
        default: false
    }
})

const funColor = computed(() => {
    const color = ref('')
    switch (props.backColor) {
        case 'blue':
            console.log('====')
            color.value = '#33BCEA'
            break
    }
    return color
})
const toggleEmail = () => {
    store.showEmailBox = !store.showEmailBox
}
const closeIconChange = () => {
    showChatFunBox.value = false
    gsap.fromTo('.chat-function-box', {
        x: -50, // 从右侧移动
        opacity: 0,
    }, {
        x: 0, // 停在左侧
        opacity: 1,
        duration: 1
    });
    emit('before-close')
}
const isAnimate = ref(props.animate)
console.log(isAnimate.value);

watchEffect(() => {
    if (props.animate == true) {
        // 页面渲染之后播放动画
        nextTick(() => {
            gsap.fromTo('.chat-function-box', {
                x: 50, // 从右侧移动
                opacity: 0,
            }, {
                x: 0, // 停在左侧
                opacity: 1,
                duration: 1
            });
        })
    }
})




</script>

<style lang="scss" scoped>
.chat-function-box {
    width: 100%;
    display: flex;
    z-index: 99999999;
    flex-direction: column;
    padding: 0.625em 2em;
    align-items: center;

    background-color: #dcf2f8;

    .chat-function {
        display: flex;
        height: 3.75em;
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }
}
</style>

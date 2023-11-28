<template>
    <button :class="{ 'active': props.isActive }" class="send-container" :disabled="props.disabled" :style="buttonStyle">
        <slot name="icon"></slot>
    </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    size: {
        type: String,
        default: 'medium'
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false
    }
})

// 根据传入的 size ref 设置不同的大小样式
const buttonStyle = computed(() => {
    let sizeStyle = ''

    switch (props.size) {
        case 'small':
            sizeStyle = 'width: 6em; '
            break
        case 'large':
            sizeStyle = 'width: 34.9em;'
            break
        default:
            sizeStyle = 'width: 8em; '
            break
    }

    return sizeStyle
})
</script>

<style lang="scss" scoped>
.send-container {
    border-radius: 3.125em;
    /* 圆角 */
    background-color: var(--app-color-button-bg);
    /* 背景颜色 */
    height: 4em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.send-container:hover {
    background-color: var(--app-color-button-bg-hover);
}

.active {
    background-color: #d4d4d4 !important;
}

button {
    border: none;
}
</style>

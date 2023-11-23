<template>
  <div class="alert-box" :class="[statusClass]">
    <p>{{ props.message }}</p>
    <slot name="description"></slot>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { defineProps, computed, nextTick } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'success'
  }
});

// 根据传入的 status 属性值计算动态类名
const statusClass = computed(() => {
  if (props.status === 'success') {
    return 'success';
  } else if (props.status === 'error') {
    return 'error';
  } else {
    return 'success';
  }
});
// 动画结束后隐藏元素
const hideElement = () => {
  // 隐藏alert-box元素
  gsap.set('.alert-box', { display: 'none' });
}
// 页面渲染之后播放动画
nextTick(() => {
  // 使用GSAP添加进入动画到content-title和select-box元素
  gsap.fromTo('.alert-box', { opacity: 0, y: -10 }, {
    duration: 1,
    opacity: 1,
    y: 0,
    onComplete: () => {
      // 动画完成后，过几秒后消失
      setTimeout(() => {
        gsap.to('.alert-box', { duration: 1, opacity: 0, y: -10, onComplete: hideElement });
      }, 3000); // 在这里设置你想要的等待时间，这里是5秒
    }
  });

})
</script>

<style lang="scss" scoped>
.alert-box {
  border: none;
  box-sizing: border-box;
  margin: 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
  height: 3em;
  max-height: 8em;
}

.success {
  color: #9acc5b;
  background-color: #f8fff5;
}

.error {
  color: #ff5b5b;
  background-color: #fff5f5;
}
</style>

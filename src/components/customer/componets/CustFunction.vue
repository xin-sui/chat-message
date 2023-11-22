<template>
  <div class="chat-function" :style="{ backgroundColor: funColor.value }">
    <slot name="icon"></slot>
    <div class="chat-function-left">
      <slot name="title"> </slot>
    </div>
    <div class="chat-function-right">
      <slot name="email-icon">
        <svg
          @click="toggleEmail"
          style="cursor: pointer"
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
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  backColor: {
    type: String,
    default: '#DCF2F8'
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
</script>

<style lang="scss" scoped>
.chat-function {
  width: 100%;
  display: flex;
  height: 3.75em;
  padding: 0.625em 2em;
  align-items: center;
  justify-content: space-between;
  background-color: #dcf2f8;
}

.chat-function-right {
  display: flex;
  align-items: center;
  /*flex: 2;*/
  justify-content: space-between;
}
</style>

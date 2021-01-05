<!--
 * @Author: zyj
 * @Date: 2021-01-05 14:18:05
 * @LastEditors: zyj
 * @LastEditTime: 2021-01-05 17:38:30
 * @Description: file content
 * @FilePath: /vite-element-plus/src/components/Circle.vue
-->
<template>
  <div>
    <span>
      <svg class="circular" viewBox="25 25 50 50" :style="spinnerStyle">
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          :style="{ stroke: color }"
          class="path"
        />
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, computed } from "vue";
export default defineComponent({
  name: "Loading",
  props: {
    color: {
      type: String,
      default: "#c9c9c9",
    },
    size: {
      type: String,
      default: "50px",
    },
  },
  emits: ["update:show"],
  setup(props, context: SetupContext) {
    const close = () => context.emit("update:show", !props.show);
    const spinnerStyle = computed(() => ({
      color: props.color,
      width: props.size,
      height: props.size,
    }));
    console.log("spinnerStyle", spinnerStyle.value);
    return {
      close,
      spinnerStyle,
      slots: context.slots,
    };
  },
});
</script>

<style lang="scss" scoped>
.circular {
  /* width: 60px;
  height: 60px; */
  animation: loading-rotate 1.5s infinite ease-in-out; /*给svg也加上一个旋转动画*/
  .path {
    stroke: #409eff;
    stroke-width: 2;
    animation: loading-dash 1.5s ease-in-out infinite;
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 126; /*实线部分1，虚线部分126*/
    stroke-dashoffset: 0; /*前面1/126显示实线，后面125显示空白*/
  }

  50% {
    stroke-dasharray: 95, 126; /*实线部分95，虚线部分126*/
    stroke-dashoffset: -31px; /*顺时针偏移31/126，即前31/126显示空白，后面3/4显示线条*/
  }

  to {
    stroke-dasharray: 6, 120; /*实线部分6，虚线部分120*/
    stroke-dashoffset: -120px; /*最后顺时针偏移120/126，即前120/126显示空白，后面6点显示线条部分*/
  }
}
@keyframes loading-rotate {
  to {
    transform: rotate(1turn);
  }
}
</style>

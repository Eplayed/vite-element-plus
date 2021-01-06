<!--
 * @Author: zyj
 * @Date: 2021-01-05 14:18:05
 * @LastEditors: zyj
 * @LastEditTime: 2021-01-06 13:54:47
 * @Description: file content
 * @FilePath: /vite-element-plus/src/components/Circle.vue
-->

<template>
  <div :ref="loadingDom" class="load-mask" :style="backgroundColor">
    <span class="load-style">
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
/**
 * @description: 
 * @param {color} loading 圈的颜色
 * @param {size} 圈的大小，字符串带px
 * @param {targetDom} 渲染loading位置，默认 父节点，参数body时全局，暂时不支持自定义dom位置
 * @param {bgColor} 遮罩层的背景色，传入background-color 属性值
 */
<script lang="ts">
import { createApp } from "vue";
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
    targetDom: {
      type: String,
      default: "current",
    },
    bgColor:{
       type: String,
      default: "hsla(0,0%,100%,.7)",
    }
  },
  emits: ["update:show"],
  setup(props, context: SetupContext) {
    const { targetDom } = props;
    const loadingDom = (el) => {
      console.log("el", el);
      const currentEl = el;
      console.log('targetDom',targetDom)
      if (targetDom == "body") {
        document.body.appendChild(currentEl);
      } else {
        currentEl.parentElement.style.position = 'relative'
        currentEl.parentElement.appendChild(currentEl);
      }
    };
    const close = () => context.emit("update:show", !props.show);
    const spinnerStyle = computed(() => ({
      color: props.color,
      width: props.size,
      height: props.size,
    }));
    const backgroundColor  = computed(()=>({
      'background-color':props.bgColor
    }))
    return {
      close,
      spinnerStyle,
      backgroundColor,
      loadingDom,
      slots: context.slots,
    };
  },
});
</script>

<style lang="scss" scoped>
.load-mask{
  position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: hsla(0,0%,100%,.7);
    z-index: 999;
}
.load-style {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  margin-top: -25px;
}
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

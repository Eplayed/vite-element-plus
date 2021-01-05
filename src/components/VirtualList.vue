<!--
 * @Author: zyj
 * @Date: 2020-12-31 13:26:46
 * @LastEditors: zyj
 * @LastEditTime: 2021-01-05 14:07:33
 * @Description: file content
 * @FilePath: /vite-element-plus/src/components/VirtualList.vue
-->
<template>
  <div class="virtual" @scroll="scroll" :style="{ height: 400 + 'px' }">
    {{ itemHeight }}
    <div class="list" :style="{ height: dataLengh * itemHeight + 'px' }">
      <ul :style="{ 'margin-top': `${scrollTop}px` }">
        <li
          v-for="(item, index) in visiablelist"
          :key="index"
          :style="{ height: itemHeight + 'px' }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, computed } from "vue";
export default {
  setup(prop, context) {
    const dataLengh = 100;
    const itemHeight = 40;
    const data = reactive({
      scrollTop: 0,
      startIndex: 0,
      endIndex: 10,
    });
    function scroll(e) {
      const scrollTop = e.target.scrollTop;
      data.scrollTop = e.target.scrollTop;
      data.startIndex = Math.floor(scrollTop / itemHeight);
      data.endIndex = data.startIndex + 10;
    }
    const list = new Array(dataLengh);
    for (var i = 0; i < list.length; i++) {
      list[i] = "这是第" + i + "段文本";
    }
    const visiablelist = computed(() => {
      return list.slice(data.startIndex, data.endIndex);
    });
    return {
      ...toRefs(data),
      scroll,
      visiablelist,
      dataLengh,
      dataLengh,
      itemHeight,
    };
  },
};
</script>
<style scoped>
.virtual {
  border: solid 1px #eee;
  margin-top: 10px;
  height: 400px;
  overflow: auto;
}
.list {
  overflow: hidden;
}
ul {
  background: #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  outline: solid 1px #fff;
}
</style>

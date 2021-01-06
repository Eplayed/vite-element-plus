<!--
 * @Author: zyj
 * @Date: 2020-12-31 13:26:46
 * @LastEditors: zyj
 * @LastEditTime: 2021-01-06 15:30:58
 * @Description: file content
 * @FilePath: /vite-element-plus/src/components/VirtualList.vue
-->
<template>
  <div class="virtual" @scroll="scroll" :style="{ height: 700 + 'px' }">
    {{ itemHeight }}
    <div class="list" :style="{ height: dataLengh * itemHeight + 'px' }">
      <ul :style="{ 'margin-top': `${scrollTop}px` }">
        <div v-if="istable">
          <el-table
            height="600px"
            border
            :data="visiablelist"
            style="width: 100%"
          >
            <slot />
          </el-table>
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
        <li
          v-else
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
  props: {
    list: {
      type: Array,
      default: [],
    },
    istable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const dataLengh = 100;
    const itemHeight = 48;
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
      console.log("startIndex", data.startIndex);
      console.log("endIndex", data.endIndex);
    }
    const { list } = props;
    const visiablelist = computed(() => {
      return list.slice(data.startIndex, data.endIndex);
    });
    const istabled = props.istable;
    return {
      ...toRefs(data),
      scroll,
      visiablelist,
      dataLengh,
      istabled,
      itemHeight,
    };
  },
};
</script>
<style scoped>
.virtual {
  border: solid 1px #eee;
  margin-top: 10px;
  height: 700px;
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

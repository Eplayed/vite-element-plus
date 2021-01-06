<!--
 * @Author: zyj
 * @Date: 2020-12-26 15:12:46
 * @LastEditors: zyj
 * @LastEditTime: 2021-01-06 15:34:03
 * @Description: file content
 * @FilePath: /vite-element-plus/src/views/Components/VirtualListTest.vue
-->
<template>
  <div class="content">
    主页

    <!-- <loading color="#409eff"  size="50px"></loading> -->
    
      <virtualList :list="tableData" :istable="true">
        
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </virtualList>
  
  </div>
</template>

<script lang="ts">
// import Loading from '/@/components/Circle.vue'
import VirtualList from "/@/components/VirtualList.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "VirtualListTest",
  components: {
    // Loading
    VirtualList,
  },
  setup() {
    const dataLengh = 100;
    const tableList = new Array(dataLengh);
    for (var i = 0; i < tableList.length; i++) {
      tableList[i] = {
        date: "2016-05-02",
        name: `王小${i}`,
        address: "上海市普陀区金沙江路 1518 弄",
      };
    }
    console.log("tableList", tableList);
    const tableData = tableList;
    return {
      tableData,
    };
  },
});
</script>

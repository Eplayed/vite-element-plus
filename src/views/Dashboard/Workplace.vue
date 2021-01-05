<!--
 * @Author: zyj
 * @Date: 2020-12-26 15:12:46
 * @LastEditors: zyj
 * @LastEditTime: 2021-01-05 17:31:28
 * @Description: file content
 * @FilePath: /vite-element-plus/src/views/Dashboard/Workplace.vue
-->
<template>
    <div class='content'>
        主页
        <loading color="#409eff" size="50px"></loading>
    </div>
</template>

<script lang="ts">
import Loading from '/@/components/Circle.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Workplace',
    components:{
        Loading
    }
})
</script>
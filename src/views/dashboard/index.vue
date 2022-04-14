<template>
  <div style="padding: 16px; background-color: #fff">
    <el-button @click="httpRequest" type="primary">
      测试HTTP请求
    </el-button>
  </div>
</template>

<script lang="ts">
import { demoRequest } from '@/api/api'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const test = ref('')

    async function httpRequest () {
      try {
        const { data } = await demoRequest({})
        test.value = data
      } catch (err) {
        console.log(err)
      }
    }

    return {
      httpRequest
    }
  }
})
</script>

<style lang="scss" scoped>
</style>

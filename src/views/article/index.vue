<template>
<div>
  <el-button type="primary" size="mini">发布文章</el-button>
  <dg-table :api="getArticles" :columns="columns" :hasPagination="false"></dg-table>
</div>
</template>
<script lang="ts" setup>
import { getArticles } from '@/api/api';

const columns = [
  { isVisible: true, type: 'order', label: '序号' },
  { isVisible: true, prop: 'title', label: '标题' },
  { isVisible: true, prop: 'content', label: '内容' }
]
</script>
<style lang='scss' scoped>

</style>
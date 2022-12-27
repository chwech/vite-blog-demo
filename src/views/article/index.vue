<template>
<dg-flex-container class="dg-pos-r">
    <template #header>
      <el-button type="primary" size="mini" @click="refresh">刷新</el-button>
      <el-button type="primary" size="mini" @click="open">发布文章</el-button>
    </template>
  <dg-table :api="getArticles" :columns="columns" ref="tableRef" :button-group="buttonGroup"></dg-table>
  <edit-dialog ref="editDialog" @success="refresh"></edit-dialog>
</dg-flex-container>
</template>
<script lang="ts" setup>
import EditDialog from './components/EditDialog.vue';
import { deleteArticle, getArticles } from '@/api/api';
import { ref } from 'vue';

const columns = [
  { isVisible: true, type: 'order', label: '序号' },
  { isVisible: true, prop: 'title', label: '标题' },
  { isVisible: true, prop: 'content', label: '内容' },
  { isVisible: true, prop: 'create_at', label: '新增时间' },
  { isVisible: true, prop: 'update_at', label: '更新时间' }
]
const buttonGroup = [
  {
    name: '删除',
    type: 'danger',
    isConfirm: true,
    handler: async (row: any) => {
      await deleteArticle(row.id)
      refresh()
    }
  }
]
const editDialog = ref()
const tableRef = ref()
const open = () => {
  editDialog.value.open()
}
const refresh = () => {
  tableRef.value.refresh()
}
</script>
<style lang='scss' scoped>

</style>
<template>
<dg-flex-container class="dg-pos-r">
    <template #header>
      <el-button type="primary" size="mini" @click="refresh">刷新</el-button>
      <el-button type="primary" size="mini" @click="open">新增分类</el-button>
    </template>
  <dg-table :api="getCategory" :columns="columns" ref="tableRef" :button-group="buttonGroup" :hasPagination="false" row-key="id"></dg-table>
  <edit-dialog ref="editDialog" @success="refresh"></edit-dialog>
</dg-flex-container>
</template>
<script lang="ts" setup>
import EditDialog from './components/EditDialog.vue';
import { deleteCategory, getCategory } from '@/api/api';
import { ref } from 'vue';

const columns = [
  { isVisible: true, prop: 'name', label: '分类名称' },
  { isVisible: true, prop: 'description', label: '描述' },
  { isVisible: true, prop: 'slug', label: 'slug' },
]
const buttonGroup = [
  {
    name: '删除',
    type: 'danger',
    isConfirm: true,
    handler: async (row: any) => {
      await deleteCategory(row.id)
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
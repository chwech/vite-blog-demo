<template>
  <dg-edit-dialog v-model="visible" :title="title" width="30%" @on-cancel="handleCancel">
    <dg-form ref="formRef" :config="formConf" />
    <template #footer>
      <div class="dialog-footer">
        <el-button type="info" size="small" @click="handleCancel"> 取消 </el-button>
        <el-button type="primary" size="small" @click="handleSubmit" :loading="loading"> 保存 </el-button>
      </div>
    </template>
  </dg-edit-dialog>
</template>
<script lang="ts" setup>
// import { addRole, updateRole } from '@/api/modules/user'
// import { useValidator } from '@/hooks/useValidator'
import { getCategory, publishArticle } from '@/api/api';
import { DgForm } from '@degon/admin-component-vue3'
import { ConfigModel } from '@degon/admin-component-vue3/lib/components/form/src/interface'
import { computed, reactive, ref, nextTick } from 'vue'

const emit = defineEmits<{
    (event: 'success'): void
  }>(),
  loading = ref(false),
  options = ref([]),
  // { requiredValidator } = useValidator(),
  visible = ref(false),
  isEdit = ref(false),
  title = computed(() => (isEdit.value ? '编辑' : '新增')),
  formRef = ref<InstanceType<typeof DgForm>>(),
  formConf = reactive<ConfigModel>({
    model: {},
    hideButtons: true,
    areas: [
      {
        name: '新增/编辑角色',
        labelWidth: '100px',
        fields: [
          {
            __config__: {
              prop: 'title',
              label: '标题',
              type: 'text',
              // rules: [requiredValidator('请输入角色名称')],
            },
          },
          {
            __config__: {
              prop: 'categoryId',
              label: '分类',
              type: 'cascader',
            },
            __content__: {
              options,
              props: {
                checkStrictly: true,
                emitPath: false,
                label: 'name',
                value: 'id'
              }
            }
          },
          {
            width: '100%',
            __config__: {
              prop: 'content',
              label: '内容',
              type: 'text',
            },
            __content__: {
              type: 'textarea',
            },
          },
        ],
      },
    ],
  }),
  handleSubmit = async () => {
    try {
      loading.value = true
      await formRef.value?.submit()
      if (isEdit.value) {
        // await updateRole(formConf.model.id, { ...formConf.model })
      } else {
        await publishArticle({ ...formConf.model })
      }
      emit('success')
      close()
    } finally {
      loading.value = false
    }
  },
  handleCancel = () => {
    formRef.value?.reset()
    visible.value = false
  },
  open = (data?: any) => {
    visible.value = true
    isEdit.value = !!data

    nextTick(() => {
      if (data) {
        formConf.model = {
          ...data,
        }
      }
    })
  },
  close = () => {
    handleCancel()
  }


  getCategory().then(data => {
    options.value = [{ name: '无', id: 0 }].concat(data.data)
  })

defineExpose({
  open,
})
</script>
<style lang="scss" scoped></style>

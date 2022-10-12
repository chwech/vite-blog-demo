<template>
  <div style="padding: 16px; background-color: #fff">
    <el-button @click="httpRequest" type="primary">
      测试HTTP请求
    </el-button>


    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="http://frp.chwech.com/upload/file"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="3"
      :on-exceed="handleExceed"
    >
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </el-upload>


  </div>
</template>

<script lang="ts">
import { demoRequest } from '@/api/api'
import { defineComponent, ref } from 'vue'
import { ElMessage, ElMessageBox, UploadProps, UploadUserFile } from 'element-plus'
export default defineComponent({
  setup () {

const fileList = ref<UploadUserFile[]>([
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}



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
      httpRequest,
      fileList,
      handlePreview,
      handleRemove,
      beforeRemove,
      handleExceed
    }
  }
})
</script>

<style lang="scss" scoped>
</style>

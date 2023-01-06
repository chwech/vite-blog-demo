<template>
<el-upload
  class="upload-demo"
  drag
  action="http://upload-z2.qiniup.com"
  multiple
  :data="data"
  :before-upload="beforeUpload"
  :on-success="onSuccess"
>
  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
  <div class="el-upload__text">
    Drop file here or <em>click to upload</em>
  </div>
  <template #tip>
    <div class="el-upload__tip">
      jpg/png files with a size less than 500kb
    </div>
  </template>
</el-upload>
</template>
<script lang='ts' setup>
import { getQiniuToken, getQiniuDomains } from '@/api/api';
import { UploadFile, UploadFiles } from 'element-plus';
import { reactive } from 'vue';


const data = reactive({
  token: '',
  key: ''
})

const beforeUpload = (file: any) => {
  const key = `blog-admin/media/${file.name}`
  return getQiniuToken({
    overwrite: 1,
    key: key,
    returnBody: '{"key":"$(key)","hash":"$(etag)","size":$(fsize),"name":"$(fname)","mimeType":"$(mimeType)"}'
  }).then(({data: token}) => {  
    data.token = token
    data.key = key
    
  })
}

const onSuccess = (response:any, file: UploadFile, files: UploadFiles) => {
  console.log(response, file, files)
}

getQiniuDomains('www-chwech-com')
</script>
<style lang='scss' scoped>

</style>
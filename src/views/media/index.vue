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

<div>
  <div v-for="item of list">
    <img :src="'//cdn.chwech.com/' + item.url" alt="" width="100" height="100">
    <el-button type="danger" @click="onDelte(item.url)">删除</el-button>
  </div>
</div>
</template>
<script lang='ts' setup>
import { getQiniuToken, getQiniuDomains, createMedia, getMedia, deleteMedia } from '@/api/api';
import { UploadFile, UploadFiles } from 'element-plus';
import { reactive, ref } from 'vue';


const data = reactive({
  token: '',
  key: ''
})

const beforeUpload = (file: any) => {
  const key = `blog-admin/media/${file.name}`
  return getQiniuToken({
    overwrite: 1,
    key: key,
    returnBody: '{"url":"$(key)","hash":"$(etag)","size":$(fsize),"name":"$(fname)","mimeType":"$(mimeType)", "width": $(imageInfo.width), "height": $(imageInfo.height)}'
  }).then(({data: token}) => {  
    data.token = token
    data.key = key
    
  })
}

const onSuccess = async (response:any, file: UploadFile, files: UploadFiles) => {
  console.log(response, file, files)
  await createMedia(response)
  await getList()
}

getQiniuDomains('www-chwech-com')

const list = ref<any[]>([])
const getList = () => {
  return getMedia().then(res => {
    list.value = res.data.data
  })
}
getList()

const onDelte = async (key: string) => {
  await deleteMedia(key)
  await getList()
}
</script>
<style lang='scss' scoped>

</style>
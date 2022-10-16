<template>
  <div>
    <el-upload
      v-loading="loading"
      class="uploadImg"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="onHttpRequest"
      :limit="1"
      :before-upload="beforeUpdate"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="提示"
      :visible.sync="previewDialog"
      width="50%"
    >
      <img style="width: 100%;" :src="previewImg">
    </el-dialog>

  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDugGbLzRhhWMC73qSq6C7qNjutJdqulPu',
  SecretKey: 'ShkfS3UgpqiYK0Xt5Whv6FXsEUsBVmz1'
})
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      fileList: [
        // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      previewDialog: false,
      previewImg: '',
      loading: false
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({
        name: 'default', url: this.defaultUrl
      })
    }
  },
  methods: {
    onPreview(file) {
      this.previewImg = file.url
      this.previewDialog = true
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'renzi-1314348537', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          // console.log(JSON.stringify(progressData))
          // 这个就是上传的百分比
          // params.percent 表示当前上传的进度
        }
      }, (err, data) => {
        if (err) return this.$message.error('上传图片失败')
        this.loading = false
        this.$emit('on-success', {
          imgUrl: 'https://' + data.Location
        })
      })
    },
    beforeUpdate(file) {
      const allowTypes = ['image/jpeg', 'image/gif']
      const ishas = allowTypes.includes(file.type)
      if (!ishas) {
        this.$message.error('亲，只能上传' + allowTypes.join('、') + '类型文件')
        return false
      }
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片不能超过1mb')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.uploadImg{
    width: 148px;
    height: 148px;
    overflow: hidden;
}
</style>

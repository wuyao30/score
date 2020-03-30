<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="标题" prop="name">
        <el-input v-model="form.name" width="80" />
      </el-form-item>
      <el-form-item label="单位" prop="company">
        <el-input v-model="form.company" width="80" />
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-input v-model="form.department" width="80" />
      </el-form-item>
      <el-form-item label="奖项名称" prop="prizeId">
        <el-select v-model="form.prizeId" placeholder="请选择奖项名称">
          <el-option v-for="item in prizeNameOptions" :key="item.prizeId" :label="item.specificCategoryName" :value="item.id" :disabled="item.disabled" />
        </el-select>
      </el-form-item>
      <el-form-item label="照片">
        <el-upload
          class="upload-demo"
          :on-remove="handleRemovePicture"
          :before-remove="beforeRemovePicture"
          :on-success="handlerSuccessPicture"
          :on-error="handlerErrorPicture"
          action="http://localhost:9528/dev-api/api/upload"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="简介" prop="reportInfo">
        <el-input v-model="form.reportInfo" :autosize="{ minRows: 2, maxRows: 99}" type="textarea" placeholder="请输入简介信息" />
      </el-form-item>
      <el-form-item label="附件">
        <el-upload
          class="upload-demo"
          action="http://localhost:9528/dev-api/api/upload"
          :on-remove="handleRemoveFile"
          :before-remove="beforeRemoveFile"
          :on-success="handlerSuccessFile"
          :on-error="handlerErrorFile"
          :limit="5"
          :on-exceed="handleExceedFile"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMainPrizeKind, getSpecificPrizeKind } from '../../api/prize'

export default {
  data() {
    return {
      prizeNameOptions: [{ id: -1, specificCategoryName: '请先选择奖项大类', disabled: true }],
      form: {
        name: '',
        company: '',
        department: '',
        prizeId: undefined,
        reportInfo: '',
        formPictures: [],
        formFiles: []
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        specId: [
          { required: true, message: '请选择具体奖项', trigger: 'change' }
        ],
        reportInfo: [
          { required: true, message: '请输入简介信息', trigger: 'blur' }
        ]
      },
      temp: {
        reportId: undefined,
        prizeKind: undefined,
        prizeName: undefined,
        reportPhotos: [],
        reportInfo: undefined,
        annex: []
      }
    }
  },
  created() {
    this.fetchPrizesNames()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          console.log(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    fetchPrizesNames() {
      getSpecificPrizeKind().then(response => {
        this.prizeNameOptions = response.data.specificCategory
      })
    },
    handlerSuccessFile(response, file, fileList) {
      this.form.formFiles.push({
        url: response.data.url,
        name: file.name
      })
    },
    handlerErrorFile(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('上传附件失败，请刷新重试')
    },
    handleRemoveFile(file, fileList) {
      let FileIndex = this.form.formFiles.filter((elem, index) => {
        if (elem.name == file.name) {
          return index
        }
      })
      this.form.formFiles.splice(FileIndex, 1)
      console.log(this.form.formFiles)
    },
    handleExceedFile(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemoveFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handlerSuccessPicture(response, file, fileList) {
      console.log(file, fileList)
      this.form.formPictures.push({
        url: response.data.url,
        name: file.name
      })
      console.log(this.form.formPictures)
    },
    handlerSuccessPicture(response, file, fileList) {
      console.log(file, fileList)
      this.form.formPictures.push({
        url: response.data.url,
        name: file.name
      })
      console.log(this.form.formPictures)
    },
    handlerErrorPicture(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('上传图片失败，请刷新重试')
    },
    handleRemovePicture(file, fileList) {
      console.log(file)
      console.log(this.form.formPictures)
      let PictureIndex = this.form.formPictures.filter((elem, index) => {
        if (elem.name == file.name) {
          return index
        }
      })
      console.log(PictureIndex)
      this.form.formPictures.splice(PictureIndex, 1)
      console.log(this.form.formPictures)
    },
    beforeRemovePicture(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>
.app-container{
  width: 800px;
}
</style>


<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="标题" prop="reportName">
        <el-input v-model="form.reportName" width="80" />
      </el-form-item>
      <el-form-item label="单位" prop="reportCompany">
        <el-input v-model="form.reportCompany" width="80" />
      </el-form-item>
      <el-form-item label="部门" prop="reportDepartment">
        <el-input v-model="form.reportDepartment" width="80" />
      </el-form-item>
      <el-form-item label="奖项名称" prop="prizeId">
        <el-select v-model="form.prizeId" placeholder="请选择奖项名称">
          <el-option v-for="item in prizeNameOptions" :key="item.prizeId" :label="item.prizeName" :value="item.prizeId" />
        </el-select>
      </el-form-item>
      <el-form-item label="照片">
        <el-upload
          class="upload-demo"
          :on-remove="handleRemovePicture"
          :before-remove="beforeRemovePicture"
          :on-success="handlerSuccessPicture"
          :on-error="handlerErrorPicture"
          action="http://139.224.135.165:8080/assess/report/addreportphoto"
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
          action="http://139.224.135.165:8080/assess/report/addreportphoto"
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
import { getSpecificPrizeKind, uploadReport } from '../../api/prize'

export default {
  data() {
    return {
      prizeNameOptions: [],
      form: {
        reportName: '',
        reportCompany: '',
        reportDepartment: '',
        prizeId: undefined,
        reportInfo: '',
        reportphotos: [],
        reportdocuments: []
      },
      rules: {
        reportName: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        reportCompany: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        reportDepartment: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        prizeId: [
          { required: true, message: '请选择具体奖项', trigger: 'change' }
        ],
        reportInfo: [
          { required: true, message: '请输入简介信息', trigger: 'blur' }
        ]
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
          uploadReport(this.form).then(response => {
            if (response.errno == 20000) {
              this.$message.success('upload success')
            } else {
              this.$message.warning('upload failure')
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    fetchPrizesNames() {
      getSpecificPrizeKind().then(response => {
        this.prizeNameOptions = response.data
      })
    },
    handlerSuccessFile(response, file, fileList) {
      this.form.reportdocuments.push({
        documentUrl: response.data.url,
        documentName: file.name
      })
    },
    handlerErrorFile(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('上传附件失败，请刷新重试')
    },
    handleRemoveFile(file, fileList) {
      let FileIndex = this.form.reportdocuments.filter((elem, index) => {
        if (elem.documentName == file.name) {
          return index
        }
      })
      this.form.reportdocuments.splice(FileIndex, 1)
    },
    handleExceedFile(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemoveFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handlerSuccessPicture(response, file, fileList) {
      this.form.reportphotos.push({
        photoUrl: response.data.url,
        name: file.name
      })
    },
    handlerErrorPicture(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('上传图片失败，请刷新重试')
    },
    handleRemovePicture(file, fileList) {
      let PictureIndex = this.form.reportphotos.filter((elem, index) => {
        if (elem.name == file.name) {
          return index
        }
      })
      this.form.reportphotos.splice(PictureIndex, 1)
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


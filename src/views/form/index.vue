<template>
  <div class="app-container">
    <div class="filter-container">
      <span class="title-text">奖项名称</span>
      <el-select v-model="form.prizeId" placeholder="请选择奖项名称" @change="HandleChange">
        <el-option v-for="item in prizeNameOptions" :key="item.prizeId" :label="item.prizeName" :value="item.prizeId" />
      </el-select>
    </div>
    <el-form v-if="FormVisible" ref="form" :model="form" label-width="120px">
        <el-form-item :label="options[0].optionName" v-if="options[0].visible">
          <el-input v-model="form.reportName" width="80" />
        </el-form-item>
        <el-form-item :label="options[1].optionName" v-show="options[1].visible">
          <el-input v-model="form.reportCompany" width="80" />
        </el-form-item>
        <el-form-item :label="options[2].optionName" v-show="options[2].visible">
          <el-input v-model="form.reportDepartment" width="80" />
        </el-form-item>
        <el-form-item :label="options[3].optionName" v-show="options[3].visible">
          <el-input v-model="form.reportInfo" :autosize="{ minRows: 2, maxRows: 99}" type="textarea" placeholder="请输入简介信息" />
        </el-form-item>
        <el-form-item :label="options[4].optionName" v-show="options[4].visible">
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
        <el-form-item :label="options[5].optionName" v-show="options[5].visible">
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
        <el-form-item :label="options[6].optionName" v-show="options[6].visible">
          <el-upload
            class="upload-demo"
            action="http://139.224.135.165:8080/assess/report/addreportphoto"
            :on-remove="handleRemoveDeedsFile"
            :before-remove="beforeRemoveDeedsFile"
            :on-success="handlerSuccessDeedsFile"
            :on-error="handlerErrorDeedsFile"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="options[7].optionName" v-show="options[7].visible">
          <el-upload
            class="upload-demo"
            action="http://139.224.135.165:8080/assess/report/addreportphoto"
            :on-remove="handleRemoveHonorFile"
            :before-remove="beforeRemoveHonorFile"
            :on-success="handlerSuccessHonorFile"
            :on-error="handlerErrorHonorFile"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="options[8].optionName" v-show="options[8].visible">
          <el-upload
            class="upload-demo"
            action="http://139.224.135.165:8080/assess/report/addreportphoto"
            :on-remove="handleRemoveQualificationFile"
            :before-remove="beforeRemoveQualificationFile"
            :on-success="handlerSuccessQualificationFile"
            :on-error="handlerErrorQualificationFile"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="options[9].optionName" v-show="options[9].visible">
          <el-upload
            class="upload-demo"
            action="http://139.224.135.165:8080/assess/report/addreportphoto"
            :on-remove="handleRemoveFormFile"
            :before-remove="beforeRemoveFormFile"
            :on-success="handlerSuccessFormFile"
            :on-error="handlerErrorFormFile"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="options[10].optionName" v-show="options[10].visible">
          <el-input v-model="form.otherText1" width="80" />
        </el-form-item>
        <el-form-item :label="options[11].optionName" v-show="options[11].visible">
          <el-input v-model="form.otherText2" width="80" />
        </el-form-item>
        <el-form-item :label="options[12].optionName" v-show="options[13].visible">
          <el-upload
            class="upload-demo"
            action="http://139.224.135.165:8080/assess/report/addreportphoto"
            :on-remove="handleRemoveOther1File"
            :before-remove="beforeRemoveOther1File"
            :on-success="handlerSuccessOther1File"
            :on-error="handlerErrorOther1File"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="options[13].optionName" v-show="options[13].visible">
          <el-upload
            class="upload-demo"
            action="http://139.224.135.165:8080/assess/report/addreportphoto"
            :on-remove="handleRemoveOther2File"
            :before-remove="beforeRemoveOther2File"
            :on-success="handlerSuccessOther2File"
            :on-error="handlerErrorOther2File"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="options[14].optionName" v-show="options[14].visible">
          <el-upload
            class="upload-demo"
            action="http://139.224.135.165:8080/assess/report/addreportphoto"
            :on-remove="handleRemoveOther3File"
            :before-remove="beforeRemoveOther3File"
            :on-success="handlerSuccessOther3File"
            :on-error="handlerErrorOther3File"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { getSpecificPrizeKind, uploadReport, queryPrizeOptions } from '../../api/prize'

export default {
  data() {
    return {
      FormVisible: false,
      temp: {},
      options: [
        {
          id: 1,
          optionName: '标题',
          visible: true
        },
        {
          id: 2,
          optionName: '单位',
          visible: true
        },
        {
          id: 3,
          optionName: '部门',
          visible: true
        },
        {
          id: 4,
          optionName: '简介',
          visible: true
        },
        {
          id: 5,
          optionName: '照片',
          visible: true
        },
        {
          id: 6,
          optionName: '视频',
          visible: true
        },
        {
          id: 7,
          optionName: '事迹材料',
          visible: true
        },
        {
          id: 8,
          optionName: '荣誉证书',
          visible: true
        },
        {
          id: 9,
          optionName: '资格证书',
          visible: true
        },
        {
          id: 10,
          optionName: '申报表格',
          visible: true
        },
        {
          id: 11,
          optionName: '其他文本1',
          visible: true
        },
        {
          id: 12,
          optionName: '其他文本2',
          visible: true
        },
        {
          id: 13,
          optionName: '其他附件1',
          visible: true
        },
        {
          id: 14,
          optionName: '其他附件2',
          visible: true
        },
        {
          id: 15,
          optionName: '其他附件3',
          visible: true
        }
      ],
      prizeNameOptions: [],
      form: {
        reportName: '',
        reportCompany: '',
        reportDepartment: '',
        prizeId: undefined,
        reportInfo: '',
        reportphotos: [],
        reportdocuments: [],
        deedsFile: [],
        honorFile: [],
        qualificationFile: [],
        formFile: [],
        otherText1: undefined,
        otherText2: undefined,
        otherFile1: [],
        otherFile2: [],
        otherFile3: []
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
    HandleChange() {
      this.FormVisible=false
      queryPrizeOptions({ prizeId: this.form.prizeId }).then(response => {
        if (response.errno == 20000) {
          this.options = []
          this.options = response.data.map(elem => {
            return {
              id: elem.chooseId,
              optionName: elem.optionName,
              visible: JSON.parse(elem.visible)
            }
          })
        }
        console.log(this.options)
        this.FormVisible=true
      })
    },
    submitForm() {
      console.log(this.form)
      uploadReport(this.form).then(response => {
        if (response.errno == 20000) {
          this.$message.success('upload success')
        } else {
          this.$message.warning('upload failure')
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
    },
    beforeRemoveDeedsFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveDeedsFile(file, fileList) {
      let FileIndex = this.form.deedsFile.filter((elem, index) => {
        if (elem.deedsName == file.name) {
          return index
        }
      })
      this.form.deedsFile.splice(FileIndex, 1)
    },
    handlerSuccessDeedsFile(response, file, fileList) {
      this.form.deedsFile.push({
        deedsUrl: response.data.url,
        deedsName: file.name
      })
    },
    handlerErrorDeedsFile(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('上传材料失败，请刷新重试')
    },
    beforeRemoveHonorFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveHonorFile(file, fileList) {
      let FileIndex = this.form.honorFile.filter((elem, index) => {
        if (elem.honorName == file.name) {
          return index
        }
      })
      this.form.honorFile.splice(FileIndex, 1)
    },
    handlerSuccessHonorFile(response, file, fileList) {
      this.form.honorFile.push({
        honorUrl: response.data.url,
        honorName: file.name
      })
    },
    handlerErrorHonorFile(err, file, fileList) {
      this.$message.error('上传材料失败，请刷新重试')
    },
    beforeRemoveQualificationFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveQualificationFile(file, fileList) {
      let FileIndex = this.form.qualificationFile.filter((elem, index) => {
        if (elem.qualificationName == file.name) {
          return index
        }
      })
      this.form.qualificationFile.splice(FileIndex, 1)
    },
    handlerSuccessQualificationFile(response, file, fileList) {
      this.form.qualificationFile.push({
        qualificationUrl: response.data.url,
        qualificationName: file.name
      })
    },
    handlerErrorQualificationFile(err, file, fileList) {
      this.$message.error('上传材料失败，请刷新重试')
    },
    beforeRemoveFormFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveFormFile(file, fileList) {
      let FileIndex = this.form.formFile.filter((elem, index) => {
        if (elem.formName == file.name) {
          return index
        }
      })
      this.form.formFile.splice(FileIndex, 1)
    },
    handlerSuccessFormFile(response, file, fileList) {
      this.form.formFile.push({
        formUrl: response.data.url,
        formName: file.name
      })
    },
    handlerErrorFormFile(err, file, fileList) {
      this.$message.error('上传材料失败，请刷新重试')
    },
    beforeRemoveOther1File(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveOther1File(file, fileList) {
      let FileIndex = this.form.otherFile1.filter((elem, index) => {
        if (elem.other1Name == file.name) {
          return index
        }
      })
      this.form.otherFile1.splice(FileIndex, 1)
    },
    handlerSuccessOther1File(response, file, fileList) {
      this.form.otherFile1.push({
        other1Url: response.data.url,
        other1Name: file.name
      })
    },
    handlerErrorOther1File(err, file, fileList) {
      this.$message.error('上传材料失败，请刷新重试')
    },
    beforeRemoveOther2File(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveOther2File(file, fileList) {
      let FileIndex = this.form.otherFile2.filter((elem, index) => {
        if (elem.other2Name == file.name) {
          return index
        }
      })
      this.form.otherFile2.splice(FileIndex, 1)
    },
    handlerSuccessOther2File(response, file, fileList) {
      this.form.otherFile2.push({
        other2Url: response.data.url,
        other2Name: file.name
      })
    },
    handlerErrorOther2File(err, file, fileList) {
      this.$message.error('上传材料失败，请刷新重试')
    },
    beforeRemoveOther3File(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveOther3File(file, fileList) {
      let FileIndex = this.form.otherFile3.filter((elem, index) => {
        if (elem.other3Name == file.name) {
          return index
        }
      })
      this.form.otherFile3.splice(FileIndex, 1)
    },
    handlerSuccessOther3File(response, file, fileList) {
      this.form.otherFile3.push({
        other3Url: response.data.url,
        other3Name: file.name
      })
    },
    handlerErrorOther3File(err, file, fileList) {
      this.$message.error('上传材料失败，请刷新重试')
    }
  }
}
</script>

<style scoped>
.app-container{
  width: 800px;
}
.filter-container{
  margin-bottom: 8px;
  margin-left: 53px;
}
.title-text{
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 8px 0 0;
  font-weight: bold;
}
</style>


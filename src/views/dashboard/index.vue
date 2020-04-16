<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.prizeId" placeholder="奖项名称" clearable class="filter-item" style="width: 250px">
        <el-option v-for="item in prizeNameOptions" :key="item.prizeId" :label="item.prizeName" :value="item.prizeId" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖项名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.prizeName }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="options[0].visible" :label="options[0].optionName" width="110" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.reportName }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="options[1].visible" :label="options[1].optionName" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reportCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="options[2].visible" :label="options[2].optionName" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reportDepartment }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="options[3].visible" :label="options[3].optionName" width="350px" align="center">
        <template slot-scope="{row}">
          <el-popover
            placement="top-start"
            title="简介信息"
            width="500"
            trigger="hover"
            :content=row.reportInfo>
            <el-button slot="reference">{{ row.reportInfo | substrInfo }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="options[4].visible" :label="options[4].optionName" width="200" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.reportphotos[0].photoUrl"
            :preview-src-list="row.reportphotos.map(function(elem) {
            return elem.photoUrl
          })">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column v-if="options[5].visible" :label="options[5].optionName" width="120px" align="center">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.reportdocuments" :key="index">
            <el-link :href="item.documentUrl" type="success">{{ item.documentName }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="options[6].visible" :label="options[6].optionName" width="120px" align="center">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.deedsFile" :key="index">
            <el-link :href="item.deedsUrl" type="success">{{ item.deedsName }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="options[7].visible" :label="options[7].optionName" width="120px" align="center">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.honorFile" :key="index">
            <el-link :href="item.honorUrl" type="success">{{ item.honorName }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="options[8].visible" :label="options[8].optionName" width="120px" align="center">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.qualificationFile" :key="index">
            <el-link :href="item.qualificationUrl" type="success">{{ item.qualificationName }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="options[9].visible" :label="options[9].optionName" width="120px" align="center">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.formFile" :key="index">
            <el-link :href="item.formUrl" type="success">{{ item.formName }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="options[10].visible" :label="options[10].optionName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.otherText1 }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="options[11].visible" :label="options[11].optionName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.otherText2 }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="options[12].visible" :label="options[12].optionName" width="120px" align="center">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.otherFile1" :key="index">
            <el-link :href="item.other1Url" type="success">{{ item.other1Name }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="options[13].visible" :label="options[13].optionName" width="120px" align="center">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.otherFile2" :key="index">
            <el-link :href="item.other2Url" type="success">{{ item.other2Name }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="options[14].visible" :label="options[14].optionName" width="120px" align="center">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.otherFile3" :key="index">
            <el-link :href="item.other3Url" type="success">{{ item.other3Name }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-if="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="form"  label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="options[0].optionName" v-if="options[0].visible">
          <el-input v-model="form.reportName" width="80" />
        </el-form-item>
        <el-form-item :label="options[1].optionName" v-if="options[1].visible">
          <el-input v-model="form.reportCompany" width="80" />
        </el-form-item>
        <el-form-item :label="options[2].optionName" v-if="options[2].visible">
          <el-input v-model="form.reportDepartment" width="80" />
        </el-form-item>
        <el-form-item :label="options[3].optionName" v-if="options[3].visible">
          <el-input v-model="form.reportInfo" :autosize="{ minRows: 2, maxRows: 99}" type="textarea" placeholder="请输入简介信息" />
        </el-form-item>
        <el-form-item :label="options[4].optionName" v-if="options[4].visible">
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
        <el-form-item :label="options[5].optionName" v-if="options[5].visible">
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
        <el-form-item :label="options[6].optionName" v-if="options[6].visible">
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
        <el-form-item :label="options[7].optionName" v-if="options[7].visible">
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
        <el-form-item :label="options[8].optionName" v-if="options[8].visible">
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
        <el-form-item :label="options[9].optionName" v-if="options[9].visible">
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
        <el-form-item :label="options[10].optionName" v-if="options[10].visible">
          <el-input v-model="form.otherText1" width="80" />
        </el-form-item>
        <el-form-item :label="options[11].optionName" v-if="options[11].visible">
          <el-input v-model="form.otherText2" width="80" />
        </el-form-item>
        <el-form-item :label="options[12].optionName" v-if="options[13].visible">
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
        <el-form-item :label="options[13].optionName" v-if="options[13].visible">
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
        <el-form-item :label="options[14].optionName" v-if="options[14].visible">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryPrizeOptions, updateReport, getMyAllPrizes, getSpecificPrizeKind, deleteReport } from '../../api/prize'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Dashboard',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
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
      visible: false,
      pictureArray: [],
      fileListPicture: [],
      fileList: [],
      prizeNameOptions: [],
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        prizeId: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      form: {
        reportId: undefined,
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
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        reportName: [
          { required: true, message: '请输入标题', trigger: 'blur' }
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
      downloadLoading: false
    }
  },
  created() {
    // this.fetchAllMinePrize()
    this.fetchPrizesName()
  },
  methods: {
    handleSubmit() {
      console.log(this.form)
      updateReport(this.form).then(response => {
        if (response.errno == 20000 ) {
          this.$message({
            message: '修改申报明细成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '修改申报明细失败',
            type: 'error'
          })
          this.fetchAllMinePrize()
        }
      })
      this.dialogFormVisible = false
    },
    fetchPrizesName() {
      getSpecificPrizeKind().then(response => {
        this.prizeNameOptions = response.data
      })
    },
    fetchAllMinePrize() {
      this.listLoading = true
      getMyAllPrizes(this.listQuery).then(response => {
        this.list = response.data.list
        console.log(this.list)
        this.total = response.data.list.length
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      queryPrizeOptions({ prizeId: this.listQuery.prizeId }).then(response => {
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
      })
      getMyAllPrizes(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.list.length
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row) // copy obj
      this.form.reportphotos.splice(0, this.form.reportphotos.length)
      this.form.reportdocuments.splice(0, this.form.reportdocuments.length)
      this.form.deedsFile.splice(0, this.form.deedsFile.length)
      this.form.honorFile.splice(0, this.form.honorFile.length)
      this.form.qualificationFile.splice(0, this.form.qualificationFile.length)
      this.form.formFile.splice(0, this.form.formFile.length)
      this.form.otherFile1.splice(0, this.form.otherFile1.length)
      this.form.otherFile2.splice(0, this.form.otherFile2.length)
      this.form.otherFile3.splice(0, this.form.otherFile3.length)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row, index) {
      console.log(row, index)
      deleteReport({ reportId: row.reportId }).then(response => {
        if (response.errno == 20000) {
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'failure',
            message: '删除失败',
            type: 'warning',
            duration: 2000
          })
        }
      })
      this.fetchAllMinePrize()
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
  .filter-container{
    margin-bottom: 8px;
  }
</style>

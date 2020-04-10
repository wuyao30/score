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
      <div v-show="options[0].visible">
        <el-table-column :label="options[0].optionName" width="110" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.reportName }}</span>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[1].visible">
        <el-table-column :label="options[1].optionName" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.reportCompany }}</span>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[2].visible">
        <el-table-column :label="options[2].optionName" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.reportDepartment }}</span>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[3].visible">
        <el-table-column :label="options[3].optionName" width="350px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.reportInfo }}</span>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[4].visible">
        <el-table-column :label="options[4].optionName" width="200" align="center" class-name="small-padding fixed-width">
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
      </div>
      <div v-show="options[5].visible">
        <el-table-column :label="options[5].optionName" width="120px" align="center">
          <template slot-scope="{row}">
            <div v-for="(item, index) in row.reportdocuments" :key="index">
              <el-link :href="item.documentUrl" type="success">{{ item.documentName }}</el-link>
            </div>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[6].visible">
        <el-table-column :label="options[6].optionName" width="120px" align="center">
          <template slot-scope="{row}">
            <div v-for="(item, index) in row.deedsFile" :key="index">
              <el-link :href="item.url" type="success">{{ item.name }}</el-link>
            </div>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[7].visible">
        <el-table-column :label="options[7].optionName" width="120px" align="center">
          <template slot-scope="{row}">
            <div v-for="(item, index) in row.honorFile" :key="index">
              <el-link :href="item.url" type="success">{{ item.name }}</el-link>
            </div>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[8].visible">
        <el-table-column :label="options[8].optionName" width="120px" align="center">
          <template slot-scope="{row}">
            <div v-for="(item, index) in row.qualificationFile" :key="index">
              <el-link :href="item.url" type="success">{{ item.name }}</el-link>
            </div>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[9].visible">
        <el-table-column :label="options[9].optionName" width="120px" align="center">
          <template slot-scope="{row}">
            <div v-for="(item, index) in row.FormFile" :key="index">
              <el-link :href="item.url" type="success">{{ item.name }}</el-link>
            </div>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[10].visible">
        <el-table-column :label="options[10].optionName" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.otherText1 }}</span>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[11].visible">
        <el-table-column :label="options[11].optionName" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.otherText2 }}</span>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[12].visible">
        <el-table-column :label="options[12].optionName" width="120px" align="center">
          <template slot-scope="{row}">
            <div v-for="(item, index) in row.otherFile1" :key="index">
              <el-link :href="item.url" type="success">{{ item.name }}</el-link>
            </div>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[13].visible">
        <el-table-column :label="options[13].optionName" width="120px" align="center">
          <template slot-scope="{row}">
            <div v-for="(item, index) in row.otherFile2" :key="index">
              <el-link :href="item.url" type="success">{{ item.name }}</el-link>
            </div>
          </template>
        </el-table-column>
      </div>
      <div v-show="options[14].visible">
        <el-table-column :label="options[14].optionName" width="120px" align="center">
          <template slot-scope="{row}">
            <div v-for="(item, index) in row.otherFile3" :key="index">
              <el-link :href="item.url" type="success">{{ item.name }}</el-link>
            </div>
          </template>
        </el-table-column>
      </div>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp"  label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="options[0].optionName" v-show="options[0].visible">
          <el-input v-model="temp.reportName" width="80" />
        </el-form-item>
        <el-form-item :label="options[1].optionName" v-show="options[1].visible">
          <el-input v-model="temp.reportCompany" width="80" />
        </el-form-item>
        <el-form-item :label="options[2].optionName" v-show="options[2].visible">
          <el-input v-model="temp.reportDepartment" width="80" />
        </el-form-item>
        <el-form-item :label="options[3].optionName" v-show="options[3].visible">
          <el-input v-model="temp.reportInfo" :autosize="{ minRows: 2, maxRows: 99}" type="textarea" placeholder="请输入简介信息" />
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
          <el-input v-model="temp.otherText1" width="80" />
        </el-form-item>
        <el-form-item :label="options[11].optionName" v-show="options[11].visible">
          <el-input v-model="temp.otherText2" width="80" />
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
import { updateReport, getMyAllPrizes, getSpecificPrizeKind, deleteReport } from '../../api/prize'
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
      temp: {
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
        FormFile: [],
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
      console.log(this.temp)
      updateReport(this.temp).then(response => {
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
        }
      })
      this.dialogFormVisible = false
      this.fetchAllMinePrize()
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
      getMyAllPrizes(this.listQuery).then(response => {
        this.list = response.data.list
        console.log(this.list)
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
      this.temp = Object.assign({}, row) // copy obj
      this.temp.reportphotos.splice(0, this.temp.reportphotos.length)
      this.temp.reportdocuments.splice(0, this.temp.reportdocuments.length)
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
      this.temp.reportdocuments.push({
        documentUrl: response.data.url,
        documentName: file.name
      })
    },
    handlerErrorFile(err, file, fileList) {
      this.$message.error('上传附件失败，请刷新重试')
    },
    handleRemoveFile(file, fileList) {
      console.log('hello')
      const FileIndex = this.temp.reportdocuments.filter((elem, index) => {
        if (elem.documentName == file.name) {
          return index
        }
      })
      this.temp.reportdocuments.splice(FileIndex, 1)
      console.log(this.temp.reportdocuments)
    },
    handleExceedFile(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemoveFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handlerSuccessPicture(response, file, fileList) {
      console.log(file, fileList)
      this.temp.reportphotos.push({
        name: file.name,
        photoUrl: response.data.url
      })
    },
    handlerErrorPicture(err, file, fileList) {
      // console.log(err, file, fileList)
      this.$message.error('上传图片失败，请刷新重试')
    },
    handleRemovePicture(file, fileList) {
      console.log(file, fileList)
      const PictureIndex = this.temp.reportphotos.filter((elem, index) => {
        if (elem.name == file.name) {
          return index
        }
      })
      this.temp.reportphotos.splice(PictureIndex, 1)
      // console.log(this.temp.reportPhotos)
    },
    beforeRemovePicture(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    beforeRemoveDeedsFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveDeedsFile(file, fileList) {
      let FileIndex = this.temp.deedsFile.filter((elem, index) => {
        if (elem.name == file.name) {
          return index
        }
      })
      this.temp.deedsFile.splice(FileIndex, 1)
    },
    handlerSuccessDeedsFile(response, file, fileList) {
      this.temp.deedsFile.push({
        url: response.data.url,
        name: file.name
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
      let FileIndex = this.temp.honorFile.filter((elem, index) => {
        if (elem.name == file.name) {
          return index
        }
      })
      this.temp.honorFile.splice(FileIndex, 1)
    },
    handlerSuccessHonorFile(response, file, fileList) {
      this.temp.honorFile.push({
        url: response.data.url,
        name: file.name
      })
    },
    handlerErrorHonorFile(err, file, fileList) {
      this.$message.error('上传材料失败，请刷新重试')
    },
    beforeRemoveQualificationFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveQualificationFile(file, fileList) {
      let FileIndex = this.temp.qualificationFile.filter((elem, index) => {
        if (elem.name == file.name) {
          return index
        }
      })
      this.temp.qualificationFile.splice(FileIndex, 1)
    },
    handlerSuccessQualificationFile(response, file, fileList) {
      this.temp.qualificationFile.push({
        url: response.data.url,
        name: file.name
      })
    },
    handlerErrorQualificationFile(err, file, fileList) {
      this.$message.error('上传材料失败，请刷新重试')
    },
    beforeRemoveFormFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveFormFile(file, fileList) {
      let FileIndex = this.temp.FormFile.filter((elem, index) => {
        if (elem.name == file.name) {
          return index
        }
      })
      this.temp.FormFile.splice(FileIndex, 1)
    },
    handlerSuccessFormFile(response, file, fileList) {
      this.temp.FormFile.push({
        url: response.data.url,
        name: file.name
      })
    },
    handlerErrorFormFile(err, file, fileList) {
      this.$message.error('上传材料失败，请刷新重试')
    },
    beforeRemoveOther1File(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveOther1File(file, fileList) {
      let FileIndex = this.temp.otherFile1.filter((elem, index) => {
        if (elem.name == file.name) {
          return index
        }
      })
      this.temp.otherFile1.splice(FileIndex, 1)
    },
    handlerSuccessOther1File(response, file, fileList) {
      this.temp.otherFile1.push({
        url: response.data.url,
        name: file.name
      })
    },
    handlerErrorOther1File(err, file, fileList) {
      this.$message.error('上传材料失败，请刷新重试')
    },
    beforeRemoveOther2File(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveOther2File(file, fileList) {
      let FileIndex = this.temp.otherFile2.filter((elem, index) => {
        if (elem.name == file.name) {
          return index
        }
      })
      this.temp.otherFile2.splice(FileIndex, 1)
    },
    handlerSuccessOther2File(response, file, fileList) {
      this.temp.otherFile2.push({
        url: response.data.url,
        name: file.name
      })
    },
    handlerErrorOther2File(err, file, fileList) {
      this.$message.error('上传材料失败，请刷新重试')
    },
    beforeRemoveOther3File(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemoveOther3File(file, fileList) {
      let FileIndex = this.temp.otherFile3.filter((elem, index) => {
        if (elem.name == file.name) {
          return index
        }
      })
      this.temp.otherFile3.splice(FileIndex, 1)
    },
    handlerSuccessOther3File(response, file, fileList) {
      this.temp.otherFile3.push({
        url: response.data.url,
        name: file.name
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

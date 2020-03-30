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
      <el-table-column label="ID" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.reportId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖项名称" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.prizeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.reportName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reportCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reportDepartment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="照片" width="200" align="center" class-name="small-padding fixed-width">
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
      <el-table-column label="简介" width="350px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reportInfo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="附件" width="120px" align="center">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.reportdocuments" :key="index">
            <el-link :href="item.documentUrl" type="success">{{ item.documentName }}</el-link>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" :rules="rules" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="标题" prop="reportName">
          <el-input v-model="temp.reportName" placeholder="请输入申报人员姓名"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="company">
          <el-input v-model="temp.reportCompany" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="temp.reportDepartment" placeholder="请输入部门名称"></el-input>
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
          <el-input v-model="temp.reportInfo" :autosize="{ minRows: 2, maxRows: 99}" type="textarea" placeholder="Please input" />
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
import { updateReport, getMyAllPrizes, getSpecificPrizeKind } from '../../api/prize'
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
      pictureArray: [
        'http://139.224.135.165:8080/download/3.jpg',
        'http://139.224.135.165:8080/download/2.jpg'],
      fileListPicture: [],
      fileList: [],
      prizeNameOptions: [{ id: -1, specificCategoryName: '请先选择奖项大类' }],
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
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
        prizeKind: undefined,
        reportphotos: [],
        reportInfo: undefined,
        reportdocuments: []
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
    this.fetchAllMinePrize()
    this.fetchPrizesName()
  },
  methods: {
    handleSubmit() {
      console.log(this.temp)
      updateReport(this.temp).then(response => {
        if (response.data === 'success') {
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
        // console.log(this.prizeNameOptions)
      })
    },
    fetchAllMinePrize() {
      this.listLoading = true
      getMyAllPrizes(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.list
        console.log(this.list)
        this.total = response.data.list.length
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.fetchAllMinePrize(this.listQuery)
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
      console.log(row)
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
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      // this.list.splice(index, 1)
    },
    handlerSuccessFile(response, file, fileList) {
      // console.log(file, fileList)
      this.temp.reportdocuments.push({
        documentUrl: response.data.url,
        documentName: file.name
      })
    },
    handlerErrorFile(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('上传附件失败，请刷新重试')
    },
    handleRemoveFile(file, fileList) {
      console.log('hello')
      const FileIndex = this.temp.reportdocuments.findIndex(elem => {
        elem.documentName == file.name
      })
      console.log(FileIndex)
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
      const PictureIndex = this.temp.reportphotos.findIndex(elem => {
        elem.name === file.name
      })
      this.temp.reportphotos.splice(PictureIndex, 1)
      // console.log(this.temp.reportPhotos)
    },
    beforeRemovePicture(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
<style scoped>
  .filter-container{
    margin-bottom: 8px;
  }
</style>

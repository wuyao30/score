<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.prizeKind" placeholder="奖项大类" clearable style="width: 250px" class="filter-item" @change="mainChange">
        <el-option v-for="item in prizeKindOptions" :key="item.id" :label="item.mainCategoryName" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.prizeName" placeholder="奖项名称" clearable class="filter-item" style="width: 250px">
        <el-option v-for="item in prizeNameOptions" :key="item.id" :label="item.specificCategoryName" :value="item.id" />
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
      <el-table-column v-show="false" label="ID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.reportId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖项大类" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prizeKind }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖项名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prizeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="照片" width="200px" align="center">
        <template slot-scope="{row}">
          <el-avatar v-for="item in row.reportPhotos" :key="item.url" shape="square" :size="100" fit="fill" :src="item.url"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="简介" width="270px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reportInfo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="附件" width="120px" align="center">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.annex" :key="index">
            <el-link :href="item.url" type="success">{{`附件${index+1}`}}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchAllMinePrize" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
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
          <el-input v-model="temp.reportInfo" :autosize="{ minRows: 2, maxRows: 99}" type="textarea" placeholder="Please input" />
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
import { updateReport, getAllPrize, getMyAllPrizes, getMainPrizeKind, getSpecificPrizeKind } from '../../api/prize'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
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
      prizeKindOptions: [{ id: -1, mainCategoryName: '请选择奖项大类' }],
      prizeNameOptions: [{ id: -1, specificCategoryName: '请先选择奖项大类' }],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        prizeKind: undefined,
        prizeName: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        reportId: undefined,
        prizeKind: undefined,
        prizeName: undefined,
        reportPhotos: [],
        reportInfo: undefined,
        annex: []
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
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.fetchAllMinePrize()
    this.fetchMainPrizeKinds()
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
    mainChange(value) {
      getSpecificPrizeKind({ id: value }).then(response => {
        this.prizeNameOptions = response.data.specificCategory
        console.log(this.prizeNameOptions)
      })
    },
    fetchMainPrizeKinds() {
      getMainPrizeKind().then(response => {
        this.prizeKindOptions = response.data.mainCategory
        console.log(this.prizeKindOptions)
      })
    },
    fetchAllMinePrize() {
      this.listLoading = true
      getMyAllPrizes(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.myPrizes
        console.log(this.list)
        this.total = response.data.myPrizes.length
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchAllMinePrize()
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
      this.temp.reportPhotos.splice(0, this.temp.reportPhotos.length)
      this.temp.annex.splice(0, this.temp.annex.length)
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
      console.log(file, fileList)
      this.temp.annex.push({
        url: response.data.url,
        name: file.name
      })
    },
    handlerErrorFile(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('上传附件失败，请刷新重试')
    },
    handleRemoveFile(file, fileList) {
      console.log(file, fileList)
      console.log(this.temp)
      let FileIndex = this.temp.annex.findIndex(elem => {
        elem.name === file.name
      })
      this.temp.annex.splice(FileIndex, 1)
      console.log(this.temp.annex)
    },
    handleExceedFile(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemoveFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handlerSuccessPicture(response, file, fileList) {
      console.log(file, fileList)
      this.temp.reportPhotos.push({
        url: response.data.url,
        name: file.name
      })
    },
    handlerErrorPicture(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('上传图片失败，请刷新重试')
    },
    handleRemovePicture(file, fileList) {
      console.log(file, fileList)
      console.log(this.temp)
      let PictureIndex = this.temp.reportPhotos.findIndex(elem => {
        elem.name === file.name
      })
      this.temp.annex.splice(PictureIndex, 1)
      console.log(this.temp.reportPhotos)
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

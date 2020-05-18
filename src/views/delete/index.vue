<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.prizeId" placeholder="奖项名称" clearable class="filter-item" style="width: 250px">
        <el-option v-for="item in prizeNameOptions" :key="item.prizeId" :label="item.prizeName" :value="item.prizeId" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button :disabled="download" v-waves class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出申报明细
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
      <el-table-column v-if="options[3].visible" :label="options[3].optionName" width="400" align="center">
        <template slot-scope="{row}">
          <el-popover
            placement="top-start"
            title="简介信息"
            width="400"
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
      <el-table-column label="留言" align="center" width="200px">
        <template slot-scope="{row}">
          <span>{{ judgeMessage(row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleMessages(row)">
            留言
          </el-button>
          <el-button v-waves v-if="row.reportWord=='1'" size="mini" icon="el-icon-success" type="success" @click="handleModifyStatus(row,'0')">
            准予考评
          </el-button>
          <el-button v-waves v-if="row.reportWord=='0'" size="mini" icon="el-icon-error" type="danger" @click="handleModifyStatus(row,'1')">
            禁用考评
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="form"  label-position="right" label-width="120px" style="width: 600px; margin-left:50px;">
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
            :file-list="form.reportphotos.map(function(elem) {
                        return {
                          url: elem.photoUrl
                        }
                      })"
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
            :file-list="form.reportdocuments.map(function(elem) {
                        return {
                          name: elem.documentName,
                          url: elem.documentUrl
                        }
                      })"
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
            :file-list="form.deedsFile.map(function(elem) {
                        return {
                          name: elem.deedsName,
                          url: elem.deedsUrl
                        }
                      })"
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
            :file-list="form.honorFile.map(function(elem) {
                        return {
                          name: elem.honorName,
                          url: elem.honorUrl
                        }
                      })"
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
            :file-list="form.qualificationFile.map(function(elem) {
                        return {
                          name: elem.qualificationName,
                          url: elem.qualificationUrl
                        }
                      })"
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
            :file-list="form.formFile.map(function(elem) {
                        return {
                          name: elem.formName,
                          url: elem.formUrl
                        }
                      })"
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
            :file-list="form.otherFile1.map(function(elem) {
                        return {
                          name: elem.other1Name,
                          url: elem.other1Url
                        }
                      })"
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
            :file-list="form.otherFile2.map(function(elem) {
                        return {
                          name: elem.other2Name,
                          url: elem.other2Url
                        }
                      })"
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
            :file-list="form.otherFile3.map(function(elem) {
                        return {
                          name: elem.other3Name,
                          url: elem.other3Url
                        }
                      })"
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
    <el-dialog title="留言" :visible.sync="dialogMessageVisible">
      <el-form ref="messageForm" :data="message" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="留言信息">
          <el-input v-model="message.reportPhoto1" :autosize="{ minRows: 2, maxRows: 99}" type="textarea" placeholder="请输入留言信息" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMessageVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSubmitMessage">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { adminGetScoreNoPagenite, queryPrizeOptions, adminUpdateMessage, adminUpdateReportStatus, adminUpdateReport, adminGetReportById, adminGetModifyReport, updateReport, getSpecificPrizeKind } from '../../api/prize'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Index',
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
  computed: {
  },
  data() {
    return {
      download: true,
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
      tableShow:false,
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
      dialogMessageVisible: false,
      message: {},
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      pictureArray: [
        'http://139.224.135.165:8080/download/3.jpg',
        'http://139.224.135.165:8080/download/2.jpg'],
      fileListPicture: [],
      fileList: [],
      prizeNameOptions: [{ id: -1, specificCategoryName: '请先选择奖项大类' }],
      tableKey: 0,
      list: null,
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
    async handleDownload() {
      this.downloadLoading = true
      const result = await adminGetScoreNoPagenite({ prizeId: this.listQuery.prizeId })
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', '奖项名称', '申报人员名称', '申报人员单位', '申报人员部门', '标题', '单位', '部门', '简介', `${this.options[11].optionName}`, `${this.options[12].optionName}`]
        const filterVal = ['reportId', 'prizeName', 'name', 'company', 'department', 'reportName', 'reportCompany', 'reportDepartment', 'reportInfo', 'otherText1', 'otherText2']
        const data = this.formatJson(filterVal, result.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '申报明细',
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'reportVideo') {
          if (v[j] !== null) {
            return v[j].substr(0, 5)
          } else {
            return '无打分结果'
          }
        } else if(j === 'votes') {
          if (v[j] !== null) {
            return v[j]
          } else {
            return '无投票结果'
          }
        } else {
          return v[j]
        }
      }))
    },
    judgeMessage(row) {
      if (row.reportPhoto1 == null) {
        return '暂无留言'
      } else {
        return row.reportPhoto1
      }
    },
    handleSubmitMessage() {
      console.log(this.message)
      adminUpdateMessage({ reportId: this.message.reportId, reportPhoto1: this.message.reportPhoto1 }).then(response => {
        if (response.errno == 20000) {
          this.$notify.success({
            title: 'success',
            message: '留言成功'
          })
        } else {
          this.$notify.error({
            title: 'error',
            message: '留言失败'
          })
        }
        this.fetchAllMinePrize()
        this.dialogMessageVisible = false
      })
    },
    handleMessages(row) {
      console.log(row)
      this.message = Object.assign({}, row) // copy obj
      this.dialogMessageVisible = true
      this.$nextTick(() => {
        this.$refs['messageForm'].clearValidate()
      })
    },
    handleModifyStatus(row, status) {
      adminUpdateReportStatus({ reportId: row.reportId, reportWord: status }).then(response => {
        if (response.errno == 20000) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败，请重试')
        }
        setTimeout(this.fetchAllMinePrize(), 1000)
      })
    },
    handleSubmit() {
      console.log(this.form)
      // updateReport(this.form).then(response => {
      //   if (response.errno == 20000 ) {
      //     this.$message({
      //       message: '修改申报明细成功',
      //       type: 'success'
      //     })
      //   } else {
      //     this.$message({
      //       message: '修改申报明细失败',
      //       type: 'error'
      //     })
      //     this.fetchAllMinePrize()
      //   }
      // })
      // this.dialogFormVisible = false
      // this.handleFilter()
    },
    fetchPrizesName() {
      getSpecificPrizeKind().then(response => {
        this.prizeNameOptions = response.data
        // console.log(this.prizeNameOptions)
      })
    },
    fetchAllMinePrize() {
      this.listLoading = true
      adminGetModifyReport(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.list.length
        this.listLoading = false
      })
    },
    handleFilter() {
      this.download = false
      this.tableShow = true
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
      adminGetReportById(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.list.length
        this.listLoading = false
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
      // this.temp.reportphotos.splice(0, this.temp.reportphotos.length)
      // this.temp.reportdocuments.splice(0, this.temp.reportdocuments.length)
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
  .filter-container {
    margin-bottom: 8px;
  }
</style>

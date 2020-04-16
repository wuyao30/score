<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.telephone" placeholder="搜索姓名手机号" clearable style="width: 200px;margin-right: 15px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.name" placeholder="搜索姓名" clearable style="width: 200px;margin-right: 15px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.company" placeholder="搜索单位" clearable style="width: 200px;margin-right: 15px;" class="filter-item" @change="handleFilter">
        <el-option v-for="(item, index) in companyOptions" :key="index" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" style="margin-right: 10px;" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" style="margin-left: 0;margin-right: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate">
        添加
      </el-button>
      <el-button v-waves :loading="downloadLoading" style="margin-left: 0;margin-right: 10px;" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出当前页信息
      </el-button>
      <el-button v-waves :loading="downloadLoading" style="margin-left: 0;" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownloadAll">
        导出全部信息
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      :default-sort = "{prop: 'id', order: 'ascending'}"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="id" prop="id" sortable align="center" width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录名" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.telephone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.company || '暂无单位' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.department || '暂无部门' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="250">
        <template slot-scope="{row}">
          <el-button v-waves type="primary" icon="el-icon-setting" size="mini" @click="confirmUpdatePsw(row)">
            修改信息
          </el-button>
          <el-button v-waves type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="登录权限" align="center" class-name="small-padding" width="120">
        <template slot-scope="{row}">
          <el-button v-waves v-if="row.enableFlage=='1'" size="mini" icon="el-icon-success" type="success" style="margin: 2px auto;" @click="handleModifyStatus(row,'0')">
            启用状态
          </el-button>
          <el-button v-waves v-if="row.enableFlage=='0'" size="mini" icon="el-icon-error" type="warning" style="margin: 2px auto;" @click="handleModifyStatus(row,'1')">
            禁用状态
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="handleFilter"/>

    <el-dialog :visible.sync="dialogFormVisible" title="添加">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="temp.loginName" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="temp.telephone" />
        </el-form-item>
        <el-form-item label="单位" prop="company">
          <el-input v-model="temp.company" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="temp.department" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submitUser">
          确认添加
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogUpdateFormVisible" title="修改">
      <el-form ref="updateForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="temp.loginName" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="temp.telephone" />
        </el-form-item>
        <el-form-item label="单位" prop="company">
          <el-input v-model="temp.company" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="temp.department" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateUser">
          确认修改
        </el-button>
      </div>
    </el-dialog>
    <!--可自定义按钮的样式、show/hide临界点、返回的位置  -->
    <!--如需文字提示，可在外部添加element的<el-tooltip></el-tooltip>元素  -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import { queryReportDepartment } from '../../../api/prize'
import { updateOnePerson, modifyUserStatus, getReportersInfo, queryAllReporter, submitReporter, updateReportPassword, deleteReporter } from '../../../api/person'
import waves from '@/directive/waves' // Waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import BackToTop from '@/components/BackToTop'

export default {
  name: 'Index',
  components: { Pagination, BackToTop },
  directives: { waves },
  data() {
    return {
      dialogUpdateFormVisible: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        name: undefined,
        telephone: undefined,
        company: undefined
      },
      companyOptions: [],
      temp: {
        loginName: undefined,
        username: undefined,
        password: undefined,
        telephone: undefined,
        company: undefined,
        department: undefined
      },
      dialogFormVisible: false,
      rules: {
        loginName: [
          { required: true, message: '登陆账号为必填项', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名为必填项', trigger: 'blur' }],
        telephone: [{ required: true, message: '手机号码为必填项', trigger: 'blur' }],
        company: [{ required: true, message: '单位为必填项', trigger: 'blur' }],
        department: [{ required: true, message: '部门为必填项', trigger: 'blur' }]
      },
      downloadLoading: false,
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  },
  created() {
    this.getList()
    queryReportDepartment().then(response => {
      if (response.errno == 20000) {
        this.companyOptions = response.data
      } else {
        this.$message.warning('请求申报人员单位出错，请刷新')
      }
    })
  },
  methods: {
    updateUser() {
      updateOnePerson(this.temp).then(response => {
        if (response.errno == 20000) {
          this.$message.success('修改账号成功')
        } else {
          this.$message.warning('修改账号失败，请重试')
        }
        this.handleFilter()
        this.dialogUpdateFormVisible = false
      })
    },
    templateResponse(response) {
      if (response.errno == 20000) {
        this.$notify.success({
          title: '成功',
          message: response.data
        })
      } else {
        this.$notify.error({
          title: '失败',
          message: '重置密码失败，请刷新重试'
        })
      }
    },
    confirmUpdatePsw(row) {
      this.dialogUpdateFormVisible = true
      this.temp = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs['updateForm'].clearValidate()
      })
    },
    deleteUser(row) {
      deleteReporter({ userId: row.userId }).then(response => {
        this.templateResponse(response)
        this.handleFilter()
      })
    },
    handleModifyStatus(row, status) {
      modifyUserStatus({ userId: row.userId, enableFlage: status }).then(response => {
        this.templateResponse(response)
        this.handleFilter()
      })
    },
    submitUser() {
      submitReporter(this.temp).then(response => {
        if (response.errno == 20000) {
          this.$message.success('添加申报人员账号成功')
          this.dialogFormVisible = false
          this.handleFilter()
        } else {
          this.$message.warning('添加申报人员账号失败，请重试')
          this.dialogFormVisible = false
          this.handleFilter()
        }
      })
    },
    getList() {
      getReportersInfo(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      getReportersInfo(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', '登录名', '密码', '姓名', '手机号', '单位', '部门', '状态']
        const filterVal = ['userId', 'loginName', 'password', 'name', 'telephone', 'company', 'department', 'enableFlage']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '当前页申报人员信息表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'enableFlage') {
          return v[j] == 1 ? '启用状态' : '禁用状态'
        } else {
          return v[j]
        }
      }))
    },
    async handleDownloadAll() {
      this.downloadLoading = true
      let result = await queryAllReporter()
      let list = result.data
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', '登录名', '密码', '姓名', '手机号', '单位', '部门', '状态']
        const filterVal = ['userId', 'loginName', 'password', 'name', 'telephone', 'company', 'department', 'enableFlage']
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '全部申报人员信息表'
        })
        this.downloadLoading = false
      })
    }
  }
}
</script>
<style scoped>
  .filter-container{
    margin-bottom: 8px;
  }
</style>

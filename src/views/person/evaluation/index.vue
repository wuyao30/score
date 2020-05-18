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
      <el-table-column label="id" sortable align="center" width="70">
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
      <el-table-column label="打分权限" align="center" width="200">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.optionss" :key="index" type="success">
            {{ item.prizeName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="250">
        <template slot-scope="{row}">
          <el-button v-waves type="primary" icon="el-icon-setting" size="mini" @click="confirmUpdatePsw(row)">
            修改权限
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
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
        <el-form-item label="奖项名称" prop="options">
          <el-select
            v-model="temp.options"
            placeholder="请选择奖项名称"
            multiple>
            <el-option v-for="item in prizeNameOptions" :key="item.prizeId" :label="item.prizeName" :value="item.prizeId" :disabled="item.disabled" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createData">
          确认添加
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogUpdateFormVisible" title="修改">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
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
        <el-form-item label="奖项名称" prop="options">
          <el-select
            v-model="temp.options"
            placeholder="请选择奖项名称"
            multiple>
            <el-option v-for="item in prizeNameOptions" :key="item.prizeId" :label="item.prizeName" :value="item.prizeId" :disabled="item.disabled" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData">
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
import { getSpecificPrizeKind, queryReportDepartment } from '../../../api/prize'
import { updateOnePerson, queryEvaluation, queryAllEvaluation, insertEvaluation, deleteReporter, modifyUserStatus } from '../../../api/person'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import BackToTop from '@/components/BackToTop'

export default {
  name: 'Index',
  components: { Pagination, BackToTop },
  directives: { waves },
  data() {
    return {
      dialogUpdateFormVisible: false,
      prizeNameOptions: [],
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
      companyOptions: [{ label: '大屯煤电团支部', key: '1' }, { label: '姚庄煤矿团委', key: '2' }],
      temp: {
        userId: undefined,
        loginName: undefined,
        name: undefined,
        password: undefined,
        telephone: undefined,
        company: undefined,
        department: undefined,
        options: []
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
        department: [{ required: true, message: '部门为必填项', trigger: 'blur' }],
        options: [{ required: true, message: '奖项名称为必填项', trigger: 'change' }]
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
    this.fetchPrizesName()
    queryReportDepartment().then(response => {
      this.companyOptions = response.data
    })
  },
  methods: {
    deleteUser(row) {
      deleteReporter({ userId: row.userId }).then(response => {
        if (response.errno == 20000) {
          this.$message.success('删除成功')
        } else {
          this.$message.warning('删除失败，请刷新')
        }
        this.handleFilter()
      })
    },
    updateData() {
      updateOnePerson(this.temp).then(response => {
        if (response.errno == 20000) {
          this.$message.success('修改评分账号成功')
        } else {
          this.$message.warning('修改评分账号失败，请重试')
        }
        this.handleFilter()
        this.dialogUpdateFormVisible = false
      })
    },
    createData() {
      insertEvaluation(this.temp).then(response => {
        if (response.errno == 20000) {
          this.$message.success('新建评分账号成功')
        } else {
          this.$message.warning('新建评分账号失败，请重试')
        }
        this.handleFilter()
        this.dialogFormVisible = false
      })
    },
    handleFilter() {
      queryEvaluation(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    fetchPrizesName() {
      getSpecificPrizeKind().then(response => {
        this.prizeNameOptions = response.data
      })
    },
    getList() {
      queryEvaluation(this.listQuery).then(response => {
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
    confirmUpdatePsw(raw) {
      this.dialogUpdateFormVisible = true
      this.temp = Object.assign({}, raw)
      this.temp.options = this.temp.optionss.map(e => e.prizeId)
      console.log(this.temp)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleModifyStatus(row, status) {
      modifyUserStatus({ userId: row.userId, enableFlage: status }).then(response => {
        this.$notify.success({
          title: '成功',
          message: response.data
        })
        this.handleFilter()
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', '登录名', '密码', '姓名', '手机号', '单位', '部门', '打分权限', '状态']
        const filterVal = ['userId', 'loginName', 'password', 'name', 'telephone', 'company', 'department', 'industryName', 'enableFlage']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '当前页打分人员信息表'
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
      let result = await queryAllEvaluation()
      let list = result.data
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', '登录名', '密码', '姓名', '手机号', '单位', '部门', '打分权限', '状态']
        const filterVal = ['userId', 'loginName', 'password', 'name', 'telephone', 'company', 'department', 'industryName', 'enableFlage']
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '全部打分人员信息表'
        })
        this.downloadLoading = false
      })
    }
  }
}
</script>
<style scoped>
  .filter-container {
    margin-bottom: 8px;
  }
</style>

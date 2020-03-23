<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.phone" placeholder="搜索姓名手机号" clearable style="width: 200px;margin-right: 15px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.name" placeholder="搜索姓名" clearable style="width: 200px;margin-right: 15px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.department" placeholder="搜索单位" clearable style="width: 200px;margin-right: 15px;" class="filter-item" @change="handleFilter">
        <el-option v-for="item in companyOptions" :key="item.key" :label="item.label" :value="item.key" />
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
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录名" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
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
          <el-tag type="success">
            {{ scope.row.department }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="250">
        <template slot-scope="{row}">
          <el-button v-waves type="primary" icon="el-icon-setting" size="mini" @click="confirmUpdatePsw(row)">
            修改权限
          </el-button>
          <el-button v-waves type="danger" icon="el-icon-delete" size="mini" @click="confirmUpdatePsw(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="登录权限" align="center" class-name="small-padding" width="120">
        <template slot-scope="{row}">
          <el-button v-waves v-if="row.repStatus=='1'" size="mini" icon="el-icon-success" type="success" style="margin: 2px auto;" @click="handleModifyStatus(row,'0')">
            启用状态
          </el-button>
          <el-button v-waves v-if="row.repStatus=='0'" size="mini" icon="el-icon-error" type="warning" style="margin: 2px auto;" @click="handleModifyStatus(row,'1')">
            禁用状态
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>

    <el-dialog :visible.sync="dialogFormVisible" title="添加">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item label="登录名" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="单位" prop="company">
          <el-input v-model="temp.company" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="temp.department" />
        </el-form-item>
        <el-form-item label="奖项大类" prop="mainId">
          <el-select v-model="temp.mainId" placeholder="请选择奖项大类" @change="mainChange">
            <el-option v-for="item in prizeKindOptions" :key="item.mainCategoryName" :label="item.mainCategoryName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="奖项名称" prop="specId">
          <el-select v-model="temp.specId" placeholder="请选择奖项名称">
            <el-option v-for="item in prizeNameOptions" :key="item.specificCategoryName" :label="item.specificCategoryName" :value="item.id" :disabled="item.disabled" />
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

    <!--可自定义按钮的样式、show/hide临界点、返回的位置  -->
    <!--如需文字提示，可在外部添加element的<el-tooltip></el-tooltip>元素  -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import { getMainPrizeKind, getSpecificPrizeKind } from '../../../api/prize'
import { getReportersInfo } from '../../../api/person'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import BackToTop from '@/components/BackToTop'

export default {
  name: 'Index',
  components: { Pagination, BackToTop },
  directives: { waves },
  data() {
    return {
      prizeKindOptions: [],
      prizeNameOptions: [{ id: -1, specificCategoryName: '请先选择奖项大类' }],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        phone: undefined,
        company: undefined,
        department: undefined
      },
      companyOptions: [{ label: '大屯煤电团支部', key: '1' }, { label: '姚庄煤矿团委', key: '2' }],
      temp: {
        name: undefined,
        username: undefined,
        password: undefined,
        phone: undefined,
        company: undefined,
        department: undefined,
        mainId: undefined,
        specId: undefined
      },
      dialogFormVisible: false,
      rules: {
        username: [
          { required: true, message: '登陆账号为必填项', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名为必填项', trigger: 'blur' }],
        phone: [{ required: true, message: '手机号码为必填项', trigger: 'blur' }],
        company: [{ required: true, message: '单位为必填项', trigger: 'blur' }],
        department: [{ required: true, message: '部门为必填项', trigger: 'blur' }],
        mainId: [{ required: true, message: '奖项大类为必填项', trigger: 'change' }],
        specId: [{ required: true, message: '奖项名称为必填项', trigger: 'change' }]
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
    this.fetchMainPrizeKinds()
  },
  methods: {
    mainChange(value) {
      getSpecificPrizeKind({ id: value }).then(response => {
        this.prizeNameOptions = response.data.specificCategory
        // console.log(this.prizeNameOptions)
      })
    },
    fetchMainPrizeKinds() {
      getMainPrizeKind().then(response => {
        this.prizeKindOptions = response.data.mainCategory
        // console.log(this.prizeKindOptions)
      })
    },
    getList() {
      getReportersInfo().then(response => {
        this.list = response.data.reportersInfo
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
      // this.dialogFormVisible = true
      console.log(raw)
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.repStatus = status
    }
  }
}
</script>
<style scoped>
</style>

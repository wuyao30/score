<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.prizeId" filterable placeholder="奖项名称" clearable style="width: 250px;margin-right: 8px" class="filter-item" @change="mainChange">
        <el-option v-for="item in prizesOptions" :key="item.id" :label="item.specificCategoryName" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button v-waves class="filter-item" style="margin-left: 0;margin-right: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate">
        添加奖项
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
      <el-table-column label="奖项名称" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.prizeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评选细则" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.selectRule }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申报人数" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.reportNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最终获奖数量" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.highNinety }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchPrizesDetails" />
    <el-dialog :visible.sync="dialogFormVisible" :title="textMap[dialogStatus]">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="奖项名称" prop="prizeName">
          <el-input v-model="temp.prizeName" placeholder="请输入奖项名称">
          </el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startDate">
          <el-date-picker
            v-model="temp.startDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="startDate">
          <el-date-picker
            v-model="temp.endDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="打分细则" prop="selectRule">
          <el-input v-model="temp.selectRule" :autosize="{ minRows: 2, maxRows: 99}" type="textarea" placeholder="请输入打分规则" />
        </el-form-item>
        <el-form-item label="获奖数量" prop="winNum">
          <el-input v-model.number="temp.winNum" placeholder="请输入获奖数量" />
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

    <el-dialog :visible.sync="dialogUpdateFormVisible" :title="textMap[dialogStatus]">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="奖项名称" prop="prizeName">
          <el-input v-model="temp.prizeName" placeholder="请输入奖项名称">
          </el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startDate">
          <el-date-picker
            v-model="temp.startDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="startDate">
          <el-date-picker
            v-model="temp.endDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="打分细则" prop="selectRule">
          <el-input v-model="temp.selectRule" :autosize="{ minRows: 2, maxRows: 99}" type="textarea" placeholder="请输入打分规则" />
        </el-form-item>
        <el-form-item label="获奖数量" prop="winNum">
          <el-input v-model.number="temp.winNum" placeholder="请输入获奖数量" />
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
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { prizesDetail, queryAllPrizes } from '../../api/prize'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'Index',
  components: { Pagination },
  data() {
    return {
      dialogUpdateFormVisible: false,
      rules: {
        prizeName: [
          { required: true, message: '奖项名称为必填项', trigger: 'blur' }
        ],
        startDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        endDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        selectRule: [
          { required: true, message: '评选细则为必填项', trigger: 'blur' }
        ],
        winNum: [
          { required: true, message: '获奖数量不能为空' },
          { type: 'number', message: '获奖数量必须为数字值' }
        ]
      },
      temp: {
        prizeName: undefined,
        startDate: '',
        endDate: '',
        selectRule: '',
        winNum: undefined
      },
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogFormVisible: false,
      tableKey: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        prizeKind: undefined,
        prizeName: undefined,
        sort: '+id'
      },
      prizesOptions: [],
      list: undefined,
      total: 0
    }
  },
  directives: { waves },
  created() {
    this.fetchPrizesInfo()
    this.fetchPrizesDetails()
  },
  methods: {
    handleSubmit() {
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      console.log(row)
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      console.log(row)
    },
    fetchPrizesInfo() {
      queryAllPrizes().then(response => {
        this.prizesOptions = response.data.specificCategory
      })
    },
    fetchPrizesDetails() {
      prizesDetail().then(response => {
        this.list = response.data
        this.listLoading = false
        // console.log(this.list)
        this.total = this.list.length
      })
    },
    mainChange() {
    },
    handleFilter() {
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
    }
  }
}
</script>

<style scoped>
.filter-container{
  margin-bottom: 8px;
}
</style>

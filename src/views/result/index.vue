<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.prizeId" placeholder="奖项名称" clearable class="filter-item" style="width: 250px">
        <el-option v-for="item in prizesOptions" :key="item.prizeId" :label="item.prizeName" :value="item.prizeId" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button v-waves :loading="downloadLoading" style="margin-left: 10px;margin-right: 10px;" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出打分情况
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
    >
      <el-table-column label="ID" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reportId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖项名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prizeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.reportName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.reportCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reportDepartment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申报人"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申报人单位"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="照片" align="center" class-name="small-padding fixed-width">
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
     <!-- <el-table-column label="简介" align="center">
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
      </el-table-column>-->
     <!-- <el-table-column label="附件" width="120px" align="center">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.reportdocuments" :key="index">
            <el-link :href="item.documentUrl" type="success">{{ item.documentName }}</el-link>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column v-if="prize.evaluateMode == 0" label="评审票数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.votes }} 票</span>
        </template>
      </el-table-column>
      <el-table-column v-if="prize.evaluateMode == 1" label="评审分数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reportVideo.substr(0, 5) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />
  </div>
</template>
<script>
import { adminPrizes, getSpecificPrizeKind, adminGetScore, adminGetScoreNoPagenite } from '../../api/prize'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'Index',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        prizeId: undefined,
        sort: '+id'
      },
      prizesOptions: [],
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      downloadLoading: false,
      prize: {
        evaluateMode: 0
      }
    }
  },
  created() {
    getSpecificPrizeKind().then(response => {
      this.prizesOptions = response.data
    })
  },
  methods: {
    handleFilter() {
      adminGetScore(this.listQuery).then(response => {
        if (response.errno == 20000) {
          this.list = response.data.list
          this.total = response.data.total
        } else {
          this.$message.error('获取结果失败，请重试')
        }
      })
      adminPrizes({prizeId: this.listQuery.prizeId}).then(response => {
        this.prize = {}
        this.prize = response.data.list[0]
      })
    },
    async handleDownload() {
      this.downloadLoading = true
      const result = await adminGetScoreNoPagenite({ prizeId: this.listQuery.prizeId })
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', '奖项名称', '申报人员名称', '申报人员单位', '申报人员部门', '标题', '单位', '部门', '简介', '得分(平均分)', '票数']
        const filterVal = ['reportId', 'prizeName', 'name', 'company', 'department', 'reportName', 'reportCompany', 'reportDepartment', 'reportInfo', 'reportVideo', 'votes']
        const data = this.formatJson(filterVal, result.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '奖项评分情况',
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
    }
  }
}
</script>

<style scoped>
  .filter-container {
    margin-bottom: 8px;
  }
</style>

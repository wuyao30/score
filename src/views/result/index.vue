<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.prizeName" placeholder="奖项名称" clearable class="filter-item" style="width: 250px">
        <el-option v-for="item in prizesOptions" :key="item.id" :label="item.prizeName" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button v-waves :loading="downloadLoading" style="margin-left: 10px;margin-right: 10px;" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出打分情况
      </el-button>
      <el-button v-waves :loading="downloadLoading" style="margin-left: 0;" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownloadAll">
        导出明细打分
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
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.reportId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖项名称" width="160" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prizeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="130" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="照片" width="200" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.reportPhotos[0].url"
            :preview-src-list="row.reportPhotos.map(function(elem) {
              return elem.url
            })">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="简介" width="370" align="center">
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
      <el-table-column label="平均分" width="140" align="center">
        <template slot-scope="{row}">
          <span>{{row.average}}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchAllMinePrize" />

  </div>
</template>
<script>
  import { getAllPrizeNames, getMyAllPrizes } from "../../api/prize";
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  export default {
    name: "Index",
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        listQuery: {
          page: 1,
          limit: 20,
          prizeId: undefined,
          sort: '+id'
        },
        prizesOptions: [],
        tableKey: 0,
        list: [],
        total: 0,
        listLoading: true,
        downloadLoading: false
      }
    },
    created() {
      getAllPrizeNames().then(response => {
        this.prizesOptions = response.data
      })
      getMyAllPrizes().then(response => {
        this.list = response.data.myPrizes
        this.total = this.list.length
        this.listLoading = false
      })
    },
    methods: {
      handleDownload(){
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['id', '奖项名称', '标题', '单位', '部门', '简介', '得分(平均分)']
          const filterVal = ['id', 'prizeName', 'title', 'company', 'department', 'reportInfo', 'average']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'tabel-list',
            bookType: this.bookType
          })
          this.downloadLoading = false
        })
      },
      async handleDownloadAll(){
        this.downloadLoading = true
        let result = await reqGetScoresList()
        let list = result.data.scoresList
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['id', '奖项名称', '标题', '单位', '部门', '简介', '得分(平均分)']
          const filterVal = ['id', 'prizeName', 'title', 'company', 'department', 'reportInfo', 'average']
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '全部成绩信息表',
            bookType: this.bookType
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'startTime' || j === 'endTime') {
            if (v[j] !== null) {
              return parseTime(v[j])
            } else {
              return '强制关闭考试页面无提交试卷时间记录'
            }
          } else if (j === 'score') {
            if (v[j] !== null) {
              return v[j] + '分'
            } else {
              return '0分'
            }
          } else if (j === 'timeUsed') {
            return timeUsedFormat(v[j])
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

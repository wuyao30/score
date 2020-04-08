<template>
  <div class="table-wrapper">
    <el-table
      stripe
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            stripe
            border
            :data="props.row.reports"
            style="width: 100%;">
            <el-table-column
              label="标题">
              <template slot-scope="scope">
                <span>{{scope.row.reportName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="单位"
              >
              <template slot-scope="scope">
                <span>{{scope.row.reportCompany}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="部门"
              >
              <template slot-scope="scope">
                <span>{{scope.row.reportDepartment}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="申报人员"
              >
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        label="ID">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="奖项名称">
        <template slot-scope="scope">
          <span>{{scope.row.prizeName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="申报数量">
        <template slot-scope="scope">
          <span>{{scope.row.prizeAmount}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryPrizeReportNum } from '../../api/prize'
export default {
  name: 'Index',
  created() {
    queryPrizeReportNum().then(response => {
      this.tableData = response.data
    })
  },
  data() {
    return {
      tableData: []
    }
  }
}
</script>

<style scoped>
  .table-wrapper{
    padding-top: 20px;
    padding-left: 20px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

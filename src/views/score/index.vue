<template>
  <div class="app-container">
    <!--<div class="table-title">-->
      <!--<span>评优评先打分页面</span>-->
    <!--</div>-->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.reportName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="主要事迹" align="center" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.reportInfo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="照片" width="200" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-avatar v-for="item in row.reportPhotos" :key="item.url" shape="square" :size="100" fit="fill" :src="item.url"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="相关材料" align="center" width="80">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.annex" :key="index">
            <el-link :href="item.url" type="success">{{`附件${index+1}`}}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="综合评价" align="center">
        <el-table-column label="政治素质" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.score1" placeholder="请输入分数"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="工作业绩" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.score2" placeholder="请输入分数"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="业务能力" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.score3" placeholder="请输入分数"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="形象作风" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.score4" placeholder="请输入分数"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="综合得分" align="center">
          <template slot-scope="scope">
            <span>{{ totalScore(scope) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <div class="submit-container">
      <el-button type="primary" @click="submitForm">立即创建</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
  </div>
</template>

<script>
import { getMyAllPrizes } from '../../api/prize'
export default {
  name: 'Index',
  data() {
    return {
      listLoading: true,
      tableKey: 0,
      temp: {},
      list: []
    }
  },
  created() {
    this.fetchEvaluationPrize()
  },
  methods: {
    totalScore(scope) {
      scope.row.totalScore =  parseInt(scope.row.score1) + parseInt(scope.row.score2) + parseInt(scope.row.score3) + parseInt(scope.row.score4)
      return scope.row.totalScore
    },
    fetchEvaluationPrize() {
      getMyAllPrizes().then(response => {
        this.listLoading = false
        const score = {
          score1: 0,
          score2: 0,
          score3: 0,
          score4: 0,
          totalScore: 0
        }
        this.list = response.data.myPrizes.map(function(elem, index) {
          return Object.assign(elem, score)
        })
      })
    },
    submitForm() {
      console.log(this.list)
    }
  }
}
</script>

<style scoped>
  .app-container{
    padding-top: 15px;
  }
</style>

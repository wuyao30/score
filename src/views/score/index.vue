<template>
  <div class="app-container">
    <div class="card-wrapper">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix" style="text-align: left;">
          <span>评分规则</span>
        </div>
        <div class="text item">
          评选奖项名称： {{ prize.prizeName }}
        </div>
        <div class="text item">
          评选规则： {{ prize.prizeInfo }}
        </div>
        <div class="text item">
          奖项数: {{ prize.prizeNum }}
        </div>
      </el-card>
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
          <el-image
            style="width: 100px; height: 100px"
            :src="row.reportphotos[0].photoUrl"
            :preview-src-list="row.reportphotos.map(function(elem) {
              return elem.photoUrl
            })">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="相关材料" align="center" width="80">
        <template slot-scope="{row}">
          <div v-for="(item, index) in row.reportdocuments" :key="index">
            <el-link :href="item.documentUrl" type="success">{{item.documentName}}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="综合评价" align="center">
        <el-table-column label="政治素质(1-10分)" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.score1" placeholder="请输入分数"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="工作业绩(1-10分)" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.score2" placeholder="请输入分数"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="业务能力(1-10分)" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.score3" placeholder="请输入分数"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="形象作风(1-10分)" align="center">
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
      <el-button type="primary" @click="submitForm">提交打分</el-button>
    </div>
  </div>
</template>

<script>
import { queryEvaluationPrizeInfo, submitEvaluateResult, evaluateGetPrizeInfo } from '../../api/prize'
const STANDARDSCORE = 30
const MAXSCORE = 40
export default {
  name: 'Index',
  data() {
    return {
      listLoading: true,
      tableKey: 0,
      temp: {},
      list: [],
      prize: {}
    }
  },
  created() {
    queryEvaluationPrizeInfo().then(response => {
      this.templateMethod(response)
      const score = {
        score1: 0,
        score2: 0,
        score3: 0,
        score4: 0,
        totalScore: 0
      }
      this.list = response.data.map(function(elem) {
        return Object.assign(elem, score)
      })
      this.listLoading = false
    })
    evaluateGetPrizeInfo().then(response => {
      this.prize = response.data
    })
  },
  methods: {
    templateMethod(response) {
      if (response.errno == 20000) {
        this.$message.success('获取信息成功')
      } else {
        this.$message.error('获取信息失败')
      }
    },
    totalScore(scope) {
      scope.row.totalScore =  parseInt(scope.row.score1) + parseInt(scope.row.score2) + parseInt(scope.row.score3) + parseInt(scope.row.score4)
      return scope.row.totalScore
    },
    submitForm() {
      const highScore = this.list.filter(function(elem) {
        return elem.totalScore >= STANDARDSCORE && elem.totalScore <= MAXSCORE
      })
      console.log(MAXSCORE, highScore, STANDARDSCORE)
      if (highScore.length > this.prize.prizeNum) {
        this.$message({
          message: '打分结果大于标准要求数量',
          type: 'error'
        })
        return
      } else if (highScore.length < this.prize.prizeNum) {
        this.$message({
          message: '打分结果小于标准要求数量',
          type: 'error'
        })
        return
      } else {
        const result = this.list.map(function(elem) {
          let markScore = elem.totalScore
          return {
            prizeId: elem.prizeId,
            reportId: elem.reportId,
            markScore: markScore
          }
        })
        submitEvaluateResult(result).then(response => {
          if (response.errno == 20000) {
            this.$notify.success({
              title: '成功',
              message: response.data
            })
          } else {
            this.$notify.error({
              title: '失败',
              message: '提交结果失败，请刷新重试'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .app-container{
    padding-top: 15px;
  }
  .card-wrapper {
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0px auto 10px auto;
  }
  .submit-container {
    text-align: right;
    margin-top: 10px;
    margin-right: 20px;
  }
  .text {
    text-align: left;
    font-size: 14px;
  }

  .item {
    text-align: left;
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>

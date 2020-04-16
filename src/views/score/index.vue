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
        <div v-if="prize.evaluateMode == 0" class="text item" style="color: red;">
          已选择数: {{ voteNum() }}
        </div>
        <div v-if="prize.evaluateMode == 1" class="text item" style="color: red;">
          已选择数: {{ scoreNum() }}
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
      <el-table-column v-if="options[3].visible" :label="options[3].optionName" width="350px" align="center">
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
      <el-table-column label="评审" align="center" width="200px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-input v-if="prize.evaluateMode == 1" @input="ScoreInputHandle" v-model="row.score" placeholder="请输入分数"></el-input>
          <el-radio-group v-if="prize.evaluateMode == 0" v-model="row.vote">
            <el-radio :label="1">同意</el-radio>
            <el-radio :label="0">不同意</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="submit-container">
      <el-button type="primary" @click="submitForm">提交打分</el-button>
    </div>
  </div>
</template>

<script>
import { queryPrizeOptions, queryEvaluationPrizeInfo, submitEvaluateResult, evaluateGetPrizeInfo } from '../../api/prize'
export default {
  name: 'Index',
  data() {
    return {
      listLoading: true,
      tableKey: 0,
      temp: {},
      list: [],
      prize: {},
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
    }
  },
  created() {
    queryEvaluationPrizeInfo().then(response => {
      this.templateMethod(response)
      this.list = response.data.map(function(elem) {
        Object.assign(elem, {
          score: undefined,
          vote: undefined
        })
        return elem
      })
      this.listLoading = false
    })
    evaluateGetPrizeInfo().then(response => {
      this.prize = response.data
    })
    queryPrizeOptions({ prizeId: this.$store.state.user.prizeId }).then(response => {
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
    voteNum() {
      const highScore = this.list.filter(function(elem) {
        return elem.vote == 1
      })
      return highScore.length
    },
    scoreNum() {
      const highScore = this.list.filter(function(elem) {
        return elem.score >= 90 && elem.score <= 100
      })
      return highScore.length
    },
    submitForm() {
      if( this.prize.evaluateMode == 0 ) {
        if(this.voteNum() <= this.prize.prizeNum) {
          const result = this.list.map(function(elem) {
            let markScore = elem.vote
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
        } else {
          this.$notify.error({
            title: 'error',
            message: '评审结果数量应小于等于奖项要求数量'
          })
        }
      } else if (this.prize.evaluateMode == 1 ) {
        console.log(this.scoreNum(), this.prize.prizeNum)
        if(this.scoreNum() <= this.prize.prizeNum ) {
          const result = this.list.map(function(elem) {
            let markScore = elem.score
            return {
              prizeId: elem.prizeId,
              reportId: elem.reportId,
              markScore: markScore
            }
          })
          console.log(result)
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
        } else {
          this.$notify.error({
            title: 'error',
            message: '评审结果数量应小于等于奖项要求数量'
          })
        }
      } else {
        this.$notify.error({
          title: 'error',
          message: '评审结果数量应小于等于奖项要求数量'
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

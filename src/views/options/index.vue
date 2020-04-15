<template>
  <div class="options-contianer">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column label="ID" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.chooseId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选项名称" width="300" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.optionNewName" class="edit-input" width="200" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.optionName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="200">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            确认
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { adminGetPrizeOptions, adminModifyOPtionsName } from "../../api/prize";

export default {
  name: 'index',
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: []
    }
  },
  created() {
    adminGetPrizeOptions().then(response => {
      if(response.errno == 20000) {
        this.list = response.data.map(elem => {
          Object.assign(elem, { edit: false })
          return elem
        })
      } else {
        this.$message.error('获取选项信息失败，请刷新重试')
      }
    })
  },
  methods: {
    cancelEdit(row) {
      row.optionNewName = row.optionName
      row.edit = false
      this.$message({
        message: '取消修改选项名称',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.optionName = row.optionNewName
      adminModifyOPtionsName({ chooseId: row.chooseId, optionName: row.optionName }).then(response => {
        if(response.errno == 20000) {
          this.$notify.success({
            title:'成功',
            message: '修改选项名称成功'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: '修改选项名称失败'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

<!--
 * @Date: 2021-10-30 23:21:18
 * @LastEditors: AaronChu
 * @LastEditTime: 2022-08-16 17:04:07
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="search" placeholder="模糊搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-tooltip class="item" effect="dark" content="状态" placement="top-start">
        <el-select v-model="status" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </el-tooltip>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">
        搜索
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column width="150" align="center" label="反馈人">
        <template slot-scope="{ row }">
          <span>{{ row.nick_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="反馈对象">
        <template slot-scope="{ row }">
          <span>{{ JSON.parse(row.object).name  }}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="反馈内容">
        <template slot-scope="{ row }">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="反馈时间">
        <template slot-scope="{ row }">
          <span>{{ $parseTime(row.createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="状态">
        <template slot-scope="{ row }">
          <span>{{ row.status == 1 ? '已处理' : row.status == 2 ? '已搁置' : '未处理' }}</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="{ row }">
          <el-button type="success" size="small" icon="el-icon-document-checked" @click="doneItem(row, 1)">完成</el-button>
          <el-button type="warning" size="small" icon="el-icon-document-remove" @click="doneItem(row, 2)">搁置</el-button>
          <el-button type="danger" size="small" icon="el-icon-document-delete" @click="deleteRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="counts > 0" :total="counts" :page.sync="page" :limit.sync="pageSize" @pagination="getData" />
  </div>
</template>
<script>
import { list, changeStatus, deleteItem } from '@/api/feed'
import Pagination from '@/components/Pagination'
export default {
  name: 'feed',
  components: { Pagination },
  data() {
    return {
      table: [],
      statusOptions: [
        { key: '', label: '全部', id: 0 },
        { key: 1, label: '已处理', id: 1 },
        { key: 0, label: '未处理', id: 2 },
        { key: 2, label: '已搁置', id: 3 },
      ],
      status: 0,
      page: 1,
      pageSize: 10,
      search: '',
      counts: 0,
      listLoading: false,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.status === 2) {
        return 'warning-row'
      } else if (row.status === 1) {
        return 'success-row'
      }
      return ''
    },
    async doneItem(row, status) {
      row.status = status
      await changeStatus(row._id, row)
      this.$message({
        type: 'success',
        message: '处理成功',
      })
      this.getData()
    },
    /**
     * @description: 删除一行数据
     * @param {Object} row 表格行数据
     */
    deleteRow(row) {
      this.$confirm(`确定删除“${row.nick_name}”的反馈?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await deleteItem(row._id)
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        this.getData()
      })
    },

    /**
     * @description: 搜索列表
     * @param {*} e
     */
    searchList(e) {
      this.page = 1
      this.getData()
    },

    /**
     * @description: 获取表格数据
     */
    async getData() {
      this.listLoading = true
      const res = await list(this.page, this.pageSize, this.search, this.statusOptions[this.status].key)
      this.table = res.data
      this.counts = res.counts
      this.listLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-input {
  text-align: center;
}
.filter-container {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

::v-deep .el-table .warning-row {
  background: oldlace;
}

::v-deep .el-table .success-row {
  background: #f0f9eb;
}
.table-expand {
  font-size: 0;
  padding-left: 50px;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
::v-deep.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

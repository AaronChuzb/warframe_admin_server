<!--
 * @Date: 2021-09-24 11:40:14
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 21:13:27
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="search" placeholder="模糊搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-tooltip class="item" effect="dark" content="分类" placement="top-start">
        <el-select v-model="type" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in typeOptions" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="状态" placement="top-start">
        <el-select v-model="status" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </el-tooltip>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">
        搜索
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
      <el-table-column width="150" align="center" label="类型">
        <template slot-scope="{ row }">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300" label="反馈内容">
        <template slot-scope="{ row }">
          <span>{{ row.text }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="联系方式">
        <template slot-scope="{ row }">
          <span>{{ row.contact != null?row.contact:'' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="{ row }">
          <span>{{ row.handle == 1 ? '已处理' :row.handle == 2 ? '已搁置': '未处理' }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="处理人">
        <template slot-scope="{ row }">
          <span>{{ row.updater && row.handle != 0 ? row.updater.nickname : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="处理时间">
        <template slot-scope="{ row }">
          <span>{{ row.handle != 0 ? $parseTime(row.updatedAt) : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="250">
        <template slot-scope="{ row }">
          <el-button type="success" size="small" icon="el-icon-document-checked" @click="doneItem(row, 1)">完成</el-button>
          <el-button type="warning" size="small" icon="el-icon-document-remove" @click="doneItem(row, 2)">搁置</el-button>
          <el-button type="danger" size="small" icon="el-icon-document-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="counts > 0" :total="counts" :page.sync="page" :limit.sync="pageSize" @pagination="getData" />
  </div>
</template>
<script>
import { list, changeStatus } from '@/api/suggest'
import Pagination from '@/components/Pagination'
export default {
  name: 'suggest',
  components: { Pagination },
  data() {
    return {
      table: [],
      typeOptions: [
        { key: '', label: '全部', id: 0 },
        { key: 'Bug反馈', label: 'Bug反馈', id: 1 },
        { key: '意见建议', label: '意见建议', id: 2 },
      ],
      statusOptions: [
        { key: '', label: '全部', id: 0 },
        { key: 1, label: '已处理', id: 1 },
        { key: 0, label: '未处理', id: 2 },
        { key: 2, label: '已搁置', id: 3 },
      ],
      type: 0,
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
    async doneItem(row, status) {
      row.handle = status
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
    deleteItem(row) {
      this.$confirm(`确定删除“${row.name}”`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await deleted(row._id)
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
      const res = await list(this.page, this.pageSize, this.search, this.typeOptions[this.type].key, this.statusOptions[this.status].key)
      this.table = res.data
      this.counts = res.counts
      this.listLoading = false
    },
  },
}
</script>

<style scoped>
.edit-input {
  text-align: center;
}
.filter-container {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
</style>

<!--
 * @Date: 2021-09-24 17:37:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 20:24:11
-->
<template>
  <div class="app-container">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input v-model="search" placeholder="按名称搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-tooltip class="item" effect="dark" content="日志类型" placement="top-start">
        <el-select v-model="type" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in typeOptions" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="状态" placement="top-start">
        <el-select v-model="status" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </el-tooltip>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus" @click="newLog()">新增日志</el-button>
    </div>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
      <el-table-column width="150px" label="类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.type.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="客户端版本号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容">
        <template slot-scope="{ row }">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="日志日期" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ statusOptions[row.status].label }}</span>
        </template>
      </el-table-column>
      <el-table-column min-height="250rpx" align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="openEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-document-delete" @click="deleteItem(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="counts > 0" :total="counts" :page.sync="page" :limit.sync="pageSize" @pagination="getData" />
    <edit ref="edit" :show="showNewItem" @cancle="cancleEdit" @done=";(showNewItem = false), getData()"></edit>
  </div>
</template>
<script>
import { list, deleteLog, getType } from '@/api/log'
import Pagination from '@/components/Pagination'
import Edit from './components/edit.vue'
export default {
  name: 'log',
  components: { Pagination, Edit },
  data() {
    return {
      table: [], // 存放列表的数据
      page: 1, // 获取的数据的页数
      pageSize: 10, // 一页的数据长度,默认10条
      search: '', // 搜索的关键字
      counts: 0, // 获取的数据总条数
      listLoading: false, // 列表加载状态
      showNewItem: false, // 显示表单
      type: '',
      status: '',
      statusOptions: [
        { label: '未完成', id: 0 },
        { label: '进行中', id: 1 },
        { label: '已完成', id: 2 },
        { label: '全部', id: '' },
      ],
      typeOptions: [{ _id: '', name: '全部' }],
    }
  },
  async created() {
    await this.getData()
    const res = await getType()
    this.typeOptions = this.typeOptions.concat(res)
  },
  methods: {
    newLog() {
      this.showNewItem = true
      this.$refs.edit.getTypes()
    },
    openEdit(row) {
      this.showNewItem = true
      this.$refs.edit.getInfoAndEdit(row._id)
    },
    cancleEdit() {
      this.showNewItem = false
    },
    /**
     * @description: 删除一个用户
     * @param {Object} row 一行的数据，包含id等关键信息
     */
    async deleteItem(row) {
      this.$confirm(`确定删除“${row.type.name}”`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await deleteLog(row._id)
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
    async getData() {
      this.listLoading = true
      const res = await list(this.page, this.pageSize, this.search, this.type, this.status)
      this.table = res.data
      this.counts = res.counts
      this.listLoading = false
    },
  },
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  transform: translate(0, -50%);
  right: 15px;
  top: 50%;
}
.filter-container {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
</style>

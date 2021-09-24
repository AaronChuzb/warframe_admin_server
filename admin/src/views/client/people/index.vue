<!--
 * @Date: 2021-09-24 11:34:53
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 15:41:38
-->
<template>
  <div class="app-container">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input v-model="search" placeholder="按名称搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-tooltip class="item" effect="dark" content="排序方式" placement="top-start">
        <el-select v-model="sort" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in sortOptions" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </el-tooltip>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus" @click="showNewItem = true">新增人员</el-button>
    </div>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
      <el-table-column width="150px" label="名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="头像" align="center">
        <template slot-scope="{ row }">
          <el-avatar shape="square" size="large" fit="contain" :src="row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column align="center" label="简介">
        <template slot-scope="{ row }">
          <span>{{ row.tips }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="排名权重" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.rank }}</span>
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
    <edit ref="edit" :show="showNewItem" @cancle="cancleEdit" @done="showNewItem = false, getData()"></edit>
  </div>
</template>
<script>
import { list, deletePeople} from "@/api/people";
import Pagination from "@/components/Pagination";
import Edit from "./components/edit.vue"
export default {
  name: "people",
  components: { Pagination, Edit },
  data() {
    return {
      table: [], // 存放列表的数据
      page: 1, // 获取的数据的页数
      pageSize: 10, // 一页的数据长度,默认10条
      search: "", // 搜索的关键字
      counts: 0, // 获取的数据总条数
      sort: 0, // 排序方式
      listLoading: false, // 列表加载状态
      showNewItem: false, // 显示表单
      sortOptions: [ // 排序方式选项
        { key: { rank: -1 }, label: "按权重排序", id: 0 },
        { key: { updatedAt: -1 }, label: "更新时间倒序", id: 1 },
        { key: { updatedAt: 1 }, label: "更新时间正序", id: 2 },
        { key: { createdAt: 1 }, label: "创建时间正序", id: 3 },
        { key: { createdAt: -1 }, label: "创建时间倒叙", id: 4 },
      ],
    };
  },
  async created() {
    await this.getData(); 
  },
  methods: {
    openEdit(row){
      this.showNewItem = true
      this.$refs.edit.getInfoAndEdit(row._id)
    },
    cancleEdit(){
      this.showNewItem = false
    },
    /**
     * @description: 删除一个用户
     * @param {Object} row 一行的数据，包含id等关键信息
     */
    async deleteItem(row) {
      this.$confirm(`确定删除“${row.name}”`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await deletePeople(row._id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getData();
      });
    },
    /**
     * @description: 搜索列表
     * @param {*} e
     */
    searchList(e) {
      this.page = 1;
      this.getData();
    },
    async getData() {
      this.listLoading = true;
      const res = await list(this.page, this.pageSize, this.search, this.sortOptions[this.sort].key);
      this.table = res.data;
      this.counts = res.counts;
      this.listLoading = false;
    },
  },
};
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

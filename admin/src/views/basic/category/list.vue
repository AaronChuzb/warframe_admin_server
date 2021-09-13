<!--
 * @Date: 2021-09-02 12:27:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-13 16:41:51
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="search" placeholder="按名称搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-tooltip class="item" effect="dark" content="排序方式" placement="top-start">
        <el-select v-model="sort" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in sortOptions" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="更新者" placement="top-start">
        <el-select v-model="user" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in userOptions" :key="item._id" :label="item.nickname" :value="item.index" />
        </el-select>
      </el-tooltip>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus" @click="showNewItem = true">
        新增分类
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
      <el-table-column width="200px" align="center" label="分类名称">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="上级分类">
        <template slot-scope="{ row }">
          <span>{{ row.parent ? row.parent.name : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="创建人">
        <template slot-scope="{ row }">
          <span>{{ row.creator ? row.creator.nickname : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="修改人">
        <template slot-scope="{ row }">
          <span>{{ row.updater ? row.updater.nickname : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间">
        <template slot-scope="{ row }">
          <span>{{ $parseTime(row.updatedAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="editRow(row._id)">
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-document-delete" @click="deleteItem(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="counts > 0" :total="counts" :page.sync="page" :limit.sync="pageSize" @pagination="getData" />
    <!-- 新增 -->
    <new-item ref="edit" :show="showNewItem" :data="category" @done="showNewItem = false, getData()" @cancle="showNewItem = false" />
  </div>
</template>
<script>
import { list, deleted } from "@/api/category";
import Pagination from "@/components/Pagination";
import newItem from "./components/edit.vue";
export default {
  name: "InlineEditTable",
  components: { Pagination, newItem },
  data() {
    return {
      category:{
        name: "",
        parent: ""
      },
      table: [],
      sortOptions: [
        { key: { updatedAt: -1 }, label: "更新时间倒序", id: 0 },
        { key: { updatedAt: 1 }, label: "更新时间正序", id: 1 },
        { key: { createdAt: 1 }, label: "创建时间正序", id: 2 },
        { key: { createdAt: -1 }, label: "创建时间倒叙", id: 3 },
      ],
      userOptions: [{ _id: "", index: 0, nickname: "所有人" }],
      user: 0,
      sort: 0,
      page: 1,
      pageSize: 10,
      search: "",
      counts: 0,
      listLoading: false,
      showNewItem: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    editRow(id){
      this.showNewItem = true
      this.$refs.edit.getInfoAndEdit(id)
    },
    /**
     * @description: 删除一行数据
     * @param {Object} row 表格行数据
     */
    deleteItem(row) {
      this.$confirm(`确定删除“${row.name}”`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await deleted(row._id);
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

    /**
     * @description: 获取表格数据
     */
    async getData() {
      this.listLoading = true;
      const res = await list(this.page, this.pageSize, this.search, this.sortOptions[this.sort].key, this.userOptions[this.user]._id);
      this.table = res.data.map((e) => {
        e.edit = false;
        return e;
      });
      if (this.userOptions.length < 2) {
        this.userOptions = this.userOptions.concat(
          res.userOptions.map((e, index) => {
            e.index = index + 1;
            return e;
          })
        );
      }
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

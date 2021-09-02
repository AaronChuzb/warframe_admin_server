<!--
 * @Date: 2021-09-02 12:27:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-02 18:30:11
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="search" placeholder="按名称搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-select v-model="sort" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="newPart">
        添加
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
      <el-table-column width="300px" label="Title">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(row)">
              取消
            </el-button>
          </template>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="创建人">
        <template slot-scope="{ row }">
          <span>{{ row.creator.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="修改人">
        <template slot-scope="{ row }">
          <span>{{ row.updater.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="修改时间">
        <template slot-scope="{ row }">
          <span>{{ $parseTime(row.updatedAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button v-if="row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(row)">
            保存
          </el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="(row.edit = !row.edit), (row.tempName = row.name)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { create, list, change, deleted } from "@/api/part";

export default {
  name: "InlineEditTable",
  data() {
    return {
      table: [],
      sortOptions: [],
      sort: '',
      page: 1,
      pageSize: 10,
      search: "",
      counts: 0,
      listLoading: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    newPart(){

    },
    searchList(e){
      
    },
    async getData() {
      this.listLoading = true;
      const res = await list(this.page, this.pageSize, this.search);
      this.table = res.data.map((e) => {
        e.edit = false;
        return e;
      });
      this.counts = res.counts;
      this.listLoading = false;
    },
    cancelEdit(row) {
      row.name = row.tempName;
      row.edit = false;
      this.$message({
        message: "用户取消编辑",
        type: "warning",
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.tempName = row.name;
      this.$message({
        message: "编辑成功",
        type: "success",
      });
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
.filter-container{
  margin-bottom: 15px;
}
</style>

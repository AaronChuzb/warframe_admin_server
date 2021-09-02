<!--
 * @Date: 2021-09-02 12:27:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-03 00:08:08
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="search" placeholder="按昵称或账号搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus" @click="showNewItem = true">
        新增管理员
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
      <el-table-column width="150px" label="昵称" align="center">
        <template slot-scope="{ row }">
          <span >{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="管理员头像" align="center">
        <template slot-scope="{ row }">
           <el-avatar shape="square" size="large" :src="row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限">
        <template slot-scope="{ row }">
          <span>{{ $parseTime(row.updatedAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" icon="el-icon-edit-outline">
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
   <!--  <el-dialog title="新增部件" :visible.sync="showNewItem">
      <el-form :model="part" :rules="rules" ref="part">
        <el-form-item label="部件名称" prop="name">
          <el-input v-model="part.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showNewItem = false">取 消</el-button>
        <el-button type="primary" @click="newItem('part')">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import { list } from "@/api/user";
import Pagination from "@/components/Pagination";
export default {
  name: "InlineEditTable",

  components: { Pagination },
  data() {
    return {
      part: {
        name: "",
      },
      table: [],
      page: 1,
      pageSize: 10,
      search: "",
      counts: 0,
      listLoading: false,
      showNewItem: false,
      rules: {
        name: [{ required: true, message: "请输入部件名称", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    newItem(formName) {
      this.showNewItem = false
      this.$refs[formName].validate( async (valid) => {
        if (valid) {
          await create(this.part.name)
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.getData()
        } else {
          return false;
        }
      });
    },
    deleteItem(row) {
      this.$confirm(`确定删除“${row.name}”`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then( async () => {
        await deleted(row._id)
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getData()
      });
    },
    searchList(e) {
      this.page = 1;
      this.getData();
    },
    async getData() {
      this.listLoading = true;
      const res = await list(this.page, this.pageSize, this.search);
      this.table = res.data
      this.counts = res.counts;
      this.listLoading = false;
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
.filter-container {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
</style>

<!--
 * @Date: 2021-09-17 15:00:55
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-08 11:25:02
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="search" placeholder="按节点名称搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
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
        新增节点
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
      <el-table-column width="250" align="center" label="部件名称">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.name" class="edit-input" size="small" />
            <el-button class="cancel-btn" size="small" icon="el-icon-document-remove" type="warning" @click="cancelEdit(row)">
              取消
            </el-button>
          </template>
          <span v-else>{{ row.name }}</span>
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
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="{ row }">
          <el-button v-if="row.edit" type="success" size="small" icon="el-icon-document-checked" @click="confirmEdit(row)">
            保存
          </el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit-outline" @click="(row.edit = !row.edit), (row.tempName = row.name)">
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
    <el-dialog title="新增部件" :visible.sync="showNewItem">
      <el-form :model="part" :rules="rules" ref="part">
        <el-form-item label="部件名称" prop="name">
          <el-input v-model="part.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showNewItem = false">取 消</el-button>
        <el-button type="primary" @click="newItem('part')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { create, list, change, deleted } from "@/api/part";
import Pagination from "@/components/Pagination";
export default {
  name: "part",

  components: { Pagination },
  data() {
    return {
      part: {
        name: "",
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
      rules: {
        name: [{ required: true, message: "请输入部件名称", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    /**
     * @description: 新建部件
     * @param {*} formName 表单名称
     */
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

    /**
     * @description: 删除一行数据
     * @param {Object} row 表格行数据
     */
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
    /**
     * @description: 取消编辑
     * @param {Object} row
     */
    cancelEdit(row) {
      row.name = row.tempName;
      row.edit = false;
      this.$message({
        message: "用户取消编辑",
        type: "warning",
      });
    },
    /**
     * @description: 提交编辑
     * @param {Object} row
     */
    async confirmEdit(row) {
      row.edit = false;
      row.tempName = row.name;
      // 深拷贝一下,如果是浅拷贝会删去原来列表中的值,导致不能二次更改
      let data = JSON.parse(JSON.stringify(row))
      // 删除对象多余元素
      delete data.edit
      delete data.tempName
      await change(row._id, data)
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
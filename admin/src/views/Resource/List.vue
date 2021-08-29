<!--
 * @Date: 2021-08-20 22:39:09
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-29 16:54:06
-->
<template>
  <div>
    <h1>资源列表</h1>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-input placeholder="请输入资源名称搜索" v-model="search" @change="searchContent">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="12">
        <el-button style="width: 100%" type="primary" @click="showNewResource = true">新建资源</el-button>
      </el-col>
    </el-row>
    <el-table :data="resources" style="margin-top: 1vw" :key="Math.random()">
      <el-table-column align="center" prop="name" label="资源名称"></el-table-column>
      <el-table-column align="center" prop="createdAt" label="创建时间">
        <template slot-scope="scope">
          <p>{{ $util.formatTime(scope.row.createdAt) }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updatedAt" label="更新时间">
        <template slot-scope="scope">
          <p>{{ $util.formatTime(scope.row.updatedAt) }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top:1vw">
      <el-pagination background layout="sizes, prev, pager, next, jumper" :page-sizes="[5, 10, 15, 20]" @prev-click="pageChange" @next-click="pageChange" @current-change="pageChange" @size-change="pageSizeChange" :page-size="pageSize" :total="dataTotal"> </el-pagination>
    </div>
    <!-- 新建资源 -->
    <el-dialog title="新增资源" :visible.sync="showNewResource">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入部件名称"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-upload class="img-uploader" :class="[form.img !== '' ? 'disabled' : '']" action="" list-type="picture-card" :http-request="uploader" :file-list="file_list" :limit="1" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" filterable placeholder="请选择类型" style="width: 100%">
            <el-option v-for="item in selectList.types" :key="item._id" :label="item.name" :value="item._id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源">
          <el-select v-model="form.from" filterable placeholder="请选择来源" style="width: 100%">
            <el-option v-for="item in selectList.froms" :key="item._id" :label="item.name" :value="item._id"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showNewResource = false">取 消</el-button>
        <el-button type="primary" @click="createResource('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import uploader from "../../plugins/oss";
export default {
  data() {
    return {
      showNewResource: false,
      resources: [],
      page: 1,
      pageSize: 5,
      dataTotal: 0,
      search: "",
      selectList: {},
      file_list: [],
      form: {
        name: "",
        img: "",
        type: "",
        from: "",
      },
      rules: {
        name: [{ required: true, message: "请输入部件名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    /**
     * 跳页
     * @param e {Number} 当前页
     */
    pageChange(e) {
      console.log(e);
      this.page = e;
      this.getData();
    },
    /**
     * 更改页大小
     * @param e {Number} 一页的大小
     */
    pageSizeChange(e) {
      console.log(e);
      this.page = 1;
      this.pageSize = e;
      this.getData();
    },
    searchContent() {
      this.page = 1;
      this.getData();
    },
    beforeUpload(file) {
      const isLtK = file.size / 1024 / 1024 < 0.1;
      if (!isLtK) {
        this.$message.error("上传资源图片大小不能超过 100kb!");
      }
      return isLtK;
    },
    // 图片上传
    async uploader(e) {
      const img = await uploader(e.file);
      this.form.img = img;
    },
    // 移除图片
    handleRemove() {
      this.form.img = "";
      this.file_list = [];
    },
    // 创建一个资源
    async createResource(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$api.createResource(this.form);
          this.showNewResource = false;
          this.$message({
            type: "success",
            message: "创建成功",
          });
          this.form.name = "";
          this.page = 1;
          this.getData();
        } else {
          return false;
        }
      });
    },
    async upDatePart(index, id, name) {
      if (name == "") {
        this.$message({
          type: "warning",
          message: "名称不能为空",
        });
        return;
      }
      await this.$api.updatePart(id, { name });
      this.$message({
        type: "success",
        message: "编辑成功",
      });
    },
    async getData() {
      const res = await this.$api.getResources(this.page, this.pageSize, ["name"], this.search);
      this.resources = res.data.data;
      this.dataTotal = res.data.counts;
    },
    async remove(row) {
      this.$confirm(`是否删除"${row.name}"`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.$api.deletePart(row._id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getData();
      });
    },
  },
  async created() {
    const res = await this.$api.getResourcesTypeAndFrom();
    this.selectList = res.data.data;
    this.getData();
  },
};
</script>

<style>
.test {
}
.disabled .el-upload--picture-card {
  display: none;
}
</style>

<!--
 * @Date: 2021-08-20 22:39:09
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-28 18:14:16
-->
<template>
  <div>
    <h1>管理员列表</h1>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-input placeholder="请输入用户名或昵称搜索" v-model="search" @change="searchContent">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="12">
        <el-button style="width: 100%" type="primary" @click="$router.push('/user/edit')">新增管理员</el-button>
      </el-col>
    </el-row>
    <el-table :data="users" style="margin-top: 1vw">
      <el-table-column align="center" prop="nickname" label="管理员昵称"></el-table-column>
      <el-table-column align="center" prop="avatar" label="管理员头像">
        <template slot-scope="scope">
          <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="username" label="管理员账号"></el-table-column>
      <el-table-column align="center" prop="createdAt" label="注册时间">
        <template slot-scope="scope">
          <p>{{ $util.formatTime(scope.row.createdAt) }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/user/edit/${scope.row._id}`)" v-if="!(scope.row.username == 'aaronchu')">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)" v-if="!(scope.row.username == 'aaronchu')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top:1vw">
      <el-pagination background layout="sizes, prev, pager, next, jumper" :page-sizes="[5, 10, 15, 20]" @prev-click="pageChange" @next-click="pageChange" @current-change="pageChange" @size-change="pageSizeChange" :page-size="pageSize" :total="dataTotal"> </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      page: 1,
      pageSize: 5,
      dataTotal: 0,
      search: ''
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
    searchContent(){
      this.page = 1
      this.getData()
    },
    async getData() {
      const res = await this.$api.getUsers(this.page, this.pageSize, ["username", "nickname"], this.search);
      this.users = res.data.data;
      this.dataTotal = res.data.counts;
    },
    async remove(row) {
      this.$confirm(`是否删除 "${row.nickname}"`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.$api.deleteUser(row._id)
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getData();
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style></style>

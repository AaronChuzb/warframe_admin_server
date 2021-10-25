<!--
 * @Date: 2021-10-25 15:49:31
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-25 16:00:09
-->
<!--
 * @Date: 2021-09-02 12:27:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-28 15:42:56
-->
<template>
  <div class="app-container">
    <!-- 功能区 -->
    <!-- <div class="filter-container">
      <el-input v-model="search" placeholder="按昵称或账号搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus" @click="showNewItem = true">新增管理员</el-button>
    </div> -->
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
      <el-table-column width="150px" label="昵称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="管理员头像" align="center">
        <template slot-scope="{ row }">
          <el-avatar shape="square" size="large" fit="contain" :src="row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限">
        <template slot-scope="{ row }">
          <el-tag type="success" style="margin-right: 10px; margin-bottom: 5px" v-for="item in row.roles" :key="item">{{ transRole(item) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="getInfo(row)">编辑</el-button>
          <el-button type="warning" size="small" icon="el-icon-edit-outline" v-if="row.status" @click="changeUserStatus(1, row)">停用</el-button>
          <el-button type="success" size="small" icon="el-icon-edit-outline" v-else @click="changeUserStatus(2, row)">启用</el-button>
          <el-button type="danger" size="small" icon="el-icon-document-delete" @click="deleteItem(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="counts > 0" :total="counts" :page.sync="page" :limit.sync="pageSize" @pagination="getData" />
    <!-- 新增或者编辑 -->
  </div>
</template>
<script>
import { list, changeStatus, creatUser, getUserInfo, deleteUser, changeUser } from "@/api/user";
import Pagination from "@/components/Pagination";
export default {
  name: "users",
  components: { Pagination },
  data() {
    return {
      isEdit: false, // 是否是编辑
      editId: "", // 编辑的用户的id
      user: { // 用户的表单
        nickname: "",
        username: "",
        password: "",
        avatar: "",
        roles: [],
        status: true,
        remark: "",
        game_id: "",
        contact: ""
      },
      permissions: [[]], // 存放权限的二维数组
      permissionTrans: [], // 用来转换权限中英文的数组
      table: [], // 存放列表的数据
      page: 1, // 获取的数据的页数
      pageSize: 10, // 一页的数据长度,默认10条
      search: "", // 搜索的关键字
      counts: 0, // 获取的数据总条数
      listLoading: false, // 列表加载状态
      showNewItem: false, // 显示表单
      rules: { // 表单校验规则
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        username: [{ required: true, message: "请输入账户", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        roles: [{ required: true, message: "请选择用户权限", trigger: "blur" }],
      },
    };
  },
  async created() {
    this.getData();
    
  },
  methods: {
   
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
      const res = await list(this.page, this.pageSize, this.search);
      this.table = res.data;
      this.counts = res.counts;
      this.listLoading = false;
    },
    
    /**
     * @description: 替换权限英文为中文
     * @param {String} en 权限的英文名
     */
    transRole(en) {
      if (en == "all") {
        return "超级管理员";
      }
      for (let i = 0; i < this.permissionTrans.length; i++) {
        if (this.permissionTrans[i].role == en) {
          return this.permissionTrans[i].title;
        }
      }
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
.upload-button {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  border: 2px dashed #666;
  position: relative;
  cursor: pointer;
}
.upload-plus {
  font-size: 40px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 45%;
  left: 50%;
}
.upload-name {
  font-size: 10px;
  position: absolute;
  transform: translate(-50%, -50%);
  bottom: 2px;
  left: 50%;
  width: 100%;
  text-align: center;
}
.avatar {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}
</style>

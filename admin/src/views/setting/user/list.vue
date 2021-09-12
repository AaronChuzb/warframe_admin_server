<!--
 * @Date: 2021-09-02 12:27:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-12 18:57:25
-->
<template>
  <div class="app-container">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input v-model="search" placeholder="按昵称或账号搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus" @click="showNewItem = true">新增管理员</el-button>
    </div>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
      <el-table-column width="150px" label="昵称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="管理员头像" align="center">
        <template slot-scope="{ row }">
          <el-avatar shape="square" size="large" :src="row.avatar"></el-avatar>
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
    <el-dialog :title="!isEdit ? '新增管理员' : '编辑管理员'" :visible.sync="showNewItem">
      <el-form :model="user" :rules="rules" ref="user">
        <el-tabs>
          <el-tab-pane label="基础信息">
            <el-row :gutter="20">
              <el-col :span="12" class="avatar">
                <el-upload v-if="user.avatar == ''" action="https" :auto-upload="true" :http-request="uploadAvatar" :show-file-list="false" :limit="1">
                  <div class="upload-button">
                    <div class="upload-plus">+</div>
                  </div>
                </el-upload>
                <el-avatar v-else shape="square" :size="80" fit="fill" :src="user.avatar"></el-avatar>
                <el-button @click="user.avatar = ''">更换头像</el-button>
              </el-col>
              <el-col :span="12">
                <el-form-item label="昵称" prop="nickname">
                  <el-input v-model="user.nickname" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="账户" prop="username">
                  <el-input v-model="user.username" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="权限配置">
            <el-form-item prop="roles">
              <el-collapse accordion>
                <el-collapse-item v-for="(item, index) in permissions" :key="index">
                  <template slot="title">{{ item.title }}<i v-if="item.role == 'setting'" class="header-icon el-icon-info"></i> </template>
                  <el-checkbox-group v-model="user.roles" @change="roleChange(item)">
                    <el-checkbox v-for="child in item.children" :label="child.role" :key="child.role">{{ child.title }}</el-checkbox>
                  </el-checkbox-group>
                </el-collapse-item>
              </el-collapse>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="(showNewItem = false), (isEdit = false), resetForm()">取 消</el-button>
        <el-button type="primary" @click="editUser('user')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { list, changeStatus, creatUser, getUserInfo, deleteUser, changeUser } from "@/api/user";
import Pagination from "@/components/Pagination";
import { asyncRoutes } from "@/router";
export default {
  name: "User",
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
    // 循环异步路由获取权限列表
    asyncRoutes.forEach((item, index) => {
      if (item.meta) {
        this.permissionTrans.push({
          title: item.meta.title,
          role: item.meta.role,
        });
        this.permissions[index] = {
          title: item.meta.title,
          role: item.meta.role,
          children: [],
        };
        let children = [];
        item.children.forEach((child) => {
          children.push({
            title: child.meta.title,
            role: child.meta.role,
          });
          this.permissionTrans.push({
            title: child.meta.title,
            role: child.meta.role,
          });
        });
        this.permissions[index].children = children;
      }
    });
  },
  methods: {
    /**
     * @description: 重置表单和表单校验
     */
    resetForm() {
      this.user = {
        nickname: "",
        username: "",
        password: "",
        avatar: "",
        roles: [],
        status: true,
      };
      this.rules.password[0].required = true;
    },
    /**
     * @description: 头像上传
     * @param {Object} e 上传的图片文件
     */
    async uploadAvatar(e) {
      const res = await this.$uploader(e.file);
      this.user.avatar = res;
    },
    /**
     * @description: 提交表单
     * @param {String} formName 需要校验的表单名称
     */
    editUser(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (!this.isEdit) {
            await creatUser(this.user);
            this.$message({
              type: "success",
              message: `创建用户”${this.user.nickname}“成功!`,
            });
          } else {
            await changeUser(this.editId, this.user);
            this.$message({
              type: "success",
              message: `编辑用户”${this.user.nickname}“成功!`,
            });
            this.editId = "";
            this.isEdit = false;
            this.resetForm();
          }
          this.showNewItem = false;
          this.getData();
        } else {
          return false;
        }
      });
    },
    /**
     * @description: 变更用户是否可以登录
     * @param {Number} type 类型，是启用还是停用
     * @param {Object} row 一行的数据
     */
    async changeUserStatus(type, row) {
      let status = true;
      let notice = "启用";
      if (type == 1) {
        status = false;
        notice = "停用";
      }
      await changeStatus(row._id, status);
      this.$message({
        type: "success",
        message: `${notice}”${row.nickname}“成功!`,
      });
      await this.getData();
    },
    /**
     * @description: 编辑用户前获取数据
     * @param {Object} row 一行的数据，包含id等关键信息
     */
    async getInfo(row) {
      this.showNewItem = true;
      this.isEdit = true;
      const res = await getUserInfo(row._id);
      this.editId = row._id;
      this.user = { ...res };
      this.rules.password[0].required = false;
    },
    /**
     * @description: 删除一个用户
     * @param {Object} row 一行的数据，包含id等关键信息
     */
    async deleteItem(row) {
      this.$confirm(`确定删除“${row.nickname}”`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await deleteUser(row._id);
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
      const res = await list(this.page, this.pageSize, this.search);
      this.table = res.data;
      this.counts = res.counts;
      this.listLoading = false;
    },
    /**
     * @description: 权限列表变更,仅仅是子权限添加到权限列表肯定不行,
     * 哪怕只有一个子元素被选入也需要将改母节点放入,相反,如果一个子节点都没有就需要删除该母节点
     * @param {Object} parent 操作的母节点
     */
    roleChange(parent) {
      let parentChild = [];
      // 将操作的母节点的子元素role全部取出
      parent.children.forEach((item) => {
        parentChild.push(item.role);
      });
      // 两个数组进行对比
      let flag = false; // 是否存在相同元素的标志
      parentChild.forEach((item) => {
        if (this.user.roles.includes(item)) {
          flag = true;
        }
      });
      if (flag) {
        if (!this.user.roles.includes(parent.role)) {
          this.user.roles.push(parent.role);
        }
      } else {
        if (this.user.roles.includes(parent.role)) {
          this.user.roles.splice(this.user.roles.indexOf(parent.role), 1);
        }
      }
    },
    /**
     * @description: 替换权限英文为中文
     * @param {String} en 权限的英文名
     */
    transRole(en) {
      console.log(en);
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
